import React, { useState } from "react";
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

import { ImageGalleryExtended } from "../ImageGalleryExtended";
import { EImageGalleryArrowDirection } from "../enums";

/** Идентификатор элемента по порядковому номеру (с 1). */
const itemId = (index: number) => `p${index + 1}`;

const buildItems = (count: number) =>
    Array.from({ length: count }, (_, index) => ({
        id: itemId(index),
        src: `/img/${index + 1}.jpg`,
        alt: `Photo ${index + 1}`,
    }));

/** Controlled-обёртка: держит активный id в state и прокидывает спай onChange. */
const ControlledGallery: React.FC<{
    items: ReturnType<typeof buildItems>;
    children?: React.ReactNode;
    initialId?: string;
    onChange?: (id: string) => void;
}> = ({ items, children, initialId = "p1", onChange }) => {
    const [id, setId] = useState(initialId);

    return (
        <ImageGalleryExtended
            items={items}
            selectedId={id}
            onChange={(next) => {
                setId(next);
                onChange?.(next);
            }}
        >
            {children}
        </ImageGalleryExtended>
    );
};

const thumbButtons = () => screen.queryAllByRole("button").filter((el) => el.querySelector("img"));

beforeEach(() => {
    mobileState.isMobile = false;
    swipeRefStore.closeSwipe.mockClear();
});

describe("ImageGalleryExtended — состав через контекст", () => {
    it("Main и Thumbnails берут данные из контекста контейнера", () => {
        render(
            <ControlledGallery items={buildItems(9)}>
                <ImageGalleryExtended.Main />
                <ImageGalleryExtended.Thumbnails />
            </ControlledGallery>,
        );

        // Main: первая картинка активна.
        expect(screen.getByAltText("Photo 1")).toHaveAttribute("src", "/img/1.jpg");
        // Thumbnails: по кнопке на каждый item.
        expect(thumbButtons()).toHaveLength(9);
    });

    it("без layout-частей ничего не рендерит (items в пропе, но нечем рисовать)", () => {
        const { container } = render(<ControlledGallery items={buildItems(9)} />);

        expect(container.querySelector("img")).toBeNull();
        expect(screen.queryAllByRole("button")).toHaveLength(0);
    });

    it("рендерит только те части, что переданы (Main без Thumbnails — нет миниатюр)", () => {
        render(
            <ControlledGallery items={buildItems(9)}>
                <ImageGalleryExtended.Main />
            </ControlledGallery>,
        );

        expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
        expect(thumbButtons()).toHaveLength(0);
    });
});

describe("ImageGalleryExtended — controlled-навигация", () => {
    it("клик по миниатюре вызывает onChange с её id и меняет активную картинку", () => {
        const onChange = vi.fn();
        render(
            <ControlledGallery items={buildItems(9)} onChange={onChange}>
                <ImageGalleryExtended.Main />
                <ImageGalleryExtended.Thumbnails />
            </ControlledGallery>,
        );

        fireEvent.click(thumbButtons()[4]);

        expect(onChange).toHaveBeenCalledWith("p5");
        expect(screen.getByAltText("Photo 5")).toBeInTheDocument();
        expect(thumbButtons()[4]).toHaveAttribute("aria-selected", "true");
    });

    it("ArrowLeft/ArrowRight на контейнере переключают активный id", () => {
        const onChange = vi.fn();
        render(
            <ControlledGallery items={buildItems(9)} initialId="p4" onChange={onChange}>
                <ImageGalleryExtended.Main />
            </ControlledGallery>,
        );

        const root = screen.getByAltText("Photo 4").closest("[tabindex]") as HTMLElement;

        fireEvent.keyDown(root, { key: "ArrowRight", code: "ArrowRight" });
        expect(onChange).toHaveBeenLastCalledWith("p5");
        expect(screen.getByAltText("Photo 5")).toBeInTheDocument();

        fireEvent.keyDown(root, { key: "ArrowLeft", code: "ArrowLeft" });
        fireEvent.keyDown(root, { key: "ArrowLeft", code: "ArrowLeft" });
        expect(onChange).toHaveBeenLastCalledWith("p3");
        expect(screen.getByAltText("Photo 3")).toBeInTheDocument();
    });

    it("onChange не вызывается, если id не меняется (клик по уже активной миниатюре)", () => {
        const onChange = vi.fn();
        render(
            <ControlledGallery items={buildItems(9)} initialId="p3" onChange={onChange}>
                <ImageGalleryExtended.Thumbnails />
            </ControlledGallery>,
        );

        fireEvent.click(thumbButtons()[2]);
        expect(onChange).not.toHaveBeenCalled();
    });

    it("неизвестный selectedId резолвится в первый элемент", () => {
        render(
            <ImageGalleryExtended items={buildItems(9)} selectedId="missing" onChange={vi.fn()}>
                <ImageGalleryExtended.Main />
            </ImageGalleryExtended>,
        );

        expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    });
});

