import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { ISliderRangeProps, SliderRange, TSliderRangeValues } from "../../src/components/Slider";
import { EComponentSize } from "../../src";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Slider/SliderRange",
    component: SliderRange,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент слайдера с двумя ползунками для выбора диапазона значений.

## Особенности

- **Диапазон**: два ползунка для выбора диапазона значений
- **Метки**: поддержка меток под полосой слайдера
- **Шаги**: настраиваемая длина шага или массив шагов
- **Трек**: возможность перетаскивания трека между ползунками
- **Тултип**: опциональный тултип при наведении и перемещении
- **Состояния**: disabled, reverse
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
} as const;

export const Playground: StoryObj<ISliderRangeProps> = {
    name: "Playground",
    render: (args) => {
        const [values, setValues] = useState<TSliderRangeValues>(args.values ?? [35, 60]);

        const handleChange = (newValues: TSliderRangeValues) => {
            setValues(newValues);
            action("onChange")(newValues);
        };

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange {...args} values={values} onChange={handleChange} />
            </div>
        );
    },
    args: {
        min: 0,
        max: 100,
        values: [35, 60],
        step: 1,
        disabled: false,
        reverse: false,
        size: EComponentSize.MD,
        draggableTrack: true,
        marks: [
            { value: 0, label: "0" },
            { value: 35, label: "35" },
            { value: 66, label: "66" },
            { value: 100, label: "100" },
        ],
    },
    argTypes: {
        min: {
            control: { type: "number" },
            description: "Минимальное значение слайдера",
            table: {
                type: { summary: "number" },
            },
        },
        max: {
            control: { type: "number" },
            description: "Максимальное значение слайдера",
            table: {
                type: { summary: "number" },
            },
        },
        values: {
            control: { type: "object" },
            description: "Значения Range - массив из двух чисел",
            table: {
                type: { summary: "[number, number]" },
            },
        },
        step: {
            control: { type: "number" },
            description: "Длина шага",
            table: {
                type: { summary: "number | number[]" },
                defaultValue: { summary: "1" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Слайдер не активен",
            table: {
                type: { summary: "boolean" },
            },
        },
        reverse: {
            control: { type: "boolean" },
            description: "Реверсивный слайдер",
            table: {
                type: { summary: "boolean" },
            },
        },
        size: {
            control: { type: "select" },
            options: [EComponentSize.MD, EComponentSize.LG],
            description: "Размер слайдера",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        draggableTrack: {
            control: { type: "boolean" },
            description: "Трек можно передвигать",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        marks: {
            control: { type: "object" },
            description: "Массив меток под полосой слайдера",
            table: {
                type: { summary: "ISliderRangeMark[]" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["min", "max", "values", "step", "disabled", "reverse", "size", "draggableTrack", "marks"],
        },
    },
};

export const Default: StoryObj<ISliderRangeProps> = {
    name: "Default",
    render: () => {
        const [values, setValues] = React.useState([30, 50]);

        const marks = [
            { label: 0, value: 0 },
            { label: 30, value: 30 },
            { label: 70, value: 70 },
            { label: 100, value: 100 },
        ];

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange values={values} marks={marks} min={0} max={100} step={1} onChange={setValues} />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Базовый пример использования слайдера диапазона с метками.",
            },
        },
        controls: { disable: true },
    },
};

export const WithTooltip: StoryObj<ISliderRangeProps> = {
    name: "With Tooltip",
    render: () => {
        const [values, setValues] = useState<TSliderRangeValues>([35, 60]);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange
                    min={0}
                    max={100}
                    values={values}
                    onChange={setValues}
                    renderTooltipContent={(val) => `${val}%`}
                    size={EComponentSize.LG}
                    marks={[
                        { value: 0, label: "0" },
                        { value: 35, label: "35" },
                        { value: 66, label: "66" },
                        { value: 100, label: "100" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Слайдер диапазона с тултипами, отображающими текущие значения в процентах.",
            },
        },
        controls: { disable: true },
    },
};

export const WithCustomSteps: StoryObj<ISliderRangeProps> = {
    name: "With Custom Steps",
    render: () => {
        const [values, setValues] = useState<TSliderRangeValues>([25, 75]);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange
                    min={0}
                    max={100}
                    values={values}
                    onChange={setValues}
                    step={[0, 25, 50, 75, 100]}
                    marks={[
                        { value: 0, label: "0" },
                        { value: 25, label: "25" },
                        { value: 50, label: "50" },
                        { value: 75, label: "75" },
                        { value: 100, label: "100" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Слайдер диапазона с кастомными шагами. Ползунки могут находиться только в определенных позициях.",
            },
        },
        controls: { disable: true },
    },
};

export const NonDraggableTrack: StoryObj<ISliderRangeProps> = {
    name: "Non Draggable Track",
    render: () => {
        const [values, setValues] = useState<TSliderRangeValues>([35, 60]);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange
                    min={0}
                    max={100}
                    values={values}
                    onChange={setValues}
                    draggableTrack={false}
                    marks={[
                        { value: 0, label: "0" },
                        { value: 35, label: "35" },
                        { value: 66, label: "66" },
                        { value: 100, label: "100" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Слайдер диапазона с отключенной возможностью перетаскивания трека.",
            },
        },
        controls: { disable: true },
    },
};

export const Disabled: StoryObj<ISliderRangeProps> = {
    name: "Disabled",
    render: () => {
        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <SliderRange
                    min={0}
                    max={100}
                    values={[35, 60]}
                    onChange={() => {}}
                    disabled
                    marks={[
                        { value: 0, label: "0" },
                        { value: 35, label: "35" },
                        { value: 66, label: "66" },
                        { value: 100, label: "100" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Слайдер диапазона в состоянии disabled.",
            },
        },
        controls: { disable: true },
    },
};

export const Reverse: StoryObj<ISliderRangeProps> = {
    name: "Reverse",
    render: () => {
        const [values, setValues] = useState<TSliderRangeValues>([35, 60]);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>values = {`[${values[0]}, ${values[1]}]`}</div>
                <br />
                <SliderRange
                    min={0}
                    max={100}
                    values={values}
                    onChange={setValues}
                    reverse
                    marks={[
                        { value: 0, label: "0" },
                        { value: 35, label: "35" },
                        { value: 66, label: "66" },
                        { value: 100, label: "100" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Реверсивный слайдер диапазона.",
            },
        },
        controls: { disable: true },
    },
};
