import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CheckboxTreeExtendedCheckbox } from "../components/CheckboxTreeExtendedCheckbox";
import { CheckboxTreeExtendedContext } from "../CheckboxTreeExtendedContext";
import { EComponentSize } from "../../../enums/EComponentSize";

const renderCheckbox = (
    props: Partial<React.ComponentProps<typeof CheckboxTreeExtendedCheckbox>> = {},
    size = EComponentSize.MD,
) =>
    render(
        <CheckboxTreeExtendedContext.Provider value={{ size }}>
            <CheckboxTreeExtendedCheckbox {...props}>Значение</CheckboxTreeExtendedCheckbox>
        </CheckboxTreeExtendedContext.Provider>,
    );

describe("CheckboxTreeExtendedCheckbox", () => {
    it("renders checkbox with label", () => {
        renderCheckbox();

        expect(screen.getByRole("checkbox")).toBeInTheDocument();
        expect(screen.getByLabelText("Значение")).toBe(screen.getByRole("checkbox"));
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("takes size %s from context", (size, expectedClass) => {
        renderCheckbox({}, size);

        // Размер Checkbox выставляет на корневом label, а не на input.
        expect(screen.getByRole("checkbox").closest("label")).toHaveClass(expectedClass);
    });

    it("merges className and own classes into label", () => {
        renderCheckbox({ className: "custom-class" });

        const label = screen.getByRole("checkbox").closest("label");

        expect(label).toHaveClass("checkboxTreeCheckbox", "checkboxTreeCheckboxLabel", "custom-class");
    });

    it("does not leak service props to input attributes", () => {
        renderCheckbox({ active: true, opened: true });

        const checkbox = screen.getByRole("checkbox");

        expect(checkbox).not.toHaveAttribute("active");
        expect(checkbox).not.toHaveAttribute("opened");
    });

    it("calls onChange with change event", () => {
        const onChange = vi.fn();
        renderCheckbox({ onChange });

        fireEvent.click(screen.getByRole("checkbox"));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toMatchObject({ target: screen.getByRole("checkbox") });
    });

    it("keeps onFocus from labelAttributes", () => {
        const onFocus = vi.fn();
        renderCheckbox({ labelAttributes: { onFocus, className: "label-class" } });

        fireEvent.focus(screen.getByRole("checkbox"));

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(screen.getByRole("checkbox").closest("label")).toHaveClass("label-class");
    });

    it("does not take focus when the current activeElement already contains the checkbox", () => {
        // На маунте activeElement — <body>, а body.contains(input) === true, поэтому фокуса не происходит.
        renderCheckbox({ active: true });

        expect(document.activeElement).toBe(document.body);
        expect(screen.getByRole("checkbox")).not.toHaveFocus();
    });

    it("takes focus right on mount when focus is outside the checkbox", () => {
        // Mount-иммунитета у чекбокса нет (в отличие от стрелки): правило одно —
        // active и activeElement вне поддерева чекбокса.
        render(<button type="button">outside</button>);
        screen.getByRole("button").focus();

        renderCheckbox({ active: true });

        expect(screen.getByRole("checkbox")).toHaveFocus();
    });

    it("takes focus when node becomes active and focus is outside", () => {
        const { rerender } = render(
            <CheckboxTreeExtendedContext.Provider value={{ size: EComponentSize.MD }}>
                <button type="button">outside</button>
                <CheckboxTreeExtendedCheckbox active={false}>Значение</CheckboxTreeExtendedCheckbox>
            </CheckboxTreeExtendedContext.Provider>,
        );

        screen.getByRole("button").focus();

        rerender(
            <CheckboxTreeExtendedContext.Provider value={{ size: EComponentSize.MD }}>
                <button type="button">outside</button>
                <CheckboxTreeExtendedCheckbox active>Значение</CheckboxTreeExtendedCheckbox>
            </CheckboxTreeExtendedContext.Provider>,
        );

        expect(screen.getByRole("checkbox")).toHaveFocus();
    });
});
