import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { EComponentSize, ISliderExtendedProps, SliderExtended } from "@sberbusiness/triplex-next";
import {
    Amounts as AmountsRender,
    AmountsSource,
    Default as DefaultRender,
    DefaultSource,
    Disabled as DisabledRender,
    DisabledSource,
    Playground as PlaygroundRender,
    Range as RangeRender,
    RangeSource,
    RangeWithTooltip as RangeWithTooltipRender,
    RangeWithTooltipSource,
    Reverse as ReverseRender,
    ReverseSource,
    Sizes as SizesRender,
    SizesSource,
    VisualTests as VisualTestsRender,
    WithCustomSteps as WithCustomStepsRender,
    WithCustomStepsSource,
    WithoutTooltip as WithoutTooltipRender,
    WithoutTooltipSource,
} from "./examples/SliderExtended";

const meta = {
    title: "Components/Slider/SliderExtended",
    component: SliderExtended,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Слайдер, который собирается из субкомпонентов. Значения ползунков контролирует потребитель.

## Состав

- **SliderExtended.Rail** — полоса слайдера. Клик по ней перемещает ближайший ползунок на ближайший шаг.
- **SliderExtended.Dot** — ползунок, принимает **value** и **onChange**. Слайдер поддерживает один или два ползунка.
- **SliderExtended.Track** — заполненная часть полосы. При двух ползунках перемещается целиком и сдвигает оба (**draggable**).
- **SliderExtended.Marks** и **SliderExtended.Mark** — метки под полосой, клик по метке перемещает ближайший ползунок.
- **SliderExtended.Tooltip** — подсказка над ползунком, видна при фокусе и наведении. Рендерится внутри **SliderExtended.Dot**.

Готовые сборки для типовых случаев — **Slider** (один ползунок) и **SliderRange** (диапазон).
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SliderExtended} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SliderExtended>;

export default meta;

const PLAYGROUND_ARGS: ISliderExtendedProps = {
    disabled: false,
    max: 100,
    min: 0,
    reverse: false,
    size: EComponentSize.MD,
    step: 1,
};

export const Playground: StoryObj<ISliderExtendedProps> = {
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
            table: { type: { summary: "number | number[]" } },
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

export const Default: StoryObj<typeof SliderExtended> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Слайдер с одним ползунком, метками и подсказкой над ползунком." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof SliderExtended> = {
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

export const Range: StoryObj<typeof SliderExtended> = {
    render: RangeRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Два ползунка задают диапазон. Трек между ними можно перетаскивать — оба ползунка сдвигаются вместе.",
            },
            source: {
                code: RangeSource,
                language: "tsx",
            },
        },
    },
};

export const RangeWithTooltip: StoryObj<typeof SliderExtended> = {
    name: "Range with Tooltip",
    render: RangeWithTooltipRender,
    parameters: {
        controls: { disable: true },
        // Подсказки скрыты, пока ползунок не в фокусе, — скриншот повторяет стори Range.
        testRunner: { skip: true },
        docs: {
            description: { story: "Диапазон с подсказкой над каждым ползунком." },
            source: {
                code: RangeWithTooltipSource,
                language: "tsx",
            },
        },
    },
};

export const WithCustomSteps: StoryObj<typeof SliderExtended> = {
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

export const WithoutTooltip: StoryObj<typeof SliderExtended> = {
    render: WithoutTooltipRender,
    parameters: {
        controls: { disable: true },
        // Подсказка скрыта, пока ползунок не в фокусе, — скриншот повторяет стори Default.
        testRunner: { skip: true },
        docs: {
            description: { story: "SliderExtended без подсказки: SliderExtended.Dot рендерится без содержимого." },
            source: {
                code: WithoutTooltipSource,
                language: "tsx",
            },
        },
    },
};

export const Disabled: StoryObj<typeof SliderExtended> = {
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

export const Reverse: StoryObj<typeof SliderExtended> = {
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

export const Amounts: StoryObj<typeof SliderExtended> = {
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

export const VisualTests: StoryObj<typeof SliderExtended> = {
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
