import React, { useContext } from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CarouselPrevButton } from "../CarouselButton";
import { CarouselContext, ICarouselContext } from "../CarouselContext";
import { EButtonIconShape } from "../../Button/enums";
import { EOrientation } from "../../../enums";

interface IContextWrapperProps {
    overrides?: Partial<ICarouselContext>;
    children: React.ReactNode;
}

const ContextWrapper = ({ overrides, children }: IContextWrapperProps) => {
    const defaultContext = useContext(CarouselContext);
    return <CarouselContext.Provider value={{ ...defaultContext, ...overrides }}>{children}</CarouselContext.Provider>;
};

const createMediaQuery = (matches: boolean) =>
    ({
        matches,
        media: "(pointer: coarse)",
        onchange: null,
        addEventListener: vi.fn<MediaQueryList["addEventListener"]>(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(() => false),
    }) satisfies MediaQueryList;

let coarseMedia = createMediaQuery(false);

const getButton = () => screen.getByRole("button", { name: "Previous slide" });

const renderButton = (overrides: Partial<ICarouselContext> = {}) =>
    render(
        <ContextWrapper overrides={overrides}>
            <CarouselPrevButton aria-label="Previous slide" />
        </ContextWrapper>,
    );

describe("Carousel.PrevButton", () => {
    beforeEach(() => {
        coarseMedia = createMediaQuery(false);
        vi.spyOn(window, "matchMedia").mockReturnValue(coarseMedia);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("requests navigation before passing the click event to onClick", async () => {
        const user = userEvent.setup();
        const calls: string[] = [];
        const prevSlide = vi.fn(() => calls.push("prevSlide"));
        const onClick = vi.fn<React.MouseEventHandler<HTMLButtonElement>>((event) => {
            calls.push("onClick");
            expect(event.currentTarget).toBe(getButton());
            event.preventDefault();
        });
        render(
            <ContextWrapper overrides={{ atStart: false, prevSlide }}>
                <CarouselPrevButton aria-label="Previous slide" onClick={onClick} />
            </ContextWrapper>,
        );

        await user.click(getButton());

        expect(calls).toEqual(["prevSlide", "onClick"]);
        expect(prevSlide).toHaveBeenCalledExactlyOnceWith();
        expect(onClick).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({ type: "click", target: getButton() }),
        );
    });

    it("keeps the start boundary focusable and passes keyboard clicks without navigating", async () => {
        const user = userEvent.setup();
        const prevSlide = vi.fn();
        const onClick = vi.fn();
        render(
            <ContextWrapper overrides={{ atStart: true, prevSlide }}>
                <CarouselPrevButton aria-label="Previous slide" aria-disabled={false} onClick={onClick} />
            </ContextWrapper>,
        );

        expect(getButton()).toBeEnabled();
        expect(getButton()).toHaveAttribute("aria-disabled", "true");
        await user.tab();
        expect(getButton()).toHaveFocus();
        await user.keyboard("{Enter}");

        expect(prevSlide).not.toHaveBeenCalled();
        expect(onClick).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({ type: "click", target: getButton() }),
        );
    });

    it("blocks both callbacks and keyboard focus when natively disabled away from the start", async () => {
        const user = userEvent.setup();
        const prevSlide = vi.fn();
        const onClick = vi.fn();
        render(
            <ContextWrapper overrides={{ atStart: false, prevSlide }}>
                <CarouselPrevButton aria-label="Previous slide" disabled onClick={onClick} />
            </ContextWrapper>,
        );

        expect(getButton()).toBeDisabled();
        expect(getButton()).toHaveAttribute("aria-disabled", "false");
        await user.click(getButton());
        await user.tab();

        expect(getButton()).not.toHaveFocus();
        expect(prevSlide).not.toHaveBeenCalled();
        expect(onClick).not.toHaveBeenCalled();
    });

    it("uses the current boundary and callback after context updates", async () => {
        const user = userEvent.setup();
        const firstPrevSlide = vi.fn();
        const currentPrevSlide = vi.fn();
        const { rerender } = render(
            <ContextWrapper overrides={{ atStart: true, prevSlide: firstPrevSlide }}>
                <CarouselPrevButton aria-label="Previous slide" aria-disabled />
            </ContextWrapper>,
        );
        expect(getButton()).toHaveAttribute("aria-disabled", "true");

        rerender(
            <ContextWrapper overrides={{ atStart: false, prevSlide: currentPrevSlide }}>
                <CarouselPrevButton aria-label="Previous slide" aria-disabled />
            </ContextWrapper>,
        );
        expect(getButton()).toHaveAttribute("aria-disabled", "false");
        await user.click(getButton());
        expect(firstPrevSlide).not.toHaveBeenCalled();
        expect(currentPrevSlide).toHaveBeenCalledExactlyOnceWith();
    });

    it.each([
        [EOrientation.HORIZONTAL, "CaretleftStrokeSrvIcon20"],
        [EOrientation.VERTICAL, "CaretupStrokeSrvIcon20"],
    ])("selects the default icon from %s context", (orientation, iconName) => {
        renderButton({ orientation });
        expect(getButton().querySelector("svg")).toHaveAttribute("name", iconName);
        expect(getButton().querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    });

    it.each([undefined, null, false, 0, ""])("uses the default icon for falsy children %s", (children) => {
        render(<CarouselPrevButton aria-label="Previous slide">{children}</CarouselPrevButton>);
        expect(getButton().querySelector("svg")).toHaveAttribute("name", "CaretleftStrokeSrvIcon20");
    });

    it("replaces the default icon with custom content", () => {
        render(
            <CarouselPrevButton aria-label="Previous slide">
                <svg role="img" aria-label="Custom previous icon" />
            </CarouselPrevButton>,
        );
        expect(getButton()).toContainElement(screen.getByRole("img", { name: "Custom previous icon" }));
        expect(getButton().querySelector('[name="CaretleftStrokeSrvIcon20"]')).not.toBeInTheDocument();
    });

    it.each([EButtonIconShape.SQUIRCLE, EButtonIconShape.CIRCLE])(
        "forwards the %s shape, ref and HTML attributes",
        (shape) => {
            const ref = React.createRef<HTMLButtonElement>();
            render(
                <CarouselPrevButton
                    aria-label="Previous slide"
                    aria-controls="slides"
                    className="custom-prev"
                    data-action="previous"
                    shape={shape}
                    active
                    type="submit"
                    ref={ref}
                />,
            );
            expect(ref.current).toBeInstanceOf(HTMLButtonElement);
            expect(ref.current).toBe(getButton());
            expect(getButton()).toHaveClass("custom-prev", shape);
            expect(getButton()).toHaveAttribute("aria-controls", "slides");
            expect(getButton()).toHaveAttribute("data-action", "previous");
            expect(getButton()).toHaveAttribute("type", "submit");
            expect(getButton().parentElement).toHaveClass("active", "displayContents");
        },
    );

    it("uses a non-submit button by default", () => {
        renderButton();
        expect(getButton()).toHaveAttribute("type", "button");
    });

    it("omits the button and leaves its ref empty for a coarse pointer", () => {
        coarseMedia.matches = true;
        const ref = React.createRef<HTMLButtonElement>();
        render(<CarouselPrevButton aria-label="Previous slide" ref={ref} />);

        expect(window.matchMedia).toHaveBeenCalledWith("(pointer: coarse)");
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        expect(ref.current).toBeNull();
    });

    it("updates visibility and ref when the pointer media query changes", () => {
        const ref = React.createRef<HTMLButtonElement>();
        const { unmount } = render(<CarouselPrevButton aria-label="Previous slide" ref={ref} />);
        const changeListener = coarseMedia.addEventListener.mock.calls[0][1];
        if (typeof changeListener !== "function") {
            throw new Error("Expected a media query change listener");
        }
        expect(ref.current).toBe(getButton());

        act(() => changeListener(Object.assign(new Event("change"), { matches: true, media: coarseMedia.media })));
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        expect(ref.current).toBeNull();

        act(() => changeListener(Object.assign(new Event("change"), { matches: false, media: coarseMedia.media })));
        expect(ref.current).toBe(getButton());
        unmount();
        expect(ref.current).toBeNull();
        expect(coarseMedia.removeEventListener).toHaveBeenCalledWith("change", changeListener);
    });
});
