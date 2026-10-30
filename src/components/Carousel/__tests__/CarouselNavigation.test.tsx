import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { CarouselPrevButton, CarouselNextButton } from "../CarouselButton";
import { CarouselContext, ICarouselContext } from "../CarouselContext";
import { ECarouselScrollMode } from "../enums";
import { EOrientation } from "../../../enums";
import styles from "../styles/Carousel.module.less";

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
        activeIndices: [],
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

const mockTouchDevice = () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
        (query: string) =>
            ({
                matches: true,
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

interface INavigationButtonCase {
    name: string;
    Button: typeof CarouselPrevButton;
    label: string;
    className: string;
    icons: Record<EOrientation, string>;
    boundaryContext: (atBoundary: boolean, slide: () => void) => Partial<ICarouselContext>;
}

const NAVIGATION_BUTTONS: INavigationButtonCase[] = [
    {
        name: "Prev",
        Button: CarouselPrevButton,
        label: "Previous offer",
        className: styles.prev,
        icons: {
            [EOrientation.HORIZONTAL]: "CaretleftStrokeSrvIcon20",
            [EOrientation.VERTICAL]: "CaretupStrokeSrvIcon20",
        },
        boundaryContext: (atStart, prevSlide) => ({ atStart, prevSlide }),
    },
    {
        name: "Next",
        Button: CarouselNextButton,
        label: "Next offer",
        className: styles.next,
        icons: {
            [EOrientation.HORIZONTAL]: "CaretrightStrokeSrvIcon20",
            [EOrientation.VERTICAL]: "CaretdownStrokeSrvIcon20",
        },
        boundaryContext: (atEnd, nextSlide) => ({ atEnd, nextSlide }),
    },
];

describe("Carousel Navigation (Buttons & Context)", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe.each(NAVIGATION_BUTTONS)("$name button", ({ Button, label, className, icons, boundaryContext }) => {
        it("should render nothing and keep ref null on touch devices", () => {
            mockTouchDevice();
            const ref = React.createRef<HTMLButtonElement>();
            const { container } = render(
                <ButtonContextMockWrapper>
                    <Button ref={ref} aria-label={label} />
                </ButtonContextMockWrapper>,
            );
            expect(container).toBeEmptyDOMElement();
            expect(ref.current).toBeNull();
        });

        it("should trigger slide and custom onClick away from the boundary", () => {
            const slide = vi.fn();
            const onClick = vi.fn();
            render(
                <ButtonContextMockWrapper contextOverrides={boundaryContext(false, slide)}>
                    <Button aria-label={label} onClick={onClick} />
                </ButtonContextMockWrapper>,
            );

            const button = screen.getByRole("button", { name: label });
            expect(button).toHaveAttribute("aria-disabled", "false");
            fireEvent.click(button);

            expect(slide).toHaveBeenCalledTimes(1);
            expect(onClick).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ type: "click", target: button }));
            expect(slide.mock.invocationCallOrder[0]).toBeLessThan(onClick.mock.invocationCallOrder[0]);
        });

        it("should block slide, fire onClick and override user aria-disabled at the boundary", () => {
            const slide = vi.fn();
            const onClick = vi.fn();
            render(
                <ButtonContextMockWrapper contextOverrides={boundaryContext(true, slide)}>
                    <Button aria-label={label} aria-disabled={false} onClick={onClick} />
                </ButtonContextMockWrapper>,
            );

            const button = screen.getByRole("button", { name: label });
            expect(button).toBeEnabled();
            expect(button).toHaveAttribute("aria-disabled", "true");
            fireEvent.click(button);

            expect(slide).not.toHaveBeenCalled();
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it("should block both callbacks when native disabled is set", () => {
            const slide = vi.fn();
            const onClick = vi.fn();
            render(
                <ButtonContextMockWrapper contextOverrides={boundaryContext(false, slide)}>
                    <Button aria-label={label} disabled onClick={onClick} />
                </ButtonContextMockWrapper>,
            );

            const button = screen.getByRole("button", { name: label });
            expect(button).toBeDisabled();
            expect(button).toHaveAttribute("aria-disabled", "false");
            fireEvent.click(button);
            expect(slide).not.toHaveBeenCalled();
            expect(onClick).not.toHaveBeenCalled();
        });

        it("should use current callbacks and boundary after rerender", () => {
            const initialSlide = vi.fn();
            const initialOnClick = vi.fn();
            const slide = vi.fn();
            const onClick = vi.fn();
            const { rerender } = render(
                <ButtonContextMockWrapper contextOverrides={boundaryContext(true, initialSlide)}>
                    <Button aria-label={label} onClick={initialOnClick} />
                </ButtonContextMockWrapper>,
            );

            rerender(
                <ButtonContextMockWrapper contextOverrides={boundaryContext(false, slide)}>
                    <Button aria-label={label} onClick={onClick} />
                </ButtonContextMockWrapper>,
            );
            const button = screen.getByRole("button", { name: label });
            expect(button).toHaveAttribute("aria-disabled", "false");
            fireEvent.click(button);
            expect(initialSlide).not.toHaveBeenCalled();
            expect(initialOnClick).not.toHaveBeenCalled();
            expect(slide).toHaveBeenCalledTimes(1);
            expect(onClick).toHaveBeenCalledTimes(1);

            rerender(
                <ButtonContextMockWrapper contextOverrides={boundaryContext(true, slide)}>
                    <Button aria-label={label} onClick={onClick} />
                </ButtonContextMockWrapper>,
            );
            fireEvent.click(button);
            expect(button).toHaveAttribute("aria-disabled", "true");
            expect(slide).toHaveBeenCalledTimes(1);
            expect(onClick).toHaveBeenCalledTimes(2);
        });

        it.each([EOrientation.HORIZONTAL, EOrientation.VERTICAL])(
            "should select default icon from %s orientation",
            (orientation) => {
                render(
                    <ButtonContextMockWrapper contextOverrides={{ orientation }}>
                        <Button aria-label={label} />
                    </ButtonContextMockWrapper>,
                );
                expect(screen.getByRole("button", { name: label }).querySelector("svg")).toHaveAttribute(
                    "name",
                    icons[orientation],
                );
            },
        );

        it.each([null, false, 0, ""])("should keep default icon for falsy children %o", (children) => {
            render(
                <ButtonContextMockWrapper>
                    <Button aria-label={label}>{children}</Button>
                </ButtonContextMockWrapper>,
            );
            expect(screen.getByRole("button", { name: label }).querySelector("svg")).toHaveAttribute(
                "name",
                icons[EOrientation.HORIZONTAL],
            );
        });

        it("should forward ref, attributes and replacement children", () => {
            const ref = React.createRef<HTMLButtonElement>();
            render(
                <ButtonContextMockWrapper>
                    <Button ref={ref} className="custom-nav" aria-label={label} data-tracking="nav" type="submit">
                        Custom
                    </Button>
                </ButtonContextMockWrapper>,
            );

            const button = screen.getByRole("button", { name: label });
            expect(ref.current).toBe(button);
            expect(button).toHaveClass(styles.navButton, className, "custom-nav");
            expect(button).toHaveAttribute("data-tracking", "nav");
            expect(button).toHaveAttribute("type", "submit");
            expect(button).toHaveTextContent("Custom");
            expect(button.querySelector("svg")).not.toBeInTheDocument();
        });
    });

    describe("Context Fallbacks", () => {
        it("should consume default context functions safely without throwing exceptions", () => {
            const contexts: ICarouselContext[] = [];
            const ContextReader: React.FC = () => {
                contexts.push(useContext(CarouselContext));
                return null;
            };

            render(<ContextReader />);
            const context = contexts[0];
            expect(() => {
                context.nextSlide();
                context.prevSlide();
                context.goToSlide(0);
            }).not.toThrow();
        });
    });
});
