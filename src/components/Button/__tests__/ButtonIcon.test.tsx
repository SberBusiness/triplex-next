import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ButtonIcon } from "../ButtonIcon";
import { EButtonIconShape } from "../enums";

const getButton = () => screen.getByRole("button");
/** ButtonIcon оборачивается в IconWrapper, который рендерит span с классами active/disabled. */
const getIconWrapper = () => getButton().parentElement as HTMLSpanElement;

describe("ButtonIcon", () => {
    it("renders without errors and applies base and default shape classes", () => {
        render(
            <ButtonIcon aria-label="Icon action">
                <svg data-testid="icon" />
            </ButtonIcon>,
        );
        const button = getButton();
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("buttonIcon");
        expect(button).toHaveClass("squircle");
        expect(button).not.toHaveClass("circle");
        expect(button).toContainElement(screen.getByTestId("icon"));
        // ButtonIcon всегда передаёт displayContents в IconWrapper — обёртка прозрачна для layout.
        expect(getIconWrapper()).toHaveClass("displayContents");
    });

    it("renders native button with type='button' by default and allows overriding via rest", () => {
        const { rerender } = render(<ButtonIcon aria-label="Icon action" />);
        expect(getButton()).toHaveAttribute("type", "button");

        rerender(<ButtonIcon aria-label="Icon action" type="submit" />);
        expect(getButton()).toHaveAttribute("type", "submit");
    });

    it.each([
        [EButtonIconShape.SQUIRCLE, "squircle", "circle"],
        [EButtonIconShape.CIRCLE, "circle", "squircle"],
    ])("applies correct class for shape %s", (shape, expectedClass, notExpectedClass) => {
        render(<ButtonIcon aria-label="Icon action" shape={shape} />);
        const button = getButton();
        expect(button).toHaveClass(expectedClass);
        expect(button).not.toHaveClass(notExpectedClass);
    });

    it("merges custom className into root button element", () => {
        render(<ButtonIcon aria-label="Icon action" className="custom-class" />);
        const button = getButton();
        expect(button).toHaveClass("custom-class");
        expect(button).toHaveClass("buttonIcon");
        expect(button).toHaveClass("squircle");
    });

    it("passes rest props (aria-* and data-*) to root button element", () => {
        render(<ButtonIcon aria-label="Close" data-test-id="button-icon" />);
        const button = getButton();
        expect(button).toHaveAttribute("aria-label", "Close");
        expect(button).toHaveAttribute("data-test-id", "button-icon");
    });

    it("calls onClick with click event", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<ButtonIcon aria-label="Icon action" onClick={onClick} />);
        await user.click(getButton());
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
    });

    it("is disabled and does not call onClick when disabled prop is set", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<ButtonIcon aria-label="Icon action" disabled onClick={onClick} />);
        const button = getButton();
        expect(button).toBeDisabled();
        await user.click(button);
        expect(onClick).not.toHaveBeenCalled();
    });

    it("propagates active state to IconWrapper", () => {
        const { rerender } = render(
            <ButtonIcon aria-label="Icon action" active>
                <svg data-testid="icon" />
            </ButtonIcon>,
        );
        expect(getIconWrapper()).toHaveClass("active");

        rerender(
            <ButtonIcon aria-label="Icon action" active={false}>
                <svg data-testid="icon" />
            </ButtonIcon>,
        );
        expect(getIconWrapper()).not.toHaveClass("active");
    });

    it("propagates disabled state to IconWrapper", () => {
        const { rerender } = render(
            <ButtonIcon aria-label="Icon action" disabled>
                <svg data-testid="icon" />
            </ButtonIcon>,
        );
        expect(getIconWrapper()).toHaveClass("disabled");

        rerender(
            <ButtonIcon aria-label="Icon action">
                <svg data-testid="icon" />
            </ButtonIcon>,
        );
        expect(getIconWrapper()).not.toHaveClass("disabled");
    });

    it("forwards ref to root button element", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<ButtonIcon aria-label="Icon action" ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(getButton());
    });
});
