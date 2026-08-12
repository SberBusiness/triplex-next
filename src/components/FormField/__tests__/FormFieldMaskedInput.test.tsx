import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
const ControlledMaskedInput = ({
    initialValue,
    onChange,
}: {
    initialValue: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
    const [value, setValue] = useState(initialValue);

    return (
        <FormField>
            <FormFieldMaskedInput
                mask={masks.date}
                value={value}
                onChange={(event) => {
                    onChange?.(event);
                    setValue(event.target.value);
                }}
            />
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

    it("does not accept defaultValue and ignores it at runtime", () => {
        const props: React.ComponentProps<typeof FormFieldMaskedInput> = {
            mask: masks.date,
            value: "",
            // @ts-expect-error defaultValue исключён из props: поле контролируемое, начальное значение задаётся через value.
            defaultValue: "12122024",
        };

        render(
            <FormField>
                <FormFieldMaskedInput {...props} />
            </FormField>,
        );

        expect(getInput()).toHaveValue("");
    });

    it("renders value conformed to the phone mask", () => {
        renderMaskedInput({ mask: masks.phone, value: "9001234567" });

        expect(getInput()).toHaveValue("+7 (900) 123-45-67");
    });

    it("allows deleting a mask separator", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn<React.ChangeEventHandler<HTMLInputElement>>();
        render(<ControlledMaskedInput initialValue="" onChange={onChange} />);

        await user.click(getInput());
        await user.keyboard("12");
        // Разделитель маска подставляет сама, как только заполнена группа символов.
        expect(getInput()).toHaveValue("12.");

        onChange.mockClear();
        // Разделитель должен стираться: если в input уходит приведённое к маске значение,
        // маска возвращает его обратно и удаление не работает.
        await user.keyboard("{Backspace}");

        expect(getInput()).toHaveValue("12");
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].target.value).toBe("12");
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
