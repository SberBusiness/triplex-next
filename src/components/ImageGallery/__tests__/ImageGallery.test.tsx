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

const buildItems = (count: number) =>
    Array.from({ length: count }, (_, index) => (
        <ImageGallery.Item key={index} src={`/img/${index + 1}.jpg`} alt={`Photo ${index + 1}`} />
    ));

const renderGallery = (props: Partial<React.ComponentProps<typeof ImageGallery>> = {}, itemsCount = 9) => {
    const { children = buildItems(itemsCount), ...rest } = props;
    return render(<ImageGallery {...rest}>{children}</ImageGallery>);
};

beforeEach(() => {
    mobileState.isMobile = false;
    swipeRefStore.closeSwipe.mockClear();
});

describe("ImageGallery — desktop", () => {
    it("renders the main image and full thumbnail strip", () => {
        renderGallery();

        // Main image: первая картинка активна по умолчанию.
        const mainImage = screen.getByAltText("Photo 1");
        expect(mainImage).toBeInTheDocument();
        expect(mainImage).toHaveAttribute("src", "/img/1.jpg");

        // Лента миниатюр: 9 кнопок (по числу items).
        const thumbButtons = screen.getAllByRole("button").filter((el) => el.querySelector("img"));
        expect(thumbButtons).toHaveLength(9);
    });

    it("uncontrolled: click on a thumbnail switches the main image", () => {
        renderGallery();

        const thumbButtons = screen.getAllByRole("button").filter((el) => el.querySelector("img"));
        fireEvent.click(thumbButtons[3]);

        expect(screen.getByAltText("Photo 4")).toBeInTheDocument();
        expect(thumbButtons[3]).toHaveAttribute("aria-selected", "true");
    });

    it("controlled: selectedIndex drives the main image and onChange fires on thumbnail click", () => {
        const onChange = vi.fn();
        const { rerender } = renderGallery({ selectedIndex: 2, onChange });

        expect(screen.getByAltText("Photo 3")).toBeInTheDocument();

        const thumbButtons = screen.getAllByRole("button").filter((el) => el.querySelector("img"));
        fireEvent.click(thumbButtons[5]);

        // В controlled-режиме внутренний state не меняется — onChange должен сообщить родителю.
        expect(onChange).toHaveBeenCalledWith(5);
        expect(screen.getByAltText("Photo 3")).toBeInTheDocument();

        rerender(
            <ImageGallery selectedIndex={5} onChange={onChange}>
                {buildItems(9)}
            </ImageGallery>,
        );
        expect(screen.getByAltText("Photo 6")).toBeInTheDocument();
    });

    it("ArrowLeft and ArrowRight switch the active index", () => {
        const onChange = vi.fn();
        renderGallery({ defaultIndex: 3, onChange });

        const root = screen.getByAltText("Photo 4").closest("[tabindex]") as HTMLElement;

        fireEvent.keyDown(root, { key: "ArrowRight", code: "ArrowRight" });
        expect(onChange).toHaveBeenLastCalledWith(4);
        expect(screen.getByAltText("Photo 5")).toBeInTheDocument();

        fireEvent.keyDown(root, { key: "ArrowLeft", code: "ArrowLeft" });
        fireEvent.keyDown(root, { key: "ArrowLeft", code: "ArrowLeft" });
        expect(onChange).toHaveBeenLastCalledWith(2);
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
        renderGallery({ defaultIndex: 4, onImageClick });

        fireEvent.click(screen.getByAltText("Photo 5"));
        expect(onImageClick).toHaveBeenCalledWith(4);
    });

    it("height={number} applies inline style to the main image container", () => {
        const { container } = renderGallery({ height: 400 });

        const main = container.querySelector('[style*="height"]') as HTMLElement | null;
        expect(main).not.toBeNull();
        expect(main!.style.height).toBe("400px");
    });

    it("active thumbnail is marked with aria-selected='true'", () => {
        renderGallery({ defaultIndex: 2 });

        const thumbButtons = screen.getAllByRole("button").filter((el) => el.querySelector("img"));
        expect(thumbButtons[2]).toHaveAttribute("aria-selected", "true");
        expect(thumbButtons[0]).toHaveAttribute("aria-selected", "false");
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

    it("click on tick t calls onChange with t * bucketSize (9 items → bucketSize=2)", () => {
        const onChange = vi.fn();
        renderGallery({ onChange }, 9);

        const dots = screen.getAllByRole("tab");
        fireEvent.click(dots[2]);
        expect(onChange).toHaveBeenCalledWith(4);

        fireEvent.click(dots[3]);
        expect(onChange).toHaveBeenCalledWith(6);
    });

    it("active dot reflects current selectedIndex via Math.floor(i / bucketSize)", () => {
        const { rerender } = renderGallery({ selectedIndex: 0 }, 9);
        let dots = screen.getAllByRole("tab");
        expect(dots[0]).toHaveAttribute("aria-selected", "true");

        rerender(<ImageGallery selectedIndex={3}>{buildItems(9)}</ImageGallery>);
        dots = screen.getAllByRole("tab");
        // bucketSize=2 → tick = floor(3/2) = 1
        expect(dots[1]).toHaveAttribute("aria-selected", "true");

        rerender(<ImageGallery selectedIndex={8}>{buildItems(9)}</ImageGallery>);
        dots = screen.getAllByRole("tab");
        // floor(8/2) = 4, capped at ticksCount-1 = 3
        expect(dots[3]).toHaveAttribute("aria-selected", "true");
    });

    it("showDots={false} hides the dots row", () => {
        renderGallery({ showDots: false }, 9);
        expect(screen.queryAllByRole("tab")).toHaveLength(0);
    });

    it("main image is wrapped in SwipeableArea and swipe callbacks change the index", () => {
        const onChange = vi.fn();
        renderGallery({ onChange, defaultIndex: 2 }, 9);

        expect(screen.getByTestId("swipeable-area")).toBeInTheDocument();

        // Свайп влево → onSwipeLeft → next (3).
        fireEvent.click(screen.getByTestId("swipe-left"));
        expect(onChange).toHaveBeenLastCalledWith(3);

        // Свайп вправо → onSwipeRight → prev (1).
        // Внимание: ImageGallery в uncontrolled-режиме сам обновил state, теперь currentIndex=3.
        fireEvent.click(screen.getByTestId("swipe-right"));
        expect(onChange).toHaveBeenLastCalledWith(2);

        // closeSwipe вызывается на каждом срабатывании.
        expect(swipeRefStore.closeSwipe).toHaveBeenCalledTimes(2);
    });
});
