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
    Array.from({ length: count }, (_, index) => (
        <ImageGalleryExtended.Item
            key={index}
            id={itemId(index)}
            src={`/img/${index + 1}.jpg`}
            alt={`Photo ${index + 1}`}
        />
    ));

/** Controlled-обёртка: держит активный id в state и прокидывает спай onChange. */
const ControlledGallery: React.FC<{
    children: React.ReactNode;
    initialId?: string;
    onChange?: (id: string) => void;
}> = ({ children, initialId = "p1", onChange }) => {
    const [id, setId] = useState(initialId);

    return (
        <ImageGalleryExtended
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
            <ControlledGallery>
                <ImageGalleryExtended.Main />
                <ImageGalleryExtended.Thumbnails />
                {buildItems(9)}
            </ControlledGallery>,
        );

        // Main: первая картинка активна.
        expect(screen.getByAltText("Photo 1")).toHaveAttribute("src", "/img/1.jpg");
        // Thumbnails: по кнопке на каждый Item.
        expect(thumbButtons()).toHaveLength(9);
    });

    it("Item-маркеры сами ничего не рендерят (без layout-частей DOM пустой)", () => {
        const { container } = render(<ControlledGallery>{buildItems(9)}</ControlledGallery>);

        expect(container.querySelector("img")).toBeNull();
        expect(screen.queryAllByRole("button")).toHaveLength(0);
    });

    it("рендерит только те части, что переданы (Main без Thumbnails — нет миниатюр)", () => {
        render(
            <ControlledGallery>
                <ImageGalleryExtended.Main />
                {buildItems(9)}
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
            <ControlledGallery onChange={onChange}>
                <ImageGalleryExtended.Main />
                <ImageGalleryExtended.Thumbnails />
                {buildItems(9)}
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
            <ControlledGallery initialId="p4" onChange={onChange}>
                <ImageGalleryExtended.Main />
                {buildItems(9)}
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
            <ControlledGallery initialId="p3" onChange={onChange}>
                <ImageGalleryExtended.Thumbnails />
                {buildItems(9)}
            </ControlledGallery>,
        );

        fireEvent.click(thumbButtons()[2]);
        expect(onChange).not.toHaveBeenCalled();
    });

    it("неизвестный selectedId резолвится в первый элемент", () => {
        render(
            <ImageGalleryExtended selectedId="missing" onChange={vi.fn()}>
                <ImageGalleryExtended.Main />
                {buildItems(9)}
            </ImageGalleryExtended>,
        );

        expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    });
});

describe("ImageGalleryExtended — Main", () => {
    it("withBlur рендерит блюр-слой (inline background-image)", () => {
        const { container, rerender } = render(
            <ImageGalleryExtended selectedId="p1" onChange={vi.fn()}>
                <ImageGalleryExtended.Main withBlur={false} />
                {buildItems(9)}
            </ImageGalleryExtended>,
        );

        expect(container.querySelector('[style*="background-image"]')).toBeNull();

        rerender(
            <ImageGalleryExtended selectedId="p1" onChange={vi.fn()}>
                <ImageGalleryExtended.Main withBlur />
                {buildItems(9)}
            </ImageGalleryExtended>,
        );
        expect(container.querySelector('[style*="background-image"]')).not.toBeNull();
    });

    it("onImageClick вызывается с активным индексом", () => {
        const onImageClick = vi.fn();
        render(
            <ImageGalleryExtended selectedId="p5" onChange={vi.fn()}>
                <ImageGalleryExtended.Main onImageClick={onImageClick} />
                {buildItems(9)}
            </ImageGalleryExtended>,
        );

        fireEvent.click(screen.getByAltText("Photo 5"));
        expect(onImageClick).toHaveBeenCalledWith(4);
    });
});

describe("ImageGalleryExtended — Nav (render-функция)", () => {
    const renderWithArrows = (props: { initialId?: string; onChange?: (id: string) => void } = {}) =>
        render(
            <ControlledGallery initialId={props.initialId} onChange={props.onChange}>
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
                {buildItems(9)}
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
            <ControlledGallery onChange={onChange}>
                <ImageGalleryExtended.Main />
                <ImageGalleryExtended.Dots />
                {buildItems(9)}
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
