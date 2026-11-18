import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ConfirmClose } from "../components/ConfirmClose";
import { Confirm } from "../Confirm";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

// Частичный мок: подменяется только иконка крестика, остальные экспорты пакета остаются
// настоящими — иначе тест сломается, как только Button подтянет любую другую иконку.
vi.mock("@sberbusiness/icons-next", async (importOriginal) => ({
    ...(await importOriginal<typeof import("@sberbusiness/icons-next")>()),
    CrossStrokeSrvIcon20: () => <span data-testid="icon-close" />,
}));

/**
 * Мокает offsetParent, моделируя видимую кнопку.
 * В jsdom offsetParent всегда null, а TriggerClickOnKeyDownEvent кликает только по видимой кнопке.
 */
const mockButtonVisible = () => {
    vi.spyOn(HTMLElement.prototype, "offsetParent", "get").mockReturnValue(document.body);
};

describe("ConfirmClose", () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("renders a button with the close icon", () => {
        render(<ConfirmClose clickByEsc={false} onClick={vi.fn()} />);

        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("icon-close")).toBeInTheDocument();
    });

    it("does not set a title of its own", () => {
        // Строки на конкретном языке внутри компонентов запрещены (codestyle.md
        // § «Мультиязычность»), поэтому доступное имя кнопки задаёт потребитель.
        render(<ConfirmClose clickByEsc={false} onClick={vi.fn()} />);

        expect(screen.getByRole("button")).not.toHaveAttribute("title");
    });

    it("supports custom title", () => {
        render(<ConfirmClose clickByEsc={false} onClick={vi.fn()} title="Close" />);

        expect(screen.getByRole("button")).toHaveAttribute("title", "Close");
    });

    it("calls onClick on button click", () => {
        const onClick = vi.fn((event: React.MouseEvent<HTMLButtonElement>) => event.currentTarget);
        render(<ConfirmClose clickByEsc={false} onClick={onClick} />);

        const button = screen.getByRole("button");
        const event = new MouseEvent("click", { bubbles: true });
        fireEvent(button, event);

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click", nativeEvent: event }));
        expect(onClick).toHaveReturnedWith(button);
    });

    it("calls onClick on Escape keydown when clickByEsc is set", () => {
        mockButtonVisible();
        const onClick = vi.fn((event: React.MouseEvent<HTMLButtonElement>) => event.currentTarget);
        render(<ConfirmClose clickByEsc onClick={onClick} />);

        const button = screen.getByRole("button");
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click", detail: 0, target: button }));
        expect(onClick).toHaveReturnedWith(button);
    });

    it("ignores Escape keydown when clickByEsc is not set", () => {
        mockButtonVisible();
        const onClick = vi.fn();
        render(<ConfirmClose clickByEsc={false} onClick={onClick} />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onClick).not.toHaveBeenCalled();
    });

    it("ignores other keys when clickByEsc is set", () => {
        mockButtonVisible();
        const onClick = vi.fn();
        render(<ConfirmClose clickByEsc onClick={onClick} />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ENTER });

        expect(onClick).not.toHaveBeenCalled();
    });

    it("ignores Escape when the button has no offsetParent", () => {
        vi.spyOn(HTMLElement.prototype, "offsetParent", "get").mockReturnValue(null);
        const onClick = vi.fn();
        render(<Confirm.Close clickByEsc onClick={onClick} hidden />);

        expect(screen.getByRole("button", { hidden: true })).toHaveAttribute("hidden");
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onClick).not.toHaveBeenCalled();
    });

    it("ignores clicks and Escape when disabled even if the button is visible", () => {
        mockButtonVisible();
        const onClick = vi.fn();
        render(<Confirm.Close clickByEsc onClick={onClick} disabled />);

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
        fireEvent.click(button);
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onClick).not.toHaveBeenCalled();
    });

    it("keeps Escape click available while loading when the button is not disabled", () => {
        mockButtonVisible();
        const onClick = vi.fn();
        render(<Confirm.Close clickByEsc onClick={onClick} loading />);

        const button = screen.getByRole("button");
        expect(button).not.toBeDisabled();
        expect(button).toHaveClass("loading");
        expect(button).toHaveAttribute("tabindex", "-1");

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click", detail: 0, target: button }));
    });

    it("enables and removes Escape listeners as clickByEsc changes and on unmount", () => {
        mockButtonVisible();
        const addEventListener = vi.spyOn(window, "addEventListener");
        const removeEventListener = vi.spyOn(window, "removeEventListener");
        const onClick = vi.fn();
        const { rerender, unmount } = render(<Confirm.Close clickByEsc onClick={onClick} />);
        const getKeyDownSubscriptions = () =>
            addEventListener.mock.calls.filter(([eventType]) => eventType === "keydown");

        expect(getKeyDownSubscriptions()).toHaveLength(1);
        const firstListener = getKeyDownSubscriptions()[0][1];
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });
        expect(onClick).toHaveBeenCalledTimes(1);

        rerender(<Confirm.Close clickByEsc={false} onClick={onClick} />);
        expect(removeEventListener).toHaveBeenCalledWith("keydown", firstListener);
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });
        expect(onClick).toHaveBeenCalledTimes(1);

        rerender(<Confirm.Close clickByEsc onClick={onClick} />);
        expect(getKeyDownSubscriptions()).toHaveLength(2);
        const secondListener = getKeyDownSubscriptions()[1][1];
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });
        expect(onClick).toHaveBeenCalledTimes(2);

        unmount();
        expect(removeEventListener).toHaveBeenCalledWith("keydown", secondListener);
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("forwards HTML, ARIA and data attributes through the public Confirm.Close", () => {
        render(
            <Confirm.Close
                clickByEsc={false}
                id="confirm-close"
                aria-label="Закрыть предупреждение"
                aria-controls="confirm-dialog"
                data-action="close"
                type="reset"
            />,
        );

        const button = screen.getByRole("button", { name: "Закрыть предупреждение" });
        expect(button).toHaveAttribute("id", "confirm-close");
        expect(button).toHaveAttribute("aria-controls", "confirm-dialog");
        expect(button).toHaveAttribute("data-action", "close");
        expect(button).toHaveAttribute("type", "reset");
    });

    it("merges className with the base class", () => {
        render(<ConfirmClose clickByEsc={false} onClick={vi.fn()} className="custom" />);

        const button = screen.getByRole("button");

        expect(button).toHaveClass("custom");
        expect(button).toHaveClass("confirmCloseButton");
    });

    it.each([true, false])("forwards ref to the button element when clickByEsc is %s", (clickByEsc) => {
        const ref = React.createRef<HTMLButtonElement>();

        const { unmount } = render(<ConfirmClose clickByEsc={clickByEsc} onClick={vi.fn()} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(screen.getByRole("button"));

        unmount();
        expect(ref.current).toBeNull();
    });

    it.each([true, false])("passes the button and null to callback ref when clickByEsc is %s", (clickByEsc) => {
        const ref = vi.fn();
        const { unmount } = render(<Confirm.Close clickByEsc={clickByEsc} ref={ref} />);

        expect(ref).toHaveBeenCalledTimes(1);
        expect(ref).toHaveBeenCalledWith(screen.getByRole("button"));

        unmount();

        expect(ref).toHaveBeenCalledTimes(2);
        expect(ref).toHaveBeenLastCalledWith(null);
    });

    it("clears the previous callback ref and fills the replacement without losing the Escape target", () => {
        mockButtonVisible();
        const firstRef = vi.fn();
        const nextRef = vi.fn();
        const onClick = vi.fn();
        const { rerender, unmount } = render(<Confirm.Close clickByEsc ref={firstRef} onClick={onClick} />);
        const button = screen.getByRole("button");

        rerender(<Confirm.Close clickByEsc ref={nextRef} onClick={onClick} />);

        expect(firstRef).toHaveBeenNthCalledWith(1, button);
        expect(firstRef).toHaveBeenNthCalledWith(2, null);
        expect(nextRef).toHaveBeenCalledTimes(1);
        expect(nextRef).toHaveBeenCalledWith(button);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click", target: button }));

        unmount();
        expect(nextRef).toHaveBeenLastCalledWith(null);
    });
});
