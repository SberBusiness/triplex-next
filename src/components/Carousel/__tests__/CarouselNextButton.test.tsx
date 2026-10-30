import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Carousel } from "../Carousel";
import { CarouselContext, ICarouselContext } from "../CarouselContext";

interface ITestButtonProps {
    buttonProps?: React.ComponentProps<typeof Carousel.NextButton>;
    contextOverrides?: Partial<ICarouselContext>;
}

const TestButton = ({ buttonProps, contextOverrides }: ITestButtonProps) => {
    const context = React.useContext(CarouselContext);

    return (
        <CarouselContext.Provider value={{ ...context, atEnd: false, ...contextOverrides }}>
            <Carousel.NextButton aria-label="Следующий слайд" {...buttonProps} />
        </CarouselContext.Provider>
    );
};

describe("Carousel.NextButton keyboard and pointer contract", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it.each(["{Enter}", "[Space]"])("navigates before calling onClick on %s", async (key) => {
        const user = userEvent.setup();
        const nextSlide = vi.fn();
        const onClick = vi.fn();
        render(<TestButton contextOverrides={{ nextSlide }} buttonProps={{ onClick }} />);

        const button = screen.getByRole("button", { name: "Следующий слайд" });
        await user.tab();
        expect(button).toHaveFocus();

        await user.keyboard(key);
        expect(nextSlide).toHaveBeenCalledExactlyOnceWith();
        expect(onClick).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ type: "click", target: button }));
        expect(nextSlide.mock.invocationCallOrder[0]).toBeLessThan(onClick.mock.invocationCallOrder[0]);
        expect(button).toHaveFocus();
    });

    it.each(["{Enter}", "[Space]"])("keeps the boundary button focusable and calls only onClick on %s", async (key) => {
        const user = userEvent.setup();
        const nextSlide = vi.fn();
        const onClick = vi.fn();
        render(<TestButton contextOverrides={{ atEnd: true, nextSlide }} buttonProps={{ onClick }} />);

        const button = screen.getByRole("button", { name: "Следующий слайд" });
        expect(button).toHaveAttribute("aria-disabled", "true");
        expect(button).toBeEnabled();
        await user.tab();
        expect(button).toHaveFocus();

        await user.keyboard(key);
        expect(nextSlide).not.toHaveBeenCalled();
        expect(onClick).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ type: "click", target: button }));
        expect(button).toHaveFocus();
    });

    it("excludes a natively disabled button from Tab and blocks activation", async () => {
        const user = userEvent.setup();
        const nextSlide = vi.fn();
        const onClick = vi.fn();
        render(<TestButton contextOverrides={{ nextSlide }} buttonProps={{ disabled: true, onClick }} />);

        const button = screen.getByRole("button", { name: "Следующий слайд" });
        expect(button).toBeDisabled();
        await user.tab();
        expect(button).not.toHaveFocus();
        await user.keyboard("{Enter}[Space]");
        await user.click(button);
        expect(nextSlide).not.toHaveBeenCalled();
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

        expect(ref.current).toBe(screen.getByRole("button", { name: "Следующий слайд" }));
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
        expect(ref.current).toBe(screen.getByRole("button", { name: "Следующий слайд" }));

        unmount();
        expect(ref.current).toBeNull();
        expect(removeEventListener).toHaveBeenCalledExactlyOnceWith("change", changeListener);
    });
});
