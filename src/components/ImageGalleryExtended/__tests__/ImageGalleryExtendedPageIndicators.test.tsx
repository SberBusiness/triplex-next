import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { ImageGalleryExtended } from "../ImageGalleryExtended";
import { IImageGalleryExtendedPageIndicatorsProps } from "../components/ImageGalleryExtendedPageIndicators";

/** Идентификатор элемента по порядковому номеру (с 1). */
const itemId = (index: number) => `p${index + 1}`;

const buildItems = (count: number) =>
    Array.from({ length: count }, (_, index) => ({
        id: itemId(index),
        src: `/img/${index + 1}.jpg`,
        alt: `Photo ${index + 1}`,
    }));

const renderPageIndicators = (
    count: number,
    selectedId: string,
    onChange = vi.fn(),
    props: IImageGalleryExtendedPageIndicatorsProps = {},
) =>
    render(
        <ImageGalleryExtended items={buildItems(count)} selectedId={selectedId} onChange={onChange}>
            <ImageGalleryExtended.PageIndicators {...props} />
        </ImageGalleryExtended>,
    );

describe("ImageGalleryExtendedPageIndicators", () => {
    it("renders nothing for a single image", () => {
        renderPageIndicators(1, "p1");
        expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    });

    it("renders nothing for an empty list", () => {
        render(
            <ImageGalleryExtended items={[]} selectedId="" onChange={vi.fn()}>
                <ImageGalleryExtended.PageIndicators />
            </ImageGalleryExtended>,
        );
        expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    });

    it("renders an indicator per image", () => {
        renderPageIndicators(12, "p1");
        expect(screen.getAllByRole("tab", { hidden: true })).toHaveLength(12);
    });

    it("marks the indicator of the selected image as active", () => {
        renderPageIndicators(9, "p6");
        expect(screen.getByRole("tab", { name: "Photo 6" })).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("tab", { name: "Photo 5" })).toHaveAttribute("aria-selected", "false");
    });

    it("selects the image of the clicked indicator", () => {
        const onChange = vi.fn();
        renderPageIndicators(9, "p1", onChange);
        fireEvent.click(screen.getByRole("tab", { name: "Photo 3" }));
        expect(onChange).toHaveBeenCalledWith("p3");
    });

    it("switches the image with arrow keys on the indicators row", () => {
        const onChange = vi.fn();
        renderPageIndicators(9, "p2", onChange);
        fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
        expect(onChange).toHaveBeenCalledWith("p3");
    });

    it("lets indicatorProps override the accessible name from item.alt", () => {
        renderPageIndicators(3, "p1", vi.fn(), {
            indicatorProps: ({ page }) => ({ "aria-label": `Slide ${page}` }),
        });
        expect(screen.getByRole("tab", { name: "Slide 2" })).toBeInTheDocument();
        expect(screen.queryByRole("tab", { name: "Photo 2" })).not.toBeInTheDocument();
    });

    it("merges a custom className into the root element", () => {
        renderPageIndicators(9, "p1", vi.fn(), { className: "custom-page-indicators" });
        expect(screen.getByRole("tablist")).toHaveClass("custom-page-indicators");
    });

    it("forwards ref to the root <div>", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <ImageGalleryExtended items={buildItems(9)} selectedId="p1" onChange={vi.fn()}>
                <ImageGalleryExtended.PageIndicators ref={ref} />
            </ImageGalleryExtended>,
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveAttribute("role", "tablist");
    });
});
