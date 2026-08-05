import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { KeyDownListener } from "../KeyDownListener";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

describe("KeyDownListener", () => {
    it("renders children as is, without own markup", () => {
        const { container } = render(
            <KeyDownListener eventKeyCode={EVENT_KEY_CODES.ESCAPE} onMatch={() => {}}>
                <span>Content</span>
            </KeyDownListener>,
        );

        expect(screen.getByText("Content")).toBeInTheDocument();
        expect(container.firstChild).toBe(screen.getByText("Content"));
    });

    it("renders nothing when children are not passed", () => {
        const { container } = render(<KeyDownListener eventKeyCode={EVENT_KEY_CODES.ESCAPE} onMatch={() => {}} />);

        expect(container).toBeEmptyDOMElement();
    });

    // Инвариант: render возвращает children || null, поэтому falsy-children осознанно дают null.
    // Замена || на ?? отрендерила бы текстовый узел "0" — этот кейс её ловит.
    it("renders nothing when children are falsy", () => {
        const { container } = render(
            <KeyDownListener eventKeyCode={EVENT_KEY_CODES.ESCAPE} onMatch={() => {}}>
                {0}
            </KeyDownListener>,
        );

        expect(container).toBeEmptyDOMElement();
    });

    it("calls onMatch with the keyboard event when the pressed key matches", () => {
        const onMatch = vi.fn();

        render(<KeyDownListener eventKeyCode={EVENT_KEY_CODES.ESCAPE} onMatch={onMatch} />);
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onMatch).toHaveBeenCalledTimes(1);
        expect(onMatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: "keydown", keyCode: EVENT_KEY_CODES.ESCAPE }),
        );
    });

    it("does not call onMatch when another key is pressed", () => {
        const onMatch = vi.fn();

        render(<KeyDownListener eventKeyCode={EVENT_KEY_CODES.ESCAPE} onMatch={onMatch} />);
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ENTER });

        expect(onMatch).not.toHaveBeenCalled();
    });

    it("calls onMatch for every key code when an array is passed", () => {
        const onMatch = vi.fn();

        render(
            <KeyDownListener
                eventKeyCode={[EVENT_KEY_CODES.ARROW_LEFT, EVENT_KEY_CODES.ARROW_RIGHT]}
                onMatch={onMatch}
            />,
        );

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_LEFT });
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_UP });

        expect(onMatch).toHaveBeenCalledTimes(2);
        expect(onMatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ keyCode: EVENT_KEY_CODES.ARROW_LEFT }));
        expect(onMatch).toHaveBeenNthCalledWith(2, expect.objectContaining({ keyCode: EVENT_KEY_CODES.ARROW_RIGHT }));
    });

    it("listens on window, so events from any target reach the listener", () => {
        const onMatch = vi.fn();

        render(
            <KeyDownListener eventKeyCode={EVENT_KEY_CODES.ENTER} onMatch={onMatch}>
                <button type="button">Target</button>
            </KeyDownListener>,
        );

        fireEvent.keyDown(screen.getByRole("button"), { keyCode: EVENT_KEY_CODES.ENTER });

        expect(onMatch).toHaveBeenCalledTimes(1);
    });

    it("uses the latest props after rerender", () => {
        const onMatch = vi.fn();
        const nextOnMatch = vi.fn();

        const { rerender } = render(<KeyDownListener eventKeyCode={EVENT_KEY_CODES.ESCAPE} onMatch={onMatch} />);
        rerender(<KeyDownListener eventKeyCode={EVENT_KEY_CODES.ENTER} onMatch={nextOnMatch} />);

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });
        expect(onMatch).not.toHaveBeenCalled();
        expect(nextOnMatch).not.toHaveBeenCalled();

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ENTER });
        expect(nextOnMatch).toHaveBeenCalledTimes(1);
        expect(onMatch).not.toHaveBeenCalled();
    });

    it("stops calling onMatch after unmount", () => {
        const onMatch = vi.fn();

        const { unmount } = render(<KeyDownListener eventKeyCode={EVENT_KEY_CODES.ESCAPE} onMatch={onMatch} />);
        unmount();
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onMatch).not.toHaveBeenCalled();
    });
});
