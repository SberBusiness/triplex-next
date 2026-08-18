import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { CheckboxTreeExtendedArrow } from "../components/CheckboxTreeExtendedArrow";

const renderArrow = (props: Partial<React.ComponentProps<typeof CheckboxTreeExtendedArrow>> = {}) => {
    const toggle = props.toggle ?? vi.fn();
    const result = render(<CheckboxTreeExtendedArrow active={false} opened={false} toggle={toggle} {...props} />);

    return { ...result, toggle };
};

describe("CheckboxTreeExtendedArrow", () => {
    it("renders button, excluded from tab order", () => {
        renderArrow();

        expect(screen.getByRole("button")).toHaveAttribute("tabindex", "-1");
    });

    it("toggles opened on click", () => {
        const { toggle } = renderArrow({ opened: false });

        fireEvent.click(screen.getByRole("button"));

        expect(toggle).toHaveBeenCalledWith(true);
    });

    it("toggles opened back on click when node is opened", () => {
        const { toggle } = renderArrow({ opened: true });

        fireEvent.click(screen.getByRole("button"));

        expect(toggle).toHaveBeenCalledWith(false);
    });

    it("opens node on ArrowRight and closes on ArrowLeft", () => {
        const { toggle } = renderArrow({ opened: false });

        fireEvent.keyUp(screen.getByRole("button"), { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });
        expect(toggle).toHaveBeenLastCalledWith(true);

        fireEvent.keyUp(screen.getByRole("button"), { keyCode: EVENT_KEY_CODES.ARROW_LEFT });
        expect(toggle).toHaveBeenLastCalledWith(false);
    });

    it.each([
        ["Enter", EVENT_KEY_CODES.ENTER],
        ["Space", EVENT_KEY_CODES.SPACE],
    ])("inverts opened on %s", (_name, keyCode) => {
        const { toggle } = renderArrow({ opened: true });

        fireEvent.keyUp(screen.getByRole("button"), { keyCode });

        expect(toggle).toHaveBeenCalledWith(false);
    });

    it("ignores other keys", () => {
        const { toggle } = renderArrow();

        fireEvent.keyUp(screen.getByRole("button"), { keyCode: EVENT_KEY_CODES.TAB });

        expect(toggle).not.toHaveBeenCalled();
    });

    it("takes focus when node becomes active", () => {
        const { rerender } = renderArrow({ active: false });

        expect(screen.getByRole("button")).not.toHaveFocus();

        rerender(<CheckboxTreeExtendedArrow active opened={false} toggle={vi.fn()} />);

        expect(screen.getByRole("button")).toHaveFocus();
    });

    it("does not steal focus on mount", () => {
        renderArrow({ active: true });

        expect(screen.getByRole("button")).not.toHaveFocus();
    });
});
