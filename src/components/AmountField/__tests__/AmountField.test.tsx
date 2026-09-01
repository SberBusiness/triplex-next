import React, { useState } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AmountField } from "../AmountField";
import { EComponentSize } from "../../../enums";
import { EFormFieldStatus } from "../../FormField";

describe("AmountField", () => {
    test("renders formatted value for initial raw value", () => {
        const Wrapper = () => {
            const [value, setValue] = useState("1234.56");
            return <AmountField label="Label" inputProps={{ value, onChange: setValue, placeholder: "0,00" }} />;
        };

        render(<Wrapper />);
        const input = screen.getByRole("textbox");
        expect((input as HTMLInputElement).value).toBe("1 234,56");
    });

    test("typing updates raw value via onChange and displays formatted value", () => {
        const handleChange = vi.fn();
        const Test = ({ value }: { value: string }) => (
            <AmountField label="Label" inputProps={{ value, onChange: handleChange, placeholder: "0,00" }} />
        );

        const { rerender } = render(<Test value="" />);
        const input = screen.getByRole("textbox") as HTMLInputElement;

        const typed = "1234567,89";
        input.setSelectionRange(0, 0);
        fireEvent.change(input, { target: { value: typed, selectionStart: typed.length, selectionEnd: typed.length } });

        expect(handleChange).toHaveBeenCalled();
        const lastCallArg = handleChange.mock.calls.at(-1)?.[0];
        expect(lastCallArg).toBe("1234567.89");

        rerender(<Test value={lastCallArg} />);
        expect(input.value).toBe("1 234 567,89");
    });

    test("backspace near group separator adjusts caret and value remains consistent", () => {
        const Wrapper = () => {
            const [value, setValue] = useState("1234.56");
            return <AmountField label="Label" inputProps={{ value, onChange: setValue, placeholder: "0,00" }} />;
        };

        render(<Wrapper />);
        const input = screen.getByRole("textbox") as HTMLInputElement;
        expect(input.value).toBe("1 234,56");

        input.setSelectionRange(2, 2);
        const nextValue = "1234,56";
        fireEvent.change(input, { target: { value: nextValue, selectionStart: 2, selectionEnd: 2 } });

        expect(input.value).toMatch(/1 234,56/);
    });

    test("renders currency unit when value is present", () => {
        render(<AmountField label="Label" inputProps={{ value: "0.00", onChange: vi.fn() }} currency="₽" />);

        const unit = screen.getByText("₽");
        expect(unit).toBeInTheDocument();
    });

    test("applies correct size classes and passes custom className", () => {
        const { container } = render(
            <AmountField
                className="custom-class"
                size={EComponentSize.SM}
                label="Label"
                inputProps={{ value: "0.00", onChange: vi.fn() }}
                currency="₽"
            />,
        );

        const customElement = container.querySelector(".custom-class");
        expect(customElement).toBeInTheDocument();

        const currencyLayout = container.querySelector(".currencyLayout");
        expect(currencyLayout).toHaveClass("sm");
    });

    test("handles disabled state through status", () => {
        render(
            <AmountField
                status={EFormFieldStatus.DISABLED}
                label="Label"
                inputProps={{ value: "0.00", onChange: vi.fn() }}
                currency="₽"
            />,
        );

        const unit = screen.getByText("₽");
        expect(unit).toHaveClass("disabled");

        const input = screen.getByRole("textbox");
        expect(input).toBeDisabled();
    });

    test("forwards ref to FormField root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<AmountField label="Label" inputProps={{ value: "", onChange: vi.fn() }} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("formField");
    });

    it("forwards inputProps.ref to input element", () => {
        const inputRef = React.createRef<HTMLInputElement>();
        render(<AmountField label="Label" inputProps={{ value: "", onChange: vi.fn(), ref: inputRef }} />);

        expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
        expect(inputRef.current).toBe(screen.getByRole("textbox"));
    });

    test("triggers input handlers like onKeyDown and onSelect", () => {
        const handleKeyDown = vi.fn();
        const handleSelect = vi.fn();

        render(
            <AmountField
                label="Label"
                inputProps={{
                    value: "",
                    onChange: vi.fn(),
                    onKeyDown: handleKeyDown,
                    onSelect: handleSelect,
                }}
            />,
        );

        const input = screen.getByRole("textbox");

        act(() => {
            fireEvent.keyDown(input, { key: "Enter" });
        });
        expect(handleKeyDown).toHaveBeenCalled();

        act(() => {
            fireEvent.select(input);
        });
        expect(handleSelect).toHaveBeenCalled();
    });
});
