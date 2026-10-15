import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Carousel } from "../Carousel";
import { ECarouselScrollMode } from "../enums";
import { EOrientation } from "../../../enums";
import { ICarouselIndicatorsProps } from "../types";
import { getResizeCallback, resetResizeCallback, mockElementSize } from "../../../../test-utils/dom";

// Логика индикаторов (окно, клавиатура, indicatorProps) покрыта в PageIndicators.test.tsx.
// Здесь — только контракт обёртки: связь с контекстом Carousel и проброс props.

interface IWrapperProps {
    scrollMode?: ECarouselScrollMode;
    orientation?: EOrientation;
    indicatorsProps?: ICarouselIndicatorsProps & { ref?: React.Ref<HTMLDivElement> };
}

const CarouselWrapper: React.FC<IWrapperProps> = ({
    scrollMode = ECarouselScrollMode.PAGE,
    orientation = EOrientation.HORIZONTAL,
    indicatorsProps,
}) => {
    const vertical = orientation === EOrientation.VERTICAL;
    const viewportSize = vertical ? { height: 300, clientHeight: 300 } : { width: 300, clientWidth: 300 };
    const itemSize = vertical ? { height: 150 } : { width: 150 };

    return (
        <Carousel scrollMode={scrollMode} orientation={orientation} gap={10}>
            <Carousel.Viewport ref={(n) => n && mockElementSize(n, viewportSize)}>
                <Carousel.Track>
                    {Array.from({ length: 4 }, (_, idx) => (
                        <Carousel.Item key={idx} index={idx} ref={(n) => n && mockElementSize(n, itemSize)} />
                    ))}
                </Carousel.Track>
            </Carousel.Viewport>
            <Carousel.Indicators {...indicatorsProps} />
        </Carousel>
    );
};

const renderCarousel = (props: IWrapperProps = {}) => {
    render(<CarouselWrapper {...props} />);
    act(() => getResizeCallback()?.());
};

const getSelectedIndex = () =>
    screen.getAllByRole("tab").findIndex((tab) => tab.getAttribute("aria-selected") === "true");

describe("Carousel.Indicators", () => {
    beforeEach(() => {
        vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
            cb(0);
            return 0;
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        resetResizeCallback();
    });

    it("renders nothing in ITEM scroll mode", () => {
        renderCarousel({ scrollMode: ECarouselScrollMode.ITEM });
        expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    });

    it("renders an indicator per layout page", () => {
        // Viewport 300px, слайды по 150px с зазором 10px — на страницу помещается один слайд.
        renderCarousel();

        expect(screen.getAllByRole("tab")).toHaveLength(4);
        expect(getSelectedIndex()).toBe(0);
    });

    it("switches the carousel page on click and keyboard", () => {
        renderCarousel();

        fireEvent.click(screen.getAllByRole("tab")[2]);
        expect(getSelectedIndex()).toBe(2);

        fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
        expect(getSelectedIndex()).toBe(3);
    });

    it.each([EOrientation.HORIZONTAL, EOrientation.VERTICAL])("passes the carousel orientation (%s)", (orientation) => {
        renderCarousel({ orientation });
        expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", orientation);
    });

    it("switches the page with ArrowDown in a vertical carousel", () => {
        renderCarousel({ orientation: EOrientation.VERTICAL });

        fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowDown" });
        expect(getSelectedIndex()).toBe(1);
    });

    it("forwards className, HTML attributes, indicatorProps and ref", () => {
        const ref = React.createRef<HTMLDivElement>();
        renderCarousel({
            indicatorsProps: {
                ref,
                className: "custom-indicators",
                "aria-label": "Pages",
                indicatorProps: ({ page }) => ({ "aria-label": `Page ${page}` }),
            },
        });

        const list = screen.getByRole("tablist", { name: "Pages" });
        expect(list).toHaveClass("custom-indicators");
        expect(ref.current).toBe(list);
        expect(screen.getByRole("tab", { name: "Page 3" })).toBeInTheDocument();
    });
});
