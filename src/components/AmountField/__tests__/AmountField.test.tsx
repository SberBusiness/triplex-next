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

    test("forwards inputProps.ref passed as a callback", () => {
        const inputRef = vi.fn();

        render(<AmountField label="Label" inputProps={{ value: "", onChange: vi.fn(), ref: inputRef }} />);

        expect(inputRef).toHaveBeenCalledWith(screen.getByRole("textbox"));
    });

    test("restores caret position after rerender while the field is focused", () => {
        const Wrapper = () => {
            const [value, setValue] = useState("");
            return <AmountField label="Label" inputProps={{ value, onChange: setValue }} />;
        };

        render(<Wrapper />);
        const input = screen.getByRole("textbox") as HTMLInputElement;
        act(() => {
            input.focus();
        });

        act(() => {
            fireEvent.change(input, { target: { value: "1234", selectionStart: 4, selectionEnd: 4 } });
        });

        expect(input.value).toBe("1 234,00");
        // React после перерисовки ставит каретку в конец значения — эффект возвращает её в позицию,
        // рассчитанную ядром: после введённых цифр, а не после дописанных нулей.
        expect(input.selectionStart).toBe(5);
    });

    test("does not move the caret while the field is not focused", () => {
        const setSelectionRange = vi.spyOn(HTMLInputElement.prototype, "setSelectionRange");
        const Test = ({ value }: { value: string }) => (
            <AmountField label="Label" inputProps={{ value, onChange: vi.fn() }} />
        );

        const { rerender } = render(<Test value="1234.56" />);
        setSelectionRange.mockClear();

        rerender(<Test value="7654.32" />);

        // Поле не в фокусе — setCaretPosition обязан быть no-op, иначе перерисовка украдёт каретку
        // у элемента, с которым сейчас работает пользователь.
        expect(setSelectionRange).not.toHaveBeenCalled();
        setSelectionRange.mockRestore();
    });

    test("does not reattach a stable callback inputProps.ref on rerender", () => {
        const inputRef = vi.fn();
        const { rerender } = render(
            <AmountField label="Label" inputProps={{ value: "", onChange: vi.fn(), ref: inputRef }} />,
        );

        inputRef.mockClear();
        rerender(<AmountField label="Label" inputProps={{ value: "1", onChange: vi.fn(), ref: inputRef }} />);

        expect(inputRef).not.toHaveBeenCalled();
    });

    test("has displayName", () => {
        expect(AmountField.displayName).toBe("AmountField");
    });

    test("does not render currency unit while value is empty", () => {
        render(<AmountField label="Label" inputProps={{ value: "", onChange: vi.fn() }} currency="₽" />);

        expect(screen.queryByText("₽")).not.toBeInTheDocument();
    });

    test("generates placeholder from fractionDigits when it is not passed", () => {
        const { rerender } = render(<AmountField label="Label" inputProps={{ value: "", onChange: vi.fn() }} />);

        expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "0,00");

        rerender(<AmountField label="Label" fractionDigits={0} inputProps={{ value: "", onChange: vi.fn() }} />);

        expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "0");
    });

    test("sets input attributes required for amount input", () => {
        render(<AmountField label="Label" inputProps={{ value: "", onChange: vi.fn() }} />);

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("inputmode", "decimal");
        expect(input).toHaveAttribute("autocomplete", "off");
    });

    test("adds suffixes to data-test-id of input and currency unit", () => {
        const { container } = render(
            <AmountField
                data-test-id="amount"
                label="Label"
                inputProps={{ value: "1234.56", onChange: vi.fn() }}
                currency="₽"
            />,
        );

        expect(container.querySelector('[data-test-id="amount__input"]')).toBe(screen.getByRole("textbox"));
        expect(container.querySelector('[data-test-id="amount__unit"]')).toHaveTextContent("₽");
    });

    test("formats value without fractional part when fractionDigits=0", () => {
        render(<AmountField label="Label" fractionDigits={0} inputProps={{ value: "1234567", onChange: vi.fn() }} />);

        expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe("1 234 567");
    });

    test("limits typed value to maxIntegerDigits", () => {
        const handleChange = vi.fn();

        render(
            <AmountField
                label="Label"
                maxIntegerDigits={3}
                inputProps={{ value: "", onChange: handleChange, placeholder: "0,00" }}
            />,
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;
        const typed = "12345,67";
        fireEvent.change(input, { target: { value: typed, selectionStart: typed.length, selectionEnd: typed.length } });

        expect(handleChange).toHaveBeenCalledWith("123.67");
    });

    test("renders clear button and calls onClear", () => {
        const handleClear = vi.fn();

        render(
            <AmountField label="Label" inputProps={{ value: "1234.56", onChange: vi.fn() }} onClear={handleClear} />,
        );

        const clearButton = screen.getByRole("button");
        fireEvent.click(clearButton);

        expect(handleClear).toHaveBeenCalledTimes(1);
    });

    test("does not render clear button without onClear", () => {
        render(<AmountField label="Label" inputProps={{ value: "1234.56", onChange: vi.fn() }} />);

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
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
