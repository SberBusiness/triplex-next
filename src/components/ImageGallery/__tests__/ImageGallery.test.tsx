import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const { mobileState, swipeRefStore } = vi.hoisted(() => ({
    mobileState: { isMobile: false },
    swipeRefStore: { closeSwipe: vi.fn() },
}));

vi.mock("@sberbusiness/triplex-next/components/MobileView", () => ({
    MobileView: ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) =>
        mobileState.isMobile ? <>{children}</> : <>{fallback}</>,
}));

vi.mock("@sberbusiness/triplex-next/components/SwipeableArea", () => ({
    SwipeableArea: React.forwardRef<
        unknown,
        {
            children: React.ReactNode;
            onSwipeLeft?: () => void;
            onSwipeRight?: () => void;
        }
    >(({ children, onSwipeLeft, onSwipeRight }, ref) => {
        React.useImperativeHandle(ref, () => ({
            closeSwipe: swipeRefStore.closeSwipe,
            swipeLeft: vi.fn(),
            swipeRight: vi.fn(),
        }));
        return (
            <div data-testid="swipeable-area">
                <button type="button" data-testid="swipe-left" onClick={onSwipeLeft} />
                <button type="button" data-testid="swipe-right" onClick={onSwipeRight} />
                {children}
            </div>
        );
    }),
}));

import { ImageGallery } from "../ImageGallery";

/** Идентификатор элемента по порядковому номеру (с 1). */
const itemId = (index: number) => `p${index + 1}`;

const buildItems = (count: number) =>
    Array.from({ length: count }, (_, index) => (
        <ImageGallery.Item key={index} id={itemId(index)} src={`/img/${index + 1}.jpg`} alt={`Photo ${index + 1}`} />
    ));

const renderGallery = (props: Partial<React.ComponentProps<typeof ImageGallery>> = {}, itemsCount = 9) => {
    const { children = buildItems(itemsCount), ...rest } = props;
    return render(<ImageGallery {...rest}>{children}</ImageGallery>);
};

const thumbButtons = () => screen.getAllByRole("button").filter((el) => el.querySelector("img"));

beforeEach(() => {
    mobileState.isMobile = false;
    swipeRefStore.closeSwipe.mockClear();
});

