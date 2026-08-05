import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ComposedKeyDownListener } from "../ComposedKeyDownListener";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

describe("ComposedKeyDownListener", () => {
    it("renders children as is, without own markup", () => {
        const { container } = render(
            <ComposedKeyDownListener keyDownListeners={[{ eventKeyCode: EVENT_KEY_CODES.ESCAPE, onMatch: () => {} }]}>
                <span>Content</span>
            </ComposedKeyDownListener>,
        );

        expect(screen.getByText("Content")).toBeInTheDocument();
        expect(container.firstChild).toBe(screen.getByText("Content"));
    });

    it("calls onMatch of the listener whose key was pressed", () => {
        const onEscape = vi.fn();
        const onEnter = vi.fn();

        render(
            <ComposedKeyDownListener
                keyDownListeners={[
                    { eventKeyCode: EVENT_KEY_CODES.ESCAPE, onMatch: onEscape },
                    { eventKeyCode: EVENT_KEY_CODES.ENTER, onMatch: onEnter },
                ]}
            />,
        );

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onEscape).toHaveBeenCalledTimes(1);
        expect(onEscape).toHaveBeenCalledWith(expect.objectContaining({ keyCode: EVENT_KEY_CODES.ESCAPE }));
        expect(onEnter).not.toHaveBeenCalled();
    });

    it("calls onMatch of every listener subscribed to the same key", () => {
        const onFirst = vi.fn();
        const onSecond = vi.fn();

        render(
            <ComposedKeyDownListener
                keyDownListeners={[
                    { eventKeyCode: EVENT_KEY_CODES.ESCAPE, onMatch: onFirst },
                    { eventKeyCode: [EVENT_KEY_CODES.ESCAPE, EVENT_KEY_CODES.TAB], onMatch: onSecond },
                ]}
            />,
        );

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onFirst).toHaveBeenCalledTimes(1);
        expect(onSecond).toHaveBeenCalledTimes(1);
    });

    it("nests the first listener of the array deepest, so it subscribes and reacts first", () => {
        const calls: string[] = [];

        render(
            <ComposedKeyDownListener
                keyDownListeners={[
                    { eventKeyCode: EVENT_KEY_CODES.ESCAPE, onMatch: () => calls.push("first") },
                    { eventKeyCode: EVENT_KEY_CODES.ESCAPE, onMatch: () => calls.push("second") },
                ]}
            />,
        );

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(calls).toEqual(["first", "second"]);
    });

    it("renders children when keyDownListeners is empty", () => {
        render(
            <ComposedKeyDownListener keyDownListeners={[]}>
                <span>Content</span>
            </ComposedKeyDownListener>,
        );

        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders nothing when keyDownListeners is empty and children are not passed", () => {
        const { container } = render(<ComposedKeyDownListener keyDownListeners={[]} />);

        expect(container).toBeEmptyDOMElement();
    });

    it("stops calling onMatch after unmount", () => {
        const onMatch = vi.fn();

        const { unmount } = render(
            <ComposedKeyDownListener keyDownListeners={[{ eventKeyCode: EVENT_KEY_CODES.ESCAPE, onMatch }]} />,
        );
        unmount();
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onMatch).not.toHaveBeenCalled();
    });
});