describe("ImageGalleryExtended — Main", () => {
    it("withBlur рендерит блюр-слой (inline background-image)", () => {
        const { container, rerender } = render(
            <ImageGalleryExtended items={buildItems(9)} selectedId="p1" onChange={vi.fn()}>
                <ImageGalleryExtended.Main withBlur={false} />
            </ImageGalleryExtended>,
        );

        expect(container.querySelector('[style*="background-image"]')).toBeNull();

        rerender(
            <ImageGalleryExtended items={buildItems(9)} selectedId="p1" onChange={vi.fn()}>
                <ImageGalleryExtended.Main withBlur />
            </ImageGalleryExtended>,
        );
        expect(container.querySelector('[style*="background-image"]')).not.toBeNull();
    });

    it("onImageClick вызывается с активным индексом", () => {
        const onImageClick = vi.fn();
        render(
            <ImageGalleryExtended items={buildItems(9)} selectedId="p5" onChange={vi.fn()}>
                <ImageGalleryExtended.Main onImageClick={onImageClick} />
            </ImageGalleryExtended>,
        );

        fireEvent.click(screen.getByAltText("Photo 5"));
        expect(onImageClick).toHaveBeenCalledWith(4);
    });
});

describe("ImageGalleryExtended — Nav (render-функция)", () => {
    const renderWithArrows = (props: { initialId?: string; onChange?: (id: string) => void } = {}) =>
        render(
            <ControlledGallery items={buildItems(9)} initialId={props.initialId} onChange={props.onChange}>
                <ImageGalleryExtended.Main>
                    <ImageGalleryExtended.Nav>
                        {({ onPrev, onNext, isFirst, isLast }) => (
                            <>
                                <ImageGalleryExtended.Arrow
                                    direction={EImageGalleryArrowDirection.PREV}
                                    onClick={onPrev}
                                    disabled={isFirst}
                                />
                                <ImageGalleryExtended.Arrow
                                    direction={EImageGalleryArrowDirection.NEXT}
                                    onClick={onNext}
                                    disabled={isLast}
                                />
                            </>
                        )}
                    </ImageGalleryExtended.Nav>
                </ImageGalleryExtended.Main>
            </ControlledGallery>,
        );

    it("стрелки из render-функции переключают активный id", () => {
        const onChange = vi.fn();
        renderWithArrows({ initialId: "p3", onChange });

        fireEvent.click(screen.getByRole("button", { name: "Следующее изображение" }));
        expect(onChange).toHaveBeenLastCalledWith("p4");
        expect(screen.getByAltText("Photo 4")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Предыдущее изображение" }));
        fireEvent.click(screen.getByRole("button", { name: "Предыдущее изображение" }));
        expect(onChange).toHaveBeenLastCalledWith("p2");
        expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
    });

    it("isFirst/isLast из состояния навигации блокируют стрелки на границах", () => {
        renderWithArrows({ initialId: "p1" });

        expect(screen.getByRole("button", { name: "Предыдущее изображение" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Следующее изображение" })).not.toBeDisabled();
    });
});

describe("ImageGalleryExtended — Dots (мобильный)", () => {
    beforeEach(() => {
        mobileState.isMobile = true;
    });

    it("рендерит min(items, 4) тиков и клик переключает id через bucketSize", () => {
        const onChange = vi.fn();
        render(
            <ControlledGallery items={buildItems(9)} onChange={onChange}>
                <ImageGalleryExtended.Main />
                <ImageGalleryExtended.Dots />
            </ControlledGallery>,
        );

        const dots = screen.getAllByRole("tab");
        expect(dots).toHaveLength(4);

        // 9 items, bucketSize=2: тик 2 → index 4 → p5.
        fireEvent.click(dots[2]);
        expect(onChange).toHaveBeenCalledWith("p5");
        expect(screen.getByAltText("Photo 5")).toBeInTheDocument();
    });
});

describe("ImageGalleryExtended — Thumbnails (render-функция)", () => {
    it("кастомная render-функция получает состояние и переключает id", () => {
        const onChange = vi.fn();
        render(
            <ControlledGallery items={buildItems(9)} onChange={onChange}>
                <ImageGalleryExtended.Thumbnails>
                    {({ item, isActive, onSelect, ref }) => (
                        <button
                            ref={ref}
                            type="button"
                            aria-label={`thumb-${item.id}`}
                            aria-selected={isActive}
                            onClick={onSelect}
                        />
                    )}
                </ImageGalleryExtended.Thumbnails>
            </ControlledGallery>,
        );

        // По кастомной кнопке на каждый item.
        expect(screen.getAllByRole("button")).toHaveLength(9);

        fireEvent.click(screen.getByRole("button", { name: "thumb-p5" }));
        expect(onChange).toHaveBeenCalledWith("p5");
        expect(screen.getByRole("button", { name: "thumb-p5" })).toHaveAttribute("aria-selected", "true");
    });

    it("по умолчанию (без children) рисует стандартные миниатюры", () => {
        render(
            <ControlledGallery items={buildItems(9)}>
                <ImageGalleryExtended.Thumbnails />
            </ControlledGallery>,
        );

        expect(thumbButtons()).toHaveLength(9);
    });
});

describe("ImageGalleryExtended — Thumbnails (фокус следует за выбором)", () => {
    it("при навигации стрелками фокус переносится с прежней миниатюры на активную", () => {
        render(
            <ControlledGallery items={buildItems(9)} initialId="p3">
                <ImageGalleryExtended.Main />
                <ImageGalleryExtended.Thumbnails />
            </ControlledGallery>,
        );

        const thumbs = thumbButtons();
        const root = screen.getByAltText("Photo 3").closest("[tabindex]") as HTMLElement;

        // Фокус на текущей активной миниатюре — как остаётся после клика мышью.
        thumbs[2].focus();
        expect(thumbs[2]).toHaveFocus();

        fireEvent.keyDown(root, { key: "ArrowRight", code: "ArrowRight" });

        // Фокус ушёл на новую активную миниатюру, на старой его не осталось
        // (иначе :focus-visible подсветил бы сразу две миниатюры).
        expect(thumbButtons()[3]).toHaveFocus();
        expect(thumbButtons()[2]).not.toHaveFocus();
    });

    it("навигация стрелками не уводит фокус в ленту, если он не на миниатюре", () => {
        render(
            <ControlledGallery items={buildItems(9)} initialId="p3">
                <ImageGalleryExtended.Main />
                <ImageGalleryExtended.Thumbnails />
            </ControlledGallery>,
        );

        const root = screen.getByAltText("Photo 3").closest("[tabindex]") as HTMLElement;
        root.focus();

        fireEvent.keyDown(root, { key: "ArrowRight", code: "ArrowRight" });

        expect(screen.getByAltText("Photo 4")).toBeInTheDocument();
        thumbButtons().forEach((btn) => expect(btn).not.toHaveFocus());
    });
});
