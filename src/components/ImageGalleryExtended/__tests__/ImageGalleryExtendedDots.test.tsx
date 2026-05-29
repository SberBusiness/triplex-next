import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { ImageGalleryExtended } from "../ImageGalleryExtended";

/** Идентификатор элемента по порядковому номеру (с 1). */
const itemId = (index: number) => `p${index + 1}`;

const buildItems = (count: number) =>
    Array.from({ length: count }, (_, index) => ({
        id: itemId(index),
        src: `/img/${index + 1}.jpg`,
        alt: `Photo ${index + 1}`,
    }));

const renderDots = (count: number, selectedId: string, onChange = vi.fn()) =>
    render(
        <ImageGalleryExtended items={buildItems(count)} selectedId={selectedId} onChange={onChange}>
            <ImageGalleryExtended.Dots />
        </ImageGalleryExtended>,
    );

describe("ImageGalleryExtendedDots", () => {
    it("при одном изображении ничего не рендерит", () => {
        const { container } = renderDots(1, "p1");
        expect(container.querySelector("button")).toBeNull();
    });

    it("при пустом списке ничего не рендерит", () => {
        const { container } = render(
            <ImageGalleryExtended items={[]} selectedId="" onChange={vi.fn()}>
                <ImageGalleryExtended.Dots />
            </ImageGalleryExtended>,
        );
        expect(container.querySelector("button")).toBeNull();
    });

    it("при числе изображений <= 4 рисует тик на каждое (без бакетов)", () => {
        renderDots(3, "p1");
        expect(screen.getAllByRole("button")).toHaveLength(3);
    });

    it("при числе изображений > 4 ограничивает количество тиков до 4", () => {
        renderDots(12, "p1");
        expect(screen.getAllByRole("button")).toHaveLength(4);
    });

    it("активный тик помечается aria-current по бакету выбранного изображения", () => {
        // 9 items, ticksCount=4, bucketSize=2: индекс 5 → бакет 2 (третий тик).
        renderDots(9, "p6");
        const dots = screen.getAllByRole("button");
        expect(dots[2]).toHaveAttribute("aria-current", "true");
        expect(dots[0]).not.toHaveAttribute("aria-current");
    });

    it("клик по тику выбирает изображение в начале его бакета", () => {
        const onChange = vi.fn();
        // 9 items, bucketSize=2: тик 3 → index 6 → p7.
        renderDots(9, "p1", onChange);
        fireEvent.click(screen.getAllByRole("button")[3]);
        expect(onChange).toHaveBeenCalledWith("p7");
    });

    it("мерджит кастомный className в корневой элемент", () => {
        const { container } = render(
            <ImageGalleryExtended items={buildItems(9)} selectedId="p1" onChange={vi.fn()}>
                <ImageGalleryExtended.Dots className="custom-dots" />
            </ImageGalleryExtended>,
        );
        expect(container.querySelector(".dots")).toHaveClass("custom-dots");
    });

    it("пробрасывает ref на корневой <div>", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <ImageGalleryExtended items={buildItems(9)} selectedId="p1" onChange={vi.fn()}>
                <ImageGalleryExtended.Dots ref={ref} />
            </ImageGalleryExtended>,
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
