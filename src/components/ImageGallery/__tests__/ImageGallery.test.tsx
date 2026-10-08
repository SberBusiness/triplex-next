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

    it("passes thumbnailsProps (including data-*) to desktop thumbnails", () => {
        renderGallery({
            thumbnailsProps: {
                id: "thumbnails",
                "data-test-id": "thumbnails-test-id",
            },
        });

        const thumbnails = document.getElementById("thumbnails");
        expect(thumbnails).toBeInTheDocument();
        expect(thumbnails).toHaveAttribute("data-test-id", "thumbnails-test-id");
        // Доступное имя миниатюры берётся из item.alt.
        expect(screen.getByRole("button", { name: "Photo 5" })).toBeInTheDocument();
    });
});

describe("ImageGallery — mobile", () => {
    beforeEach(() => {
        mobileState.isMobile = true;
    });

    // Логика индикаторов покрыта в PageIndicators.test.tsx и ImageGalleryExtendedPageIndicators.test.tsx.
    it("uncontrolled: click on a page indicator switches the main image", () => {
        const onChange = vi.fn();
        renderGallery({ onChange }, 9);

        fireEvent.click(screen.getByRole("tab", { name: "Photo 3" }));

        expect(onChange).toHaveBeenCalledWith("p3");
        expect(screen.getByAltText("Photo 3")).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: "Photo 3" })).toHaveAttribute("aria-selected", "true");
    });

    it("showPageIndicators={false} hides the page indicators", () => {
        renderGallery({ showPageIndicators: false }, 9);
        expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    });

    it("passes pageIndicatorsProps (including data-*) to mobile page indicators", () => {
        renderGallery(
            {
                pageIndicatorsProps: {
                    id: "page-indicators",
                    "data-test-id": "page-indicators-test-id",
                },
            },
            9,
        );

        const pageIndicators = document.getElementById("page-indicators");
        expect(pageIndicators).toBeInTheDocument();
        expect(pageIndicators).toHaveAttribute("data-test-id", "page-indicators-test-id");
        expect(pageIndicators).toHaveAttribute("role", "tablist");
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
