import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { EComponentSize, ISliderProps, Slider } from "@sberbusiness/triplex-next";
import {
    Amounts as AmountsRender,
    AmountsSource,
    Default as DefaultRender,
    DefaultSource,
    Disabled as DisabledRender,
    DisabledSource,
    Playground as PlaygroundRender,
    Reverse as ReverseRender,
    ReverseSource,
    Sizes as SizesRender,
    SizesSource,
    VisualTests as VisualTestsRender,
    WithCustomSteps as WithCustomStepsRender,
    WithCustomStepsSource,
    WithTooltip as WithTooltipRender,
    WithTooltipSource,
} from "./examples/Slider";

const meta = {
    title: "Components/Slider/Slider",
    component: Slider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Слайдер с одним ползунком — готовая сборка **SliderExtended**: полоса, ползунок, трек и метки.

Значение контролируемое: компонент сообщает новое значение через **onChange** и ждёт его в **value** — без обновления **value** снаружи ползунок не двигается.

Метки задаются массивом **marks**, подсказка над ползунком — функцией **renderTooltipContent**; подсказка видна, пока ползунок в фокусе или под курсором.

Если нужен диапазон из двух ползунков — возьми **SliderRange**, а если нестандартный состав частей — собери его из **SliderExtended**.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Slider} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Slider>;

export default meta;

const PLAYGROUND_ARGS: Omit<ISliderProps, "onChange" | "value"> = {
    disabled: false,
    marks: [
        { value: 0, label: "0" },
        { value: 35, label: "35" },
        { value: 66, label: "66" },
        { value: 100, label: "100" },
    ],
    max: 100,
    min: 0,
    reverse: false,
    size: EComponentSize.MD,
    step: 1,
};

export const Playground: StoryObj<ISliderProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        min: {
            control: { type: "number" },
            description: "Минимальное значение слайдера.",
            table: { type: { summary: "number" } },
        },
        max: {
            control: { type: "number" },
            description: "Максимальное значение слайдера.",
            table: { type: { summary: "number" } },
        },
        step: {
            control: { type: "number", min: 1 },
            description: "Длина шага. Вместо числа можно передать массив значений шагов.",
            table: { type: { summary: "number | number[]" }, defaultValue: { summary: "1" } },
        },
        marks: {
            control: { type: "object" },
            description: "Метки под полосой слайдера.",
            table: { type: { summary: "ISliderMark[]" } },
        },
        size: {
            control: { type: "select" },
            options: [EComponentSize.MD, EComponentSize.LG],
            description: "Размер компонента.",
            table: { type: { summary: "EComponentSize.MD | EComponentSize.LG" } },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Слайдер не активен.",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
        },
        reverse: {
            control: { type: "boolean" },
            description: "Реверсивный слайдер — значения возрастают справа налево.",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof Slider> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Слайдер с метками и шагом по умолчанию." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof Slider> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Размеры MD и LG отличаются диаметром ползунка и размером текста меток." },
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const WithTooltip: StoryObj<typeof Slider> = {
    render: WithTooltipRender,
    parameters: {
        controls: { disable: true },
        // Подсказка скрыта, пока ползунок не в фокусе, — скриншот повторяет стори Default.
        testRunner: { skip: true },
        docs: {
            description: {
                story: "Подсказка над ползунком: renderTooltipContent получает текущее значение и возвращает содержимое.",
            },
            source: {
                code: WithTooltipSource,
                language: "tsx",
            },
        },
    },
};

export const WithCustomSteps: StoryObj<typeof Slider> = {
    name: "With custom steps",
    render: WithCustomStepsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Шаги заданы массивом значений: ползунок останавливается только на них. Первое значение массива равно min, последнее — max.",
            },
            source: {
                code: WithCustomStepsSource,
                language: "tsx",
            },
        },
    },
};

export const Disabled: StoryObj<typeof Slider> = {
    render: DisabledRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Неактивный слайдер: ползунок, трек и метки не реагируют на курсор и клавиатуру." },
            source: {
                code: DisabledSource,
                language: "tsx",
            },
        },
    },
};

export const Reverse: StoryObj<typeof Slider> = {
    render: ReverseRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Реверсивный слайдер: значения возрастают справа налево." },
            source: {
                code: ReverseSource,
                language: "tsx",
            },
        },
    },
};

export const Amounts: StoryObj<typeof Slider> = {
    render: AmountsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Выбор суммы по шкале с неравномерным шагом: слайдер работает с индексами шкалы, поэтому шаги равны визуально.",
            },
            source: {
                code: AmountsSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof Slider> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: async ({ userEvent }) => {
        // Фокус на первом ползунке: видны обводка фокуса и подсказка.
        await userEvent.tab();
    },
};
