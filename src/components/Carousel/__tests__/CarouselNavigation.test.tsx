import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CarouselPrevButton, CarouselNextButton } from "../CarouselButton";
import { CarouselContext, ICarouselContext } from "../CarouselContext";
import { ECarouselScrollMode } from "../enums";
import { EOrientation } from "../../../enums";

interface IWrapperProps {
    contextOverrides?: Partial<ICarouselContext>;
    children: React.ReactNode;
}

const ButtonContextMockWrapper: React.FC<IWrapperProps> = ({ contextOverrides, children }) => {
    const defaultMockContext: ICarouselContext = {
        gap: 16,
        orientation: EOrientation.HORIZONTAL,
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
        orientationRef: { current: EOrientation.HORIZONTAL },
        offsetRef: { current: 0 },
        maxOffsetRef: { current: 0 },
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
            expect(clickSpy).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ type: "click", target: btn }));
            expect(nextSlideSpy.mock.invocationCallOrder[0]).toBeLessThan(clickSpy.mock.invocationCallOrder[0]);
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

        it("forwards next button ref, attributes and replacement children", () => {
            const ref = React.createRef<HTMLButtonElement>();
            render(
                <ButtonContextMockWrapper>
                    <CarouselNextButton
                        ref={ref}
                        className="custom-next"
                        aria-label="Next offer"
                        data-tracking="next"
                        type="submit"
                    >
                        Next
                    </CarouselNextButton>
                </ButtonContextMockWrapper>,
            );

            const button = screen.getByRole("button", { name: "Next offer" });
            expect(ref.current).toBe(button);
            expect(button).toHaveClass("custom-next");
            expect(button).toHaveAttribute("data-tracking", "next");
            expect(button).toHaveAttribute("type", "submit");
            expect(button).toHaveTextContent("Next");
        });

        it("blocks both next button callbacks when native disabled is set", () => {
            const nextSlide = vi.fn();
            const onClick = vi.fn();
            render(
                <ButtonContextMockWrapper contextOverrides={{ atEnd: false, nextSlide }}>
                    <CarouselNextButton aria-label="Next offer" disabled onClick={onClick} />
                </ButtonContextMockWrapper>,
            );

            const button = screen.getByRole("button", { name: "Next offer" });
            expect(button).toBeDisabled();
            expect(button).toHaveAttribute("aria-disabled", "false");
            fireEvent.click(button);
            expect(nextSlide).not.toHaveBeenCalled();
            expect(onClick).not.toHaveBeenCalled();
        });

        it("uses current next button callbacks and boundary after rerender", () => {
            const initialNextSlide = vi.fn();
            const initialOnClick = vi.fn();
            const nextSlide = vi.fn();
            const onClick = vi.fn();
            const { rerender } = render(
                <ButtonContextMockWrapper contextOverrides={{ atEnd: false, nextSlide: initialNextSlide }}>
                    <CarouselNextButton aria-label="Next offer" onClick={initialOnClick} />
                </ButtonContextMockWrapper>,
            );

            rerender(
                <ButtonContextMockWrapper contextOverrides={{ atEnd: false, nextSlide }}>
                    <CarouselNextButton aria-label="Next offer" onClick={onClick} />
                </ButtonContextMockWrapper>,
            );
            const button = screen.getByRole("button", { name: "Next offer" });
            fireEvent.click(button);
            expect(initialNextSlide).not.toHaveBeenCalled();
            expect(initialOnClick).not.toHaveBeenCalled();
            expect(nextSlide).toHaveBeenCalledTimes(1);
            expect(onClick).toHaveBeenCalledTimes(1);

            rerender(
                <ButtonContextMockWrapper contextOverrides={{ atEnd: true, nextSlide }}>
                    <CarouselNextButton aria-label="Next offer" onClick={onClick} />
                </ButtonContextMockWrapper>,
            );
            fireEvent.click(button);
            expect(button).toHaveAttribute("aria-disabled", "true");
            expect(nextSlide).toHaveBeenCalledTimes(1);
            expect(onClick).toHaveBeenCalledTimes(2);
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
