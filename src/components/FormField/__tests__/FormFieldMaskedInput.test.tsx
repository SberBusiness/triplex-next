import React from "react";
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

    it("keeps React value in sync with the value set by the mask", () => {
        // react-text-mask пишет значение в DOM напрямую, поэтому в input должно приходить
        // уже приведённое к маске значение, иначе React и DOM расходятся.
        renderMaskedInput();

        const input = getInput();
        expect(input.defaultValue).toBe(input.value);
    });

    it("keeps the displayed value conformed when input is rejected by the mask", () => {
        renderMaskedInput({ onChange: vi.fn() });

        // Лишний символ маска не принимает — значение в поле должно остаться отформатированным.
        fireEvent.change(getInput(), { target: { value: "12.12.20245" } });

        expect(getInput()).toHaveValue("12.12.2024");
    });

    it("calls onChange when the incoming value differs from the entered one", () => {
        const onChange = vi.fn();
        renderMaskedInput({ mask: masks.phone, onChange, value: "9001234567" });

        fireEvent.change(getInput(), { target: { value: "+7 (900) 123-45-678" } });

        expect(onChange).toHaveBeenCalledTimes(1);
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