describe("ImageGallery — desktop", () => {
    it("renders the main image and full thumbnail strip", () => {
        renderGallery();

        // Main image: первая картинка активна по умолчанию (defaultId не задан).
        const mainImage = screen.getByAltText("Photo 1");
        expect(mainImage).toBeInTheDocument();
        expect(mainImage).toHaveAttribute("src", "/img/1.jpg");

        // Лента миниатюр: 9 кнопок (по числу items).
        expect(thumbButtons()).toHaveLength(9);
    });

    it("uncontrolled: click on a thumbnail switches the main image", () => {
        renderGallery();

        fireEvent.click(thumbButtons()[3]);

        expect(screen.getByAltText("Photo 4")).toBeInTheDocument();
        expect(thumbButtons()[3]).toHaveAttribute("aria-selected", "true");
    });

    it("controlled: selectedId drives the main image and onChange fires on thumbnail click", () => {
        const onChange = vi.fn();
        const { rerender } = renderGallery({ selectedId: "p3", onChange });

        expect(screen.getByAltText("Photo 3")).toBeInTheDocument();

        fireEvent.click(thumbButtons()[5]);

        // В controlled-режиме внутренний state не меняется — onChange должен сообщить родителю.
        expect(onChange).toHaveBeenCalledWith("p6");
        expect(screen.getByAltText("Photo 3")).toBeInTheDocument();

        rerender(
            <ImageGallery selectedId="p6" onChange={onChange}>
                {buildItems(9)}
            </ImageGallery>,
        );
        expect(screen.getByAltText("Photo 6")).toBeInTheDocument();
    });

    it("ArrowLeft and ArrowRight switch the active image", () => {
        const onChange = vi.fn();
        renderGallery({ defaultId: "p4", onChange });

        const root = screen.getByAltText("Photo 4").closest("[tabindex]") as HTMLElement;

        fireEvent.keyDown(root, { key: "ArrowRight", code: "ArrowRight" });
        expect(onChange).toHaveBeenLastCalledWith("p5");
        expect(screen.getByAltText("Photo 5")).toBeInTheDocument();

        fireEvent.keyDown(root, { key: "ArrowLeft", code: "ArrowLeft" });
        fireEvent.keyDown(root, { key: "ArrowLeft", code: "ArrowLeft" });
        expect(onChange).toHaveBeenLastCalledWith("p3");
        expect(screen.getByAltText("Photo 3")).toBeInTheDocument();
    });

    it("showThumbnails={false} hides the thumbnail strip", () => {
        renderGallery({ showThumbnails: false });

        const buttonsWithImg = screen.queryAllByRole("button").filter((el) => el.querySelector("img"));
        expect(buttonsWithImg).toHaveLength(0);
    });

    it("withBlur={false} does not render the blur layer", () => {
        // Блюр-слой — единственный элемент с inline background-image.
        const { container, rerender } = renderGallery({ withBlur: false });

        expect(container.querySelector('[style*="background-image"]')).toBeNull();

        rerender(<ImageGallery withBlur>{buildItems(9)}</ImageGallery>);
        expect(container.querySelector('[style*="background-image"]')).not.toBeNull();
    });

    it("onImageClick is called with the active index", () => {
        const onImageClick = vi.fn();
        renderGallery({ defaultId: "p5", onImageClick });

        fireEvent.click(screen.getByAltText("Photo 5"));
        expect(onImageClick).toHaveBeenCalledWith(4);
    });

    it("height={number} applies inline style to the main image container", () => {
        const { container } = renderGallery({ height: 400 });

        const main = container.querySelector('[style*="height"]') as HTMLElement | null;
        expect(main).not.toBeNull();
        expect(main!.style.height).toBe("400px");
    });

    it("arrows are baked in and switch the active image", () => {
        renderGallery({ defaultId: "p3" });

        fireEvent.click(screen.getByRole("button", { name: "Следующее изображение" }));
        expect(screen.getByAltText("Photo 4")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Предыдущее изображение" }));
        fireEvent.click(screen.getByRole("button", { name: "Предыдущее изображение" }));
        expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
    });

    it("active thumbnail is marked with aria-selected='true'", () => {
        renderGallery({ defaultId: "p3" });

        const thumbs = thumbButtons();
        expect(thumbs[2]).toHaveAttribute("aria-selected", "true");
        expect(thumbs[0]).toHaveAttribute("aria-selected", "false");
    });
});

describe("ImageGallery — mobile", () => {
    beforeEach(() => {
        mobileState.isMobile = true;
    });

    it("renders 4 dots for 9 items (bucketSize=2)", () => {
        renderGallery({}, 9);
        const dots = screen.getAllByRole("tab");
        expect(dots).toHaveLength(4);
    });

    it("renders 0 dots for a single item", () => {
        renderGallery({}, 1);
        expect(screen.queryAllByRole("tab")).toHaveLength(0);
    });

    it("renders Math.min(items.length, 4) dots", () => {
        const { rerender } = renderGallery({}, 3);
        expect(screen.getAllByRole("tab")).toHaveLength(3);

        rerender(<ImageGallery>{buildItems(2)}</ImageGallery>);
        expect(screen.getAllByRole("tab")).toHaveLength(2);

        rerender(<ImageGallery>{buildItems(10)}</ImageGallery>);
        expect(screen.getAllByRole("tab")).toHaveLength(4);
    });

    it("click on tick t calls onChange with the id at t * bucketSize (9 items → bucketSize=2)", () => {
        const onChange = vi.fn();
        renderGallery({ onChange }, 9);

        const dots = screen.getAllByRole("tab");
        fireEvent.click(dots[2]);
        expect(onChange).toHaveBeenCalledWith("p5");

        fireEvent.click(dots[3]);
        expect(onChange).toHaveBeenCalledWith("p7");
    });

    it("active dot reflects current selectedId via Math.floor(i / bucketSize)", () => {
        const { rerender } = renderGallery({ selectedId: "p1" }, 9);
        let dots = screen.getAllByRole("tab");
        expect(dots[0]).toHaveAttribute("aria-selected", "true");

        rerender(<ImageGallery selectedId="p4">{buildItems(9)}</ImageGallery>);
        dots = screen.getAllByRole("tab");
        // index 3 → tick = floor(3/2) = 1
        expect(dots[1]).toHaveAttribute("aria-selected", "true");

        rerender(<ImageGallery selectedId="p9">{buildItems(9)}</ImageGallery>);
        dots = screen.getAllByRole("tab");
        // index 8 → floor(8/2) = 4, capped at ticksCount-1 = 3
        expect(dots[3]).toHaveAttribute("aria-selected", "true");
    });

    it("showDots={false} hides the dots row", () => {
        renderGallery({ showDots: false }, 9);
        expect(screen.queryAllByRole("tab")).toHaveLength(0);
    });

    it("main image is wrapped in SwipeableArea and swipe callbacks change the image", () => {
        const onChange = vi.fn();
        renderGallery({ onChange, defaultId: "p3" }, 9);

        expect(screen.getByTestId("swipeable-area")).toBeInTheDocument();

        // Свайп влево → onSwipeLeft → next (p4).
        fireEvent.click(screen.getByTestId("swipe-left"));
        expect(onChange).toHaveBeenLastCalledWith("p4");

        // Свайп вправо → onSwipeRight → prev. Внимание: ImageGallery в uncontrolled-режиме
        // сам обновил state, теперь активен p4, prev → p3.
        fireEvent.click(screen.getByTestId("swipe-right"));
        expect(onChange).toHaveBeenLastCalledWith("p3");

        // closeSwipe вызывается на каждом срабатывании.
        expect(swipeRefStore.closeSwipe).toHaveBeenCalledTimes(2);
    });
});
