import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Carousel } from "../Carousel";
import { CarouselContext, ICarouselContext } from "../CarouselContext";

interface ITestButtonProps {
    buttonProps?: React.ComponentProps<typeof Carousel.PrevButton>;
    contextOverrides?: Partial<ICarouselContext>;
}

const TestButton = ({ buttonProps, contextOverrides }: ITestButtonProps) => {
    const context = React.useContext(CarouselContext);

    return (
        <CarouselContext.Provider value={{ ...context, atStart: false, ...contextOverrides }}>
            <Carousel.PrevButton aria-label="Предыдущий слайд" {...buttonProps} />
        </CarouselContext.Provider>
    );
};

describe("Carousel.PrevButton keyboard and pointer contract", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it.each(["{Enter}", "[Space]"])("navigates before calling onClick on %s", async (key) => {
        const user = userEvent.setup();
        const prevSlide = vi.fn();
        const onClick = vi.fn();
        render(<TestButton contextOverrides={{ prevSlide }} buttonProps={{ onClick }} />);

        const button = screen.getByRole("button", { name: "Предыдущий слайд" });
        await user.tab();
        expect(button).toHaveFocus();

        await user.keyboard(key);
        expect(prevSlide).toHaveBeenCalledExactlyOnceWith();
        expect(onClick).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ type: "click", target: button }));
        expect(prevSlide.mock.invocationCallOrder[0]).toBeLessThan(onClick.mock.invocationCallOrder[0]);
        expect(button).toHaveFocus();
    });

    it.each(["{Enter}", "[Space]"])("keeps the boundary button focusable and calls only onClick on %s", async (key) => {
        const user = userEvent.setup();
        const prevSlide = vi.fn();
        const onClick = vi.fn();
        render(<TestButton contextOverrides={{ atStart: true, prevSlide }} buttonProps={{ onClick }} />);

        const button = screen.getByRole("button", { name: "Предыдущий слайд" });
        expect(button).toHaveAttribute("aria-disabled", "true");
        expect(button).toBeEnabled();
        await user.tab();
        expect(button).toHaveFocus();

        await user.keyboard(key);
        expect(prevSlide).not.toHaveBeenCalled();
        expect(onClick).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ type: "click", target: button }));
        expect(button).toHaveFocus();
    });

    it("excludes a natively disabled button from Tab and blocks activation", async () => {
        const user = userEvent.setup();
        const prevSlide = vi.fn();
        const onClick = vi.fn();
        render(<TestButton contextOverrides={{ prevSlide }} buttonProps={{ disabled: true, onClick }} />);

        const button = screen.getByRole("button", { name: "Предыдущий слайд" });
        expect(button).toBeDisabled();
        await user.tab();
        expect(button).not.toHaveFocus();
        await user.keyboard("{Enter}[Space]");
        await user.click(button);
        expect(prevSlide).not.toHaveBeenCalled();
        expect(onClick).not.toHaveBeenCalled();
    });

    it("clears and restores the ref when the pointer changes and unsubscribes on unmount", () => {
        const addEventListener = vi.fn<MediaQueryList["addEventListener"]>();
        const removeEventListener = vi.fn<MediaQueryList["removeEventListener"]>();
        let matches = false;
        const mediaQueryList: MediaQueryList = {
            get matches() {
                return matches;
            },
            media: "(pointer: coarse)",
            onchange: null,
            addEventListener,
            removeEventListener,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(() => true),
        };
        const matchMedia = vi.spyOn(window, "matchMedia").mockReturnValue(mediaQueryList);
        const ref = React.createRef<HTMLButtonElement>();
        const { unmount } = render(<TestButton buttonProps={{ ref }} />);

        expect(ref.current).toBe(screen.getByRole("button", { name: "Предыдущий слайд" }));
        expect(matchMedia).toHaveBeenCalledWith("(pointer: coarse)");
        expect(addEventListener).toHaveBeenCalledExactlyOnceWith("change", expect.any(Function));
        const changeListener = addEventListener.mock.calls[0]?.[1];
        if (typeof changeListener !== "function") {
            throw new Error("Expected a media query change listener");
        }

        act(() => {
            matches = true;
            changeListener.call(
                mediaQueryList,
                Object.assign(new Event("change"), { matches: true, media: mediaQueryList.media }),
            );
        });
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        expect(ref.current).toBeNull();

        act(() => {
            matches = false;
            changeListener.call(
                mediaQueryList,
                Object.assign(new Event("change"), { matches: false, media: mediaQueryList.media }),
            );
        });
        expect(ref.current).toBe(screen.getByRole("button", { name: "Предыдущий слайд" }));

        unmount();
        expect(ref.current).toBeNull();
        expect(removeEventListener).toHaveBeenCalledExactlyOnceWith("change", changeListener);
    });
});
