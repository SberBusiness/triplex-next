import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const { mobileState, scrollSpy } = vi.hoisted(() => ({
    mobileState: { isMobile: false },
    scrollSpy: vi.fn(),
}));

vi.mock("@sberbusiness/triplex-next/components/MobileView", () => ({
    MobileView: ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) =>
        mobileState.isMobile ? <>{children}</> : <>{fallback}</>,
}));

vi.mock("@sberbusiness/triplex-next/utils/scroll", () => ({
    scrollSmoothHorizontally: scrollSpy,
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
    scrollSpy.mockClear();
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
        expect(thumbButtons()[4]).toHaveAttribute("aria-current", "true");
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
    it("withBlur рендерит блюр-слой", () => {
        const { container, rerender } = render(
            <ImageGalleryExtended items={buildItems(9)} selectedId="p1" onChange={vi.fn()}>
                <ImageGalleryExtended.Main withBlur={false} />
            </ImageGalleryExtended>,
        );

        expect(container.querySelector('img[aria-hidden="true"]')).toBeNull();

        rerender(
            <ImageGalleryExtended items={buildItems(9)} selectedId="p1" onChange={vi.fn()}>
                <ImageGalleryExtended.Main withBlur />
            </ImageGalleryExtended>,
        );
        expect(container.querySelector('img[aria-hidden="true"]')).not.toBeNull();
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

describe("ImageGalleryExtended — Main (свайп на мобильном)", () => {
    beforeEach(() => {
        mobileState.isMobile = true;
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
        // touchmove фиксирует направление жеста (горизонталь/вертикаль).
        dispatch(track, "touchmove", { touches: [{ clientX: toX, clientY: endY }] });
        dispatch(track, "touchend", { changedTouches: [{ clientX: toX, clientY: endY }] });
        // Смена изображения происходит по завершении анимации доводки ленты — эмулируем её.
        dispatch(track, "transitionend", { propertyName: "transform" });
    };

    /** Лента свайпа — обёртка слайдов: img → .slide → .track. */
    const renderMain = (onChange: (id: string) => void) => {
        render(
            <ControlledGallery items={buildItems(9)} initialId="p3" onChange={onChange}>
                <ImageGalleryExtended.Main />
            </ControlledGallery>,
        );

        return screen.getByAltText("Photo 3").parentElement?.parentElement as HTMLElement;
    };

    it("свайп влево переключает на следующее изображение", () => {
        const onChange = vi.fn();
        const card = renderMain(onChange);

        fireSwipe(card, 300, 200);

        expect(onChange).toHaveBeenCalledWith("p4");
    });

    it("свайп вправо переключает на предыдущее изображение", () => {
        const onChange = vi.fn();
        const card = renderMain(onChange);

        fireSwipe(card, 200, 300);

        expect(onChange).toHaveBeenCalledWith("p2");
    });

    it("вертикальный жест не переключает изображение", () => {
        const onChange = vi.fn();
        const card = renderMain(onChange);

        // Малое горизонтальное смещение при большом вертикальном — это скролл.
        fireSwipe(card, 300, 285, 120);

        expect(onChange).not.toHaveBeenCalled();
    });

    it("короткий горизонтальный жест ниже порога игнорируется", () => {
        const onChange = vi.fn();
        const card = renderMain(onChange);

        fireSwipe(card, 300, 280);

        expect(onChange).not.toHaveBeenCalled();
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
                                    aria-label="Предыдущее изображение"
                                    onClick={onPrev}
                                    disabled={isFirst}
                                />
                                <ImageGalleryExtended.Arrow
                                    direction={EImageGalleryArrowDirection.NEXT}
                                    aria-label="Следующее изображение"
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
                <ImageGalleryExtended.Dots getDotAriaLabel={({ item }) => `dot-${item.id}`} />
            </ControlledGallery>,
        );

        const dots = screen.getAllByRole("button", { name: /^dot-/ });
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
                            aria-current={isActive ? "true" : undefined}
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
        expect(screen.getByRole("button", { name: "thumb-p5" })).toHaveAttribute("aria-current", "true");
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

describe("ImageGalleryExtended — refs", () => {
    it("пробрасывает ref в корневые DOM-элементы публичных составных частей", () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const mainRef = React.createRef<HTMLDivElement>();
        const dotsRef = React.createRef<HTMLDivElement>();
        const thumbnailsRef = React.createRef<HTMLDivElement>();

        render(
            <ImageGalleryExtended ref={rootRef} items={buildItems(9)} selectedId="p1" onChange={vi.fn()}>
                <ImageGalleryExtended.Main ref={mainRef} />
                <ImageGalleryExtended.Dots ref={dotsRef} />
                <ImageGalleryExtended.Thumbnails ref={thumbnailsRef} />
            </ImageGalleryExtended>,
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(mainRef.current).toBeInstanceOf(HTMLDivElement);
        expect(dotsRef.current).toBeInstanceOf(HTMLDivElement);
        expect(thumbnailsRef.current).toBeInstanceOf(HTMLDivElement);
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
        // Фокус на текущей активной миниатюре — как остаётся после клика мышью.
        thumbs[2].focus();
        expect(thumbs[2]).toHaveFocus();

        fireEvent.keyDown(thumbs[2], { key: "ArrowRight", code: "ArrowRight" });

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

describe("ImageGalleryExtended — Thumbnails (центрирование активной)", () => {
    /** Подменяет getBoundingClientRect элемента фиксированной геометрией по горизонтали. */
    const mockRect = (element: HTMLElement, left: number, width: number) => {
        element.getBoundingClientRect = vi.fn(
            () => ({ left, width, right: left + width, top: 0, bottom: 0, height: 0, x: left, y: 0 }) as DOMRect,
        );
    };

    it("при смене выбора лента скроллится так, чтобы центр активной миниатюры совпал с центром ленты", () => {
        const carouselRef = React.createRef<HTMLDivElement>();

        render(
            <ControlledGallery items={buildItems(9)} initialId="p1">
                <ImageGalleryExtended.Main />
                <ImageGalleryExtended.Thumbnails ref={carouselRef} />
            </ControlledGallery>,
        );

        const carousel = carouselRef.current!;
        const thumbs = thumbButtons();

        // Видимая область ленты: центр на 150px. Активная миниатюра справа за кадром,
        // её центр на 425px → нужно проскроллить на 425 - 150 = 275px.
        mockRect(carousel, 0, 300);
        mockRect(thumbs[4], 400, 50);

        // Эффект на mount уже отработал на нулевых rect'ах — очищаем перед проверкой.
        scrollSpy.mockClear();
        fireEvent.click(thumbs[4]);

        expect(scrollSpy).toHaveBeenCalledWith(carousel, 275);
    });
});
