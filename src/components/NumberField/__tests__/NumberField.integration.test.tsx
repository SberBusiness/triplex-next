import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EFormFieldStatus } from "../../FormField";
import { NumberField, INumberFieldProps } from "../index";

describe("NumberField integration", () => {
    const renderComponent = (props: Partial<INumberFieldProps> = {}) =>
        render(<NumberField inputProps={{}} {...props} />);

    it("forwards independent root and input refs with their respective attributes", () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const inputRef = React.createRef<HTMLInputElement>();
        render(
            <NumberField
                ref={rootRef}
                className="custom-root"
                id="number-field"
                label="Number"
                inputProps={{ ref: inputRef, id: "number-input", className: "custom-input", name: "quantity" }}
            />,
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(rootRef.current).toHaveClass("formField", "custom-root");
        expect(rootRef.current).toHaveAttribute("id", "number-field");
        expect(rootRef.current).toContainElement(inputRef.current);
        expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
        expect(inputRef.current).toBe(screen.getByLabelText("Number"));
        expect(inputRef.current).toHaveClass("formFieldInput", "custom-input");
        expect(inputRef.current).toHaveAttribute("id", "number-input");
        expect(inputRef.current).toHaveAttribute("name", "quantity");
    });

    it("supports callback refs and clears both refs on unmount", () => {
        const rootRef = vi.fn<React.RefCallback<HTMLDivElement>>();
        const inputRef = vi.fn<React.RefCallback<HTMLInputElement>>();
        const { unmount } = render(<NumberField ref={rootRef} inputProps={{ ref: inputRef }} />);

        expect(rootRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
        expect(inputRef).toHaveBeenCalledWith(screen.getByRole("textbox"));

        unmount();

        expect(rootRef).toHaveBeenLastCalledWith(null);
        expect(inputRef).toHaveBeenLastCalledWith(null);
    });

    it.each(Object.values(EComponentSize))("applies size %s to the field and input", (size) => {
        const rootRef = React.createRef<HTMLDivElement>();
        render(<NumberField ref={rootRef} size={size} inputProps={{}} />);

        expect(rootRef.current).toHaveClass(size);
        expect(screen.getByRole("textbox")).toHaveClass(size);
    });

    it.each(Object.values(EFormFieldStatus))("applies status %s to the field and input", (status) => {
        const rootRef = React.createRef<HTMLDivElement>();
        render(<NumberField ref={rootRef} status={status} inputProps={{}} />);

        expect(rootRef.current).toHaveClass(status);
        if (status === EFormFieldStatus.DISABLED) {
            expect(screen.getByRole("textbox")).toBeDisabled();
        } else {
            expect(screen.getByRole("textbox")).toBeEnabled();
        }
    });

    it.each([
        ["123", "123"],
        ["a1b2c3", "123"],
        ["12.34", "12,34"],
        ["12,34", "12,34"],
        ["-12.34", "-12,34"],
        ["1-2+3", "123"],
        ["--12", "-12"],
        ["0012", "0012"],
        ["-", "-"],
        [",", ","],
        ["-,", "-,"],
        ["abc", ""],
        ["1,2.3", "1,23"],
    ])("filters changed value %s to %s before calling onChange", (value, filteredValue) => {
        const onChange = vi.fn<React.ChangeEventHandler<HTMLInputElement>>((event) => {
            expect(event.target.value).toBe(filteredValue);
            expect(event.currentTarget.value).toBe(filteredValue);
        });
        renderComponent({ inputProps: { onChange } });
        const input = screen.getByRole("textbox");

        fireEvent.change(input, { target: { value, selectionStart: value.length, selectionEnd: value.length } });

        expect(input).toHaveValue(filteredValue);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
    });

    it("filters input without an onChange callback", () => {
        renderComponent();

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "a12.3b" } });

        expect(screen.getByRole("textbox")).toHaveValue("12,3");
    });

    it.each([
        { value: "12x34", caret: 3, filteredValue: "1234", filteredCaret: 2 },
        { value: "1.2,3", caret: 2, filteredValue: "12,3", filteredCaret: 1 },
        { value: "1,2.3", caret: 4, filteredValue: "1,23", filteredCaret: 3 },
    ])(
        "preserves filtering and caret adjustment for $value at caret $caret",
        async ({ value, caret, filteredValue, filteredCaret }) => {
            const user = userEvent.setup();
            const onFilteredChange = vi.fn<(value: string, caret: number | null) => void>();
            const onChange = vi.fn<React.ChangeEventHandler<HTMLInputElement>>((event) => {
                onFilteredChange(event.target.value, event.target.selectionStart);
            });
            renderComponent({ inputProps: { onChange } });
            const input = screen.getByRole<HTMLInputElement>("textbox");
            await user.click(input);

            fireEvent.change(input, { target: { value, selectionStart: caret, selectionEnd: caret } });

            expect(input).toHaveValue(filteredValue);
            expect(input.selectionStart).toBe(filteredCaret);
            expect(input.selectionEnd).toBe(filteredCaret);
            expect(onFilteredChange).toHaveBeenCalledWith(filteredValue, filteredCaret);
            expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
        },
    );

    it("filters typed characters in a controlled field", async () => {
        const user = userEvent.setup();
        const ControlledNumberField = () => {
            const [value, setValue] = useState("");
            return <NumberField inputProps={{ value, onChange: (event) => setValue(event.target.value) }} />;
        };
        render(<ControlledNumberField />);

        await user.type(screen.getByRole("textbox"), "a-12.3x");

        expect(screen.getByRole("textbox")).toHaveValue("-12,3");
    });

    it("does not filter the supplied value during render or rerender", () => {
        const { rerender } = render(<NumberField inputProps={{ value: "a-1.2", readOnly: true }} />);

        expect(screen.getByRole("textbox")).toHaveValue("a-1.2");

        rerender(<NumberField inputProps={{ value: "3.4", readOnly: true }} />);

        expect(screen.getByRole("textbox")).toHaveValue("3.4");
    });

    it("calls input focus and blur callbacks and updates the active state", async () => {
        const user = userEvent.setup();
        const rootRef = React.createRef<HTMLDivElement>();
        const onFocus = vi.fn<React.FocusEventHandler<HTMLInputElement>>();
        const onBlur = vi.fn<React.FocusEventHandler<HTMLInputElement>>();
        render(
            <>
                <NumberField ref={rootRef} inputProps={{ onFocus, onBlur }} />
                <button>Next</button>
            </>,
        );
        const input = screen.getByRole("textbox");

        await user.click(input);

        expect(input).toHaveFocus();
        expect(rootRef.current).toHaveClass("active");
        expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ target: input, type: "focus" }));

        await user.tab();

        expect(screen.getByRole("button", { name: "Next" })).toHaveFocus();
        expect(rootRef.current).not.toHaveClass("active");
        expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ target: input, type: "blur" }));
    });

    it("blocks typing and focus callbacks while disabled", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn<React.ChangeEventHandler<HTMLInputElement>>();
        const onFocus = vi.fn<React.FocusEventHandler<HTMLInputElement>>();
        renderComponent({ status: EFormFieldStatus.DISABLED, inputProps: { onChange, onFocus } });

        await user.type(screen.getByRole("textbox"), "123");

        expect(screen.getByRole("textbox")).toHaveValue("");
        expect(onChange).not.toHaveBeenCalled();
        expect(onFocus).not.toHaveBeenCalled();
    });

    it("has displayName NumberField", () => {
        expect(NumberField.displayName).toBe("NumberField");
    });
});
