import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ConfirmClose } from "../components/ConfirmClose";
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
    vi.spyOn(HTMLElement.prototype, "offsetParent", "get").mockImplementation(
        (() => document.body) as () => Element | null,
    );
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
        const onClick = vi.fn();
        render(<ConfirmClose clickByEsc={false} onClick={onClick} />);

        fireEvent.click(screen.getByRole("button"));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
    });

    it("calls onClick on Escape keydown when clickByEsc is set", () => {
        mockButtonVisible();
        const onClick = vi.fn();
        render(<ConfirmClose clickByEsc onClick={onClick} />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onClick).toHaveBeenCalledTimes(1);
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

    it("merges className with the base class", () => {
        render(<ConfirmClose clickByEsc={false} onClick={vi.fn()} className="custom" />);

        const button = screen.getByRole("button");

        expect(button).toHaveClass("custom");
        expect(button).toHaveClass("confirmCloseButton");
    });

    it.each([true, false])("forwards ref to the button element when clickByEsc is %s", (clickByEsc) => {
        const ref = React.createRef<HTMLButtonElement>();

        render(<ConfirmClose clickByEsc={clickByEsc} onClick={vi.fn()} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(screen.getByRole("button"));
    });
});
