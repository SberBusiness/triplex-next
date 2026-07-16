import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CarouselPrevButton, CarouselNextButton } from "../CarouselButton";
import { CarouselContext, ICarouselContext } from "../CarouselContext";
import { ECarouselOrientation, ECarouselScrollMode } from "../enums";

interface IWrapperProps {
    contextOverrides?: Partial<ICarouselContext>;
    children: React.ReactNode;
}

const ButtonContextMockWrapper: React.FC<IWrapperProps> = ({ contextOverrides, children }) => {
    const defaultMockContext: ICarouselContext = {
        gap: 16,
        orientation: ECarouselOrientation.HORIZONTAL,
        scrollMode: ECarouselScrollMode.ITEM,
        offset: 0,
        activeIndices: new Array<number>(),
        currentIndex: 0,
        viewportPaddingStyle: "0px",
        atStart: false,
        atEnd: false,
        nextSlide: vi.fn(),
        prevSlide: vi.fn(),
        goToSlide: vi.fn(),
        orientationRef: { current: ECarouselOrientation.HORIZONTAL },
        offsetRef: { current: 0 },
        maxOffsetRef: { current: 0 },
        currentIndexRef: { current: 0 },
        viewportRef: { current: null },
        trackRef: { current: null },
        slideRefs: { current: new Map<number, HTMLDivElement>() },
        ...contextOverrides,
    };

    return <CarouselContext.Provider value={defaultMockContext}>{children}</CarouselContext.Provider>;
};

const mockGlobalMatchMedia = (matchesValue: boolean) => {
    vi.spyOn(window, "matchMedia").mockImplementation(
        (query: string) =>
            ({
                matches: matchesValue,
                media: query,
                onchange: null,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                addListener: vi.fn(),
                removeListener: vi.fn(),
                dispatchEvent: vi.fn(() => false),
            }) as MediaQueryList,
    );
};

describe("Carousel Navigation (Buttons & Context)", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("Responsive Visibility via useMatchMedia", () => {
        it("should render navigation buttons on desktop devices", () => {
            mockGlobalMatchMedia(false);
            render(
                <ButtonContextMockWrapper>
                    <CarouselPrevButton data-testid="prev-btn" />
                    <CarouselNextButton data-testid="next-btn" />
                </ButtonContextMockWrapper>,
            );
            expect(screen.getByTestId("prev-btn")).toBeInTheDocument();
            expect(screen.getByTestId("next-btn")).toBeInTheDocument();
        });

        it("should hide navigation buttons on touch devices", () => {
            mockGlobalMatchMedia(true);
            render(
                <ButtonContextMockWrapper>
                    <CarouselPrevButton data-testid="prev-btn" />
                    <CarouselNextButton data-testid="next-btn" />
                </ButtonContextMockWrapper>,
            );
            expect(screen.queryByTestId("prev-btn")).not.toBeInTheDocument();
            expect(screen.queryByTestId("next-btn")).not.toBeInTheDocument();
        });
    });

    describe("Carousel Buttons Behaviour", () => {
        beforeEach(() => {
            mockGlobalMatchMedia(false);
        });

        it("should trigger prevSlide and custom onClick when not at start", () => {
            const prevSlideSpy = vi.fn();
            const clickSpy = vi.fn();

            render(
                <ButtonContextMockWrapper contextOverrides={{ atStart: false, prevSlide: prevSlideSpy }}>
                    <CarouselPrevButton data-testid="prev-btn" onClick={clickSpy} />
                </ButtonContextMockWrapper>,
            );

            const btn = screen.getByTestId("prev-btn");
            expect(btn).toHaveAttribute("aria-disabled", "false");
            fireEvent.click(btn);

            expect(prevSlideSpy).toHaveBeenCalledTimes(1);
            expect(clickSpy).toHaveBeenCalledTimes(1);
        });

        it("should block prevSlide but fire onClick when atStart is true due to aria-disabled pattern", () => {
            const prevSlideSpy = vi.fn();
            const clickSpy = vi.fn();

            render(
                <ButtonContextMockWrapper contextOverrides={{ atStart: true, prevSlide: prevSlideSpy }}>
                    <CarouselPrevButton data-testid="prev-btn" onClick={clickSpy} />
                </ButtonContextMockWrapper>,
            );

            const btn = screen.getByTestId("prev-btn");
            expect(btn).toHaveAttribute("aria-disabled", "true");
            fireEvent.click(btn);

            expect(prevSlideSpy).not.toHaveBeenCalled();
            expect(clickSpy).toHaveBeenCalledTimes(1);
        });

        it("should trigger nextSlide and custom onClick when not at end", () => {
            const nextSlideSpy = vi.fn();
            const clickSpy = vi.fn();

            render(
                <ButtonContextMockWrapper contextOverrides={{ atEnd: false, nextSlide: nextSlideSpy }}>
                    <CarouselNextButton data-testid="next-btn" onClick={clickSpy} />
                </ButtonContextMockWrapper>,
            );

            const btn = screen.getByTestId("next-btn");
            expect(btn).toHaveAttribute("aria-disabled", "false");
            fireEvent.click(btn);

            expect(nextSlideSpy).toHaveBeenCalledTimes(1);
            expect(clickSpy).toHaveBeenCalledTimes(1);
        });

        it("should block nextSlide but fire onClick when atEnd is true", () => {
            const nextSlideSpy = vi.fn();
            const clickSpy = vi.fn();

            render(
                <ButtonContextMockWrapper contextOverrides={{ atEnd: true, nextSlide: nextSlideSpy }}>
                    <CarouselNextButton data-testid="next-btn" onClick={clickSpy} />
                </ButtonContextMockWrapper>,
            );

            const btn = screen.getByTestId("next-btn");
            expect(btn).toHaveAttribute("aria-disabled", "true");
            fireEvent.click(btn);

            expect(nextSlideSpy).not.toHaveBeenCalled();
            expect(clickSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("Customisation and Context Fallbacks", () => {
        beforeEach(() => {
            mockGlobalMatchMedia(false);
        });

        it("should replace default icon with custom children text when provided", () => {
            render(
                <ButtonContextMockWrapper>
                    <CarouselPrevButton data-testid="prev-btn">Back</CarouselPrevButton>
                </ButtonContextMockWrapper>,
            );
            expect(screen.getByTestId("prev-btn")).toHaveTextContent("Back");
        });

        it("should consume default context functions safely without throwing exceptions", () => {
            const FallbackConsumer = () => {
                const ctx = useContext(CarouselContext);
                const triggerFallback = () => {
                    ctx.nextSlide();
                    ctx.prevSlide();
                    ctx.goToSlide(0);
                };
                return (
                    <button data-testid="fallback-btn" onClick={triggerFallback}>
                        Run
                    </button>
                );
            };

            render(<FallbackConsumer />);
            expect(() => screen.getByTestId("fallback-btn").click()).not.toThrow();
        });
    });
});
