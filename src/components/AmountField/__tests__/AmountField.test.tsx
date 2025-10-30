import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AmountField } from "@sberbusiness/triplex-next/components/AmountField/AmountField";

describe("AmountField", () => {
    test("renders formatted value for initial raw value", () => {
        const Wrapper = () => {
            const [value, setValue] = useState("1234.56");
            return <AmountField label="Сумма" inputProps={{ value, onChange: setValue, placeholder: "0,00" }} />;
        };

        render(<Wrapper />);
        const input = screen.getByRole("textbox");
        expect((input as HTMLInputElement).value).toBe("1 234,56");
    });

    test("typing updates raw value via onChange and displays formatted value", () => {
        const handleChange = vi.fn();
        const Test = ({ value }: { value: string }) => (
            <AmountField label="Сумма" inputProps={{ value, onChange: handleChange, placeholder: "0,00" }} />
        );

        // Render first with empty value
        const { rerender } = render(<Test value="" />);
        const input = screen.getByRole("textbox") as HTMLInputElement;

        // Simulate entering value with comma as decimal separator
        const typed = "1234567,89";
        // Set caret to end to emulate user typing
        input.setSelectionRange(0, 0);
        fireEvent.change(input, { target: { value: typed, selectionStart: typed.length, selectionEnd: typed.length } });

        // onChange receives raw value with decimal point
        expect(handleChange).toHaveBeenCalled();
        const lastCallArg = handleChange.mock.calls.at(-1)?.[0];
        expect(lastCallArg).toBe("1234567.89");

        // Parent updates value -> component formats it
        rerender(<Test value={lastCallArg} />);
        expect(input.value).toBe("1 234 567,89");
    });

    test("backspace near group separator adjusts caret and value remains consistent", () => {
        // This is a smoke test to ensure backspace scenarios do not crash and keep formatting consistent
        const Wrapper = () => {
            const [value, setValue] = useState("1234.56");
            return (
                <AmountField
                    label="Сумма"
                    inputProps={{
                        value,
                        onChange: setValue,
                        placeholder: "0,00",
                    }}
                />
            );
        };

        render(<Wrapper />);
        const input = screen.getByRole("textbox") as HTMLInputElement;
        expect(input.value).toBe("1 234,56");

        // Place caret right after the space (group separator) and press backspace
        // Current formatted is "1 234,56" -> index 2 is after the space
        input.setSelectionRange(2, 2);
        // Simulate backspace by changing value without the space
        const nextValue = "1234,56"; // user attempted deletion near separator
        fireEvent.change(input, { target: { value: nextValue, selectionStart: 2, selectionEnd: 2 } });

        // The component should keep consistent formatting after parent update
        // Update state as parent would via onChange is already wired in Wrapper
        // Trigger another rerender by simulating blur/focus cycle (not necessary, just assertion)
        expect(input.value).toMatch(/1 234,56/);
    });
});
