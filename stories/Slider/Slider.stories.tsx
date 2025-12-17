import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { ISliderProps, Slider } from "../../src/components/Slider";
import { EComponentSize } from "../../src";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { range } from "lodash";

export default {
    title: "Components/Slider/Slider",
    component: Slider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент слайдера с одним ползунком.

## Особенности

- **Метки**: поддержка меток под полосой слайдера
- **Шаги**: настраиваемая длина шага или массив шагов
- **Тултип**: опциональный тултип при наведении и перемещении
- **Диапазон**: настраиваемые минимальное и максимальное значения
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

export const Playground: StoryObj<ISliderProps> = {
    name: "Playground",
    render: (args) => {
        const [value, setValue] = useState(args.value ?? 35);

        const handleChange = (newValue: number) => {
            setValue(newValue);
            action("onChange")(newValue);
        };

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>value = {value}</div>
                <br />
                <Slider {...args} value={value} onChange={handleChange} />
            </div>
        );
    },
    args: {
        min: 0,
        max: 100,
        value: 35,
        step: 1,
        disabled: false,
        reverse: false,
        size: EComponentSize.MD,
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
        value: {
            control: { type: "number" },
            description: "Текущее значение слайдера",
            table: {
                type: { summary: "number" },
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
        marks: {
            control: { type: "object" },
            description: "Массив меток под полосой слайдера",
            table: {
                type: { summary: "ISliderMark[]" },
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        renderTooltipContent: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        controls: {
            include: ["min", "max", "value", "step", "disabled", "reverse", "size", "marks"],
        },
    },
};

export const Default: StoryObj<ISliderProps> = {
    name: "Default",
    render: () => {
        const [value, setValue] = useState(35);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>value = {value}</div>
                <br />
                <Slider
                    size={EComponentSize.MD}
                    min={0}
                    max={100}
                    value={value}
                    onChange={setValue}
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
                story: "Базовый пример использования слайдера с метками.",
            },
        },
        controls: { disable: true },
    },
};

export const WithTooltip: StoryObj<ISliderProps> = {
    name: "With Tooltip",
    render: () => {
        const [value, setValue] = useState(35);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>value = {value}</div>
                <br />
                <Slider
                    size={EComponentSize.MD}
                    min={0}
                    max={100}
                    value={value}
                    onChange={setValue}
                    renderTooltipContent={(val) => `${val}`}
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
                story: "Слайдер с тултипом, отображающим текущее значение в процентах.",
            },
        },
        controls: { disable: true },
    },
};

export const WithCustomSteps: StoryObj<ISliderProps> = {
    name: "With Custom Steps",
    render: () => {
        const [value, setValue] = useState(50);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>value = {value}</div>
                <br />
                <Slider
                    size={EComponentSize.MD}
                    min={0}
                    max={100}
                    value={value}
                    onChange={setValue}
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
                story: "Слайдер с кастомными шагами. Ползунок может находиться только в определенных позициях.",
            },
        },
        controls: { disable: true },
    },
};

export const Disabled: StoryObj<ISliderProps> = {
    name: "Disabled",
    render: () => {
        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <Slider
                    size={EComponentSize.MD}
                    min={0}
                    max={100}
                    value={35}
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
                story: "Слайдер в состоянии disabled.",
            },
        },
        controls: { disable: true },
    },
};

export const Reverse: StoryObj<ISliderProps> = {
    name: "Reverse",
    render: () => {
        const [value, setValue] = useState(35);

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>value = {value}</div>
                <br />
                <Slider
                    size={EComponentSize.MD}
                    min={0}
                    max={100}
                    value={value}
                    onChange={setValue}
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
                story: "Реверсивный слайдер.",
            },
        },
        controls: { disable: true },
    },
};

export const Amounts: StoryObj<ISliderProps> = {
    name: "Amounts",
    render: () => {
        const [value, setValue] = useState(1000000);

        const amounts = [
            0,
            10000,
            ...range(20000, 240000, 20000),
            ...range(240000, 1000000, 40000),
            ...range(1000000, 2150000, 50000),
            ...range(2150000, 2600000, 75000),
            ...range(2600000, 3000000, 100000),
            ...range(3000000, 3800000, 200000),
            ...range(3800000, 9000000, 400000),
            ...range(9000000, 10000000, 500000),
            ...range(10000000, 25000000, 2500000),
            ...range(25000000, 40000000, 5000000),
            ...range(40000000, 90000001, 10000000),
            100000000,
        ];

        return (
            <div style={{ maxWidth: "750px", padding: "30px" }}>
                <div>{new Intl.NumberFormat("ru-RU").format(value)}</div>
                <br />
                <Slider
                    size={EComponentSize.MD}
                    min={0}
                    max={99}
                    value={amounts.findIndex((v) => value === v)}
                    onChange={(value) => setValue(amounts[value])}
                    marks={[
                        { value: 0, label: "0 млн" },
                        { value: 32, label: "1 млн" },
                        { value: 65, label: "3 млн" },
                        { value: 99, label: "100 млн" },
                    ]}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Слайдер с нелинейной шкалой.",
            },
        },
        controls: { disable: true },
    },
};
