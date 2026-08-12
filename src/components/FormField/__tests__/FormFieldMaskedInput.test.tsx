import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FormField, FormFieldMaskedInput } from "@sberbusiness/triplex-next/components";

const { masks } = FormFieldMaskedInput.presets;

const renderMaskedInput = (props: Partial<React.ComponentProps<typeof FormFieldMaskedInput>> = {}) =>
    render(
        <FormField>
            <FormFieldMaskedInput mask={masks.date} value="12122024" {...props} />
        </FormField>,
    );

const getInput = () => screen.getByRole("textbox") as HTMLInputElement;

/** Поле, значение которого хранит потребитель, — так компонент используется в реальном коде. */
const ControlledMaskedInput = ({ initialValue }: { initialValue: string }) => {
    const [value, setValue] = useState(initialValue);

    return (
        <FormField>
            <FormFieldMaskedInput mask={masks.date} value={value} onChange={(event) => setValue(event.target.value)} />
        </FormField>
    );
};

describe("FormFieldMaskedInput", () => {
    // Тест должен идти первым: React выводит предупреждение о смешении value и defaultValue
    // только один раз за время жизни модуля, поэтому в последующих тестах его уже не поймать.
    it("does not mix controlled and uncontrolled input props", () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

        renderMaskedInput();

        expect(consoleError).not.toHaveBeenCalled();

        consoleError.mockRestore();
    });

    it("renders value conformed to the mask", () => {
        renderMaskedInput();

        expect(getInput()).toHaveValue("12.12.2024");
    });

    it("renders value conformed to the phone mask", () => {
        renderMaskedInput({ mask: masks.phone, value: "9001234567" });

        expect(getInput()).toHaveValue("+7 (900) 123-45-67");
    });

    it("allows deleting a mask separator", () => {
        render(<ControlledMaskedInput initialValue="12." />);

        // Разделитель маски подставляется автоматически, поэтому в input должно уходить
        // исходное значение потребителя — иначе маска возвращает стёртый разделитель обратно.
        fireEvent.change(getInput(), { target: { value: "12" } });

        expect(getInput()).toHaveValue("12");
    });

    it("conforms the value when the controlled value changes", () => {
        const { rerender } = renderMaskedInput({ value: "" });

        rerender(
            <FormField>
                <FormFieldMaskedInput mask={masks.date} value="12122024" />
            </FormField>,
        );

        expect(getInput()).toHaveValue("12.12.2024");
    });

    it("keeps the conformed value stable across re-renders with the same props", () => {
        const { rerender } = renderMaskedInput({ mask: masks.phone, value: "9001234567" });

        rerender(
            <FormField>
                <FormFieldMaskedInput mask={masks.phone} value="9001234567" />
            </FormField>,
        );

        expect(getInput()).toHaveValue("+7 (900) 123-45-67");
    });
});
