import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const { mobileState } = vi.hoisted(() => ({
    mobileState: { isMobile: false },
}));

vi.mock("@sberbusiness/triplex-next/components/MobileView", () => ({
    MobileView: ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) =>
        mobileState.isMobile ? <>{children}</> : <>{fallback}</>,
}));

import { ImageGallery } from "../ImageGallery";

/** Идентификатор элемента по порядковому номеру (с 1). */
const itemId = (index: number) => `p${index + 1}`;

const buildItems = (count: number) =>
    Array.from({ length: count }, (_, index) => ({
        id: itemId(index),
        src: `/img/${index + 1}.jpg`,
        alt: `Photo ${index + 1}`,
    }));

const renderGallery = (props: Partial<React.ComponentProps<typeof ImageGallery>> = {}, itemsCount = 9) => {
    const { items = buildItems(itemsCount), ...rest } = props;
    return render(
        <ImageGallery
            items={items}
            prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
            nextArrowProps={{ "aria-label": "Следующее изображение" }}
            {...rest}
        />,
    );
};

const thumbButtons = () => screen.getAllByRole("button").filter((el) => el.querySelector("img"));

beforeEach(() => {
    mobileState.isMobile = false;
});

describe("ImageGallery — desktop", () => {
    it("forwards ref to the gallery root", () => {
        const ref = React.createRef<HTMLDivElement>();

        renderGallery({ ref });

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

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
        expect(thumbButtons()[3]).toHaveAttribute("aria-current", "true");
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
            <ImageGallery
                items={buildItems(9)}
                selectedId="p6"
                onChange={onChange}
                prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
                nextArrowProps={{ "aria-label": "Следующее изображение" }}
            />,
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
        const { container, rerender } = renderGallery({ withBlur: false });

        expect(container.querySelector('img[aria-hidden="true"]')).toBeNull();

        rerender(
            <ImageGallery
                items={buildItems(9)}
                withBlur
                prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
                nextArrowProps={{ "aria-label": "Следующее изображение" }}
            />,
        );
        expect(container.querySelector('img[aria-hidden="true"]')).not.toBeNull();
    });

    it("onImageClick is called with the active index", () => {
        const onImageClick = vi.fn();
        renderGallery({ defaultId: "p5", onImageClick });

        fireEvent.click(screen.getByAltText("Photo 5"));
        expect(onImageClick).toHaveBeenCalledWith(4);
    });

    it("height={number} applies height CSS variable to the main image container", () => {
        const { container } = renderGallery({ height: 400 });

        const main = container.querySelector(
            '[style*="--triplex-next-runtime-ImageGalleryExtended-Main_Height"]',
        ) as HTMLElement | null;
        expect(main).not.toBeNull();
        expect(main?.style.getPropertyValue("--triplex-next-runtime-ImageGalleryExtended-Main_Height")).toBe("400px");
    });

    it("arrows are baked in and switch the active image", () => {
        renderGallery({ defaultId: "p3" });

        fireEvent.click(screen.getByRole("button", { name: "Следующее изображение" }));
        expect(screen.getByAltText("Photo 4")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Предыдущее изображение" }));
        fireEvent.click(screen.getByRole("button", { name: "Предыдущее изображение" }));
        expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
    });

    it("passes arrow props to the navigation buttons", () => {
        renderGallery({
            prevArrowProps: { "aria-label": "Previous photo", title: "Go back" },
            nextArrowProps: { "aria-label": "Next photo", title: "Go forward" },
        });

        expect(screen.getByRole("button", { name: "Previous photo" })).toHaveAttribute("title", "Go back");
        expect(screen.getByRole("button", { name: "Next photo" })).toHaveAttribute("title", "Go forward");
    });

    it("active thumbnail is marked with aria-current='true'", () => {
        renderGallery({ defaultId: "p3" });

        const thumbs = thumbButtons();
        expect(thumbs[2]).toHaveAttribute("aria-current", "true");
        expect(thumbs[0]).not.toHaveAttribute("aria-current");
    });

    it("passes thumbnailsProps to desktop thumbnails", () => {
        renderGallery({
            thumbnailsProps: {
                id: "thumbnails",
                getThumbnailAriaLabel: ({ item, index }) => `Миниатюра ${index + 1}: ${item.id}`,
            },
        });

        expect(document.getElementById("thumbnails")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Миниатюра 5: p5" })).toBeInTheDocument();
    });
});

describe("ImageGallery — mobile", () => {
    beforeEach(() => {
        mobileState.isMobile = true;
    });

    it("renders 4 dots for 9 items (bucketSize=2)", () => {
        renderGallery({}, 9);
        const dots = screen.getAllByRole("button", { name: /Photo/ });
        expect(dots).toHaveLength(4);
    });

    it("renders 0 dots for a single item", () => {
        renderGallery({}, 1);
        expect(screen.queryAllByRole("button", { name: /Photo/ })).toHaveLength(0);
    });

    it("renders Math.min(items.length, 4) dots", () => {
        const { rerender } = renderGallery({}, 3);
        expect(screen.getAllByRole("button", { name: /Photo/ })).toHaveLength(3);

        rerender(
            <ImageGallery
                items={buildItems(2)}
                prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
                nextArrowProps={{ "aria-label": "Следующее изображение" }}
            />,
        );
        expect(screen.getAllByRole("button", { name: /Photo/ })).toHaveLength(2);

        rerender(
            <ImageGallery
                items={buildItems(10)}
                prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
                nextArrowProps={{ "aria-label": "Следующее изображение" }}
            />,
        );
        expect(screen.getAllByRole("button", { name: /Photo/ })).toHaveLength(4);
    });

    it("click on tick t calls onChange with the id at t * bucketSize (9 items → bucketSize=2)", () => {
        const onChange = vi.fn();
        renderGallery({ onChange }, 9);

        const dots = screen.getAllByRole("button", { name: /Photo/ });
        fireEvent.click(dots[2]);
        expect(onChange).toHaveBeenCalledWith("p5");

        fireEvent.click(dots[3]);
        expect(onChange).toHaveBeenCalledWith("p7");
    });

    it("active dot reflects current selectedId via Math.floor(i / bucketSize)", () => {
        const { rerender } = renderGallery({ selectedId: "p1" }, 9);
        let dots = screen.getAllByRole("button", { name: /Photo/ });
        expect(dots[0]).toHaveAttribute("aria-current", "true");

        rerender(
            <ImageGallery
                items={buildItems(9)}
                selectedId="p4"
                prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
                nextArrowProps={{ "aria-label": "Следующее изображение" }}
            />,
        );
        dots = screen.getAllByRole("button", { name: /Photo/ });
        // index 3 → tick = floor(3/2) = 1
        expect(dots[1]).toHaveAttribute("aria-current", "true");

        rerender(
            <ImageGallery
                items={buildItems(9)}
                selectedId="p9"
                prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
                nextArrowProps={{ "aria-label": "Следующее изображение" }}
            />,
        );
        dots = screen.getAllByRole("button", { name: /Photo/ });
        // index 8 → floor(8/2) = 4, capped at ticksCount-1 = 3
        expect(dots[3]).toHaveAttribute("aria-current", "true");
    });

    it("showDots={false} hides the dots row", () => {
        renderGallery({ showDots: false }, 9);
        expect(screen.queryAllByRole("button", { name: /Photo/ })).toHaveLength(0);
    });

    it("passes dotsProps to mobile dots", () => {
        renderGallery(
            {
                dotsProps: {
                    id: "dots",
                    getDotAriaLabel: ({ item, tickIndex }) => `Тик ${tickIndex + 1}: ${item.id}`,
                },
            },
            9,
        );

        expect(document.getElementById("dots")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Тик 3: p5" })).toBeInTheDocument();
    });

    /** jsdom не реализует TouchEvent/TransitionEvent — диспатчим обычный Event с нужными полями. */
    const dispatch = (node: HTMLElement, type: string, init: Record<string, unknown>) => {
        const event = new Event(type, { bubbles: true, cancelable: true });
        Object.assign(event, init);
        fireEvent(node, event);
    };

    const fireSwipe = (track: HTMLElement, fromX: number, toX: number, deltaY = 0) => {
        const endY = 100 + deltaY;

        dispatch(track, "touchstart", { touches: [{ clientX: fromX, clientY: 100 }] });
        dispatch(track, "touchmove", { touches: [{ clientX: toX, clientY: endY }] });
        dispatch(track, "touchend", { changedTouches: [{ clientX: toX, clientY: endY }] });
        dispatch(track, "transitionend", { propertyName: "transform" });
    };

    it("mobile swipe changes the image", () => {
        const onChange = vi.fn();
        renderGallery({ onChange, defaultId: "p3" }, 9);

        const track = screen.getByAltText("Photo 3").parentElement?.parentElement as HTMLElement;

        // Свайп влево → next (p4).
        fireSwipe(track, 300, 200);
        expect(onChange).toHaveBeenLastCalledWith("p4");

        // Свайп вправо → prev. Внимание: ImageGallery в uncontrolled-режиме
        // сам обновил state, теперь активен p4, prev → p3.
        fireSwipe(track, 200, 300);
        expect(onChange).toHaveBeenLastCalledWith("p3");
    });
});
