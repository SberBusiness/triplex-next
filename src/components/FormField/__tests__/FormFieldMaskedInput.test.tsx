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

/** Слой с подсказкой маски: зеркало введённого значения и оставшаяся часть маски. */
const getMaskLayer = (container: HTMLElement) => {
    const layer = container.querySelector('[aria-hidden="true"]');

    return { mirror: layer?.children[0]?.textContent, rest: layer?.children[1]?.textContent };
};

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

/** Перехватывает предупреждения React, чтобы их можно было проверить в тесте. */
const spyOnConsoleError = () => vi.spyOn(console, "error").mockImplementation(() => undefined);

describe("FormFieldMaskedInput", () => {
    // Восстановление в afterEach, а не по месту: иначе упавший expect оставил бы console.error
    // застабленным для остальных тестов файла.
    afterEach(() => {
        vi.restoreAllMocks();
    });

    // Тест должен идти первым: React выводит предупреждение о смешении value и defaultValue
    // только один раз за время жизни модуля, поэтому в последующих тестах его уже не поймать.
    it("does not mix controlled and uncontrolled input props", () => {
        const consoleError = spyOnConsoleError();

        renderMaskedInput();

        expect(consoleError).not.toHaveBeenCalled();
    });

    it("renders value conformed to the mask", () => {
        renderMaskedInput();

        expect(getInput()).toHaveValue("12.12.2024");
    });

    it("does not accept defaultValue and ignores it at runtime", () => {
        const consoleError = spyOnConsoleError();
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

        // Значение из defaultValue не должно ни отобразиться, ни дойти до <input> в обход типа.
        expect(getInput()).toHaveValue("");
        expect(consoleError).not.toHaveBeenCalled();
    });

    it("renders value conformed to the phone mask", () => {
        renderMaskedInput({ mask: masks.phone, value: "9001234567" });

        expect(getInput()).toHaveValue("+7 (900) 123-45-67");
    });

    it.each([
        ["79984903284", "+7 (998) 490-32-84"],
        ["89984903284", "+7 (998) 490-32-84"],
        ["+79984903284", "+7 (998) 490-32-84"],
        ["9984903284", "+7 (998) 490-32-84"],
        ["9701234567", "+7 (970) 123-45-67"],
    ])("renders phone value %s in full", (value, expected) => {
        renderMaskedInput({ mask: masks.phone, value });

        expect(getInput()).toHaveValue(expected);
    });

    // Слой с маской считается по тому же нормализованному значению, что и инпут: иначе на
    // частично заполненном номере зеркало под введённым текстом разъезжается с самим текстом.
    it("keeps the mask layer aligned with a partially filled phone value", () => {
        const { container } = renderMaskedInput({ mask: masks.phone, value: "7998" });

        expect(getInput()).toHaveValue("+7 (998) ");
        expect(getMaskLayer(container)).toEqual({ mirror: "+7 (998) ", rest: "000-00-00" });
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
