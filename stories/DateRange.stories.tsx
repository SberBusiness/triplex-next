import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import {
    DateRange,
    IDateRangeButtonProvideProps,
    IDateRangePickerProvideProps,
    TDateRangeValue,
} from "../src/components/DateRange/DateRange";
import { EDateRangeShiftUnit } from "../src/components/DateRange/enums";
import { DateField } from "../src/components/DateField";
import { ButtonIcon } from "../src/components/Button/ButtonIcon";
import { presets } from "../src/components/FormField/components/FormFieldMaskedInputPresets";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/DateRange",
    component: DateRange,
    parameters: {
        docs: {
            description: {
                component: `
Компонент DateRange представляет собой выбор диапазона дат с возможностью навигации.

## Основные возможности

- **Диапазон дат** - выбор периода с помощью двух полей дат
- **Навигация** - кнопки сдвига диапазона назад/вперёд
- **Гибкая настройка сдвига** - настраиваемый шаг (день, неделя, месяц, квартал, год)
- **Кастомизация** - рендер-пропы для пикеров и кнопок
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />

                    {/* Полная таблица props компонента. */}
                    <Controls of={Default} />

                    {/* Основная стори (обычно Playground или первая). */}
                    <Primary />

                    {/* Остальные истории. */}
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
};

interface IDateRangeWithControlsProps extends React.ComponentProps<typeof DateRange> {}

export const Playground: StoryObj<IDateRangeWithControlsProps> = {
    render: (args) => {
        const [value, setValue] = useState<TDateRangeValue>(["", ""]);

        const renderPicker = (props: IDateRangePickerProvideProps) => (
            <DateField
                label="Label"
                placeholderMask={presets.placeholderMasks.date}
                invalidDateHint="Указана недоступная для выбора дата."
                {...props}
            />
        );

        const renderButton = (props: IDateRangeButtonProvideProps) => <ButtonIcon {...props} />;

        return (
            <div style={{ maxWidth: "400px" }}>
                <DateRange
                    {...args}
                    value={value}
                    onChange={setValue}
                    renderPickerFrom={renderPicker}
                    renderPickerTo={renderPicker}
                    renderButtonBack={renderButton}
                    renderButtonForward={renderButton}
                />
            </div>
        );
    },
    argTypes: {
        shiftAmount: {
            control: { type: "number", min: 1, max: 12 },
            description: "Численная величина сдвига диапазона дат",
            table: {
                type: { summary: "number" },
                defaultValue: { summary: "1" },
            },
        },
        shiftUnit: {
            control: { type: "select" },
            options: Object.values(EDateRangeShiftUnit),
            description: "Единица измерения сдвига диапазона дат",
            table: {
                type: { summary: "EDateRangeShiftUnit" },
                defaultValue: { summary: "EDateRangeShiftUnit.MONTH" },
            },
        },
        hideNavigation: {
            control: { type: "boolean" },
            description: "Скрыть кнопки навигации",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
    },
    args: {
        shiftAmount: 1,
        shiftUnit: EDateRangeShiftUnit.MONTH,
        hideNavigation: false,
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация DateRange с расширенными controls. Позволяет настраивать все основные свойства компонента, включая величину и единицу сдвига, начальные значения и отображение кнопок навигации.",
            },
        },
        controls: {
            include: ["shiftAmount", "shiftUnit", "hideNavigation"],
        },
    },
};

export const Default: StoryObj<typeof DateRange> = {
    render: () => {
        const [value, setValue] = useState<TDateRangeValue>(["2024-01-01", "2024-01-31"]);

        const renderPicker = (props: IDateRangePickerProvideProps) => (
            <DateField
                label="Label"
                placeholderMask={presets.placeholderMasks.date}
                invalidDateHint="Указана недоступная для выбора дата."
                {...props}
            />
        );

        const renderButton = (props: IDateRangeButtonProvideProps) => <ButtonIcon {...props} />;

        return (
            <div style={{ maxWidth: "400px" }}>
                <DateRange
                    value={value}
                    onChange={setValue}
                    shiftAmount={1}
                    shiftUnit={EDateRangeShiftUnit.MONTH}
                    renderPickerFrom={renderPicker}
                    renderPickerTo={renderPicker}
                    renderButtonBack={renderButton}
                    renderButtonForward={renderButton}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Базовый пример использования DateRange с стандартными настройками.",
            },
        },
        controls: { disable: true },
    },
};

export const WithoutNavigation: StoryObj<typeof DateRange> = {
    render: () => {
        const [value, setValue] = useState<TDateRangeValue>(["", ""]);

        const renderPicker = (props: IDateRangePickerProvideProps) => (
            <DateField
                label="Label"
                placeholderMask={presets.placeholderMasks.date}
                invalidDateHint="Указана недоступная для выбора дата."
                {...props}
            />
        );

        return (
            <div style={{ maxWidth: "300px" }}>
                <DateRange
                    value={value}
                    onChange={setValue}
                    hideNavigation
                    renderPickerFrom={renderPicker}
                    renderPickerTo={renderPicker}
                    renderButtonBack={() => {
                        return null;
                    }}
                    renderButtonForward={() => {
                        return null;
                    }}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "DateRange без кнопок навигации - только поля выбора дат.",
            },
        },
        controls: { disable: true },
    },
};
