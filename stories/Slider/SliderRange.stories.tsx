import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { EComponentSize, ISliderRangeProps, SliderRange } from "@sberbusiness/triplex-next";
import {
    Amounts as AmountsRender,
    AmountsSource,
    Default as DefaultRender,
    DefaultSource,
    Disabled as DisabledRender,
    DisabledSource,
    NonDraggableTrack as NonDraggableTrackRender,
    NonDraggableTrackSource,
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
} from "./examples/SliderRange";

const meta = {
    title: "Components/Slider/SliderRange",
    component: SliderRange,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Слайдер с двумя ползунками — готовая сборка **SliderExtended** для выбора диапазона: полоса, два ползунка, трек между ними и метки.

Компонент двигает ползунки сам и сообщает новую пару через **onChange**; **values** задаёт значения при монтировании и перезаписывает их, когда потребитель присылает новую пару. Обновляй **values** в **onChange**, иначе показанный диапазон разойдётся с состоянием потребителя. Наружу пара всегда уходит отсортированной, даже если ползунки поменялись местами.

Трек между ползунками по умолчанию перетаскивается целиком и сдвигает оба ползунка; это отключается через **draggableTrack**.

Если нужен один ползунок — возьми **Slider**, а если нестандартный состав частей — собери его из **SliderExtended**.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SliderRange} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SliderRange>;

export default meta;

const PLAYGROUND_ARGS: Omit<ISliderRangeProps, "onChange" | "values"> = {
    disabled: false,
    draggableTrack: true,
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

export const Playground: StoryObj<ISliderRangeProps> = {
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
            table: { type: { summary: "ISliderRangeMark[]" } },
        },
        size: {
            control: { type: "select" },
            options: [EComponentSize.MD, EComponentSize.LG],
            description: "Размер компонента.",
            table: { type: { summary: "EComponentSize.MD | EComponentSize.LG" } },
        },
        draggableTrack: {
            control: { type: "boolean" },
            description: "Трек между ползунками можно передвигать целиком.",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
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

export const Default: StoryObj<typeof SliderRange> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Диапазон с метками и шагом по умолчанию." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof SliderRange> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Размеры MD и LG отличаются диаметром ползунков и размером текста меток." },
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const WithTooltip: StoryObj<typeof SliderRange> = {
    name: "With Tooltip",
    render: WithTooltipRender,
    parameters: {
        controls: { disable: true },
        // Подсказки скрыты, пока ползунок не в фокусе, — состояние с подсказкой снимает стори VisualTests.
        testRunner: { skip: true },
        docs: {
            description: {
                story: "Подсказки над ползунками: renderTooltipContent получает значение ползунка и возвращает содержимое.",
            },
            source: {
                code: WithTooltipSource,
                language: "tsx",
            },
        },
    },
};

export const WithCustomSteps: StoryObj<typeof SliderRange> = {
    name: "With custom steps",
    render: WithCustomStepsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Шаги заданы массивом значений: ползунки останавливаются только на них. Первое значение массива равно min, последнее — max.",
            },
            source: {
                code: WithCustomStepsSource,
                language: "tsx",
            },
        },
    },
};

export const NonDraggableTrack: StoryObj<typeof SliderRange> = {
    name: "Non-draggable Track",
    render: NonDraggableTrackRender,
    parameters: {
        controls: { disable: true },
        // draggableTrack влияет только на перетаскивание и табуляцию трека — в статике стори повторяет Default.
        testRunner: { skip: true },
        docs: {
            description: {
                story: "draggableTrack={false} запрещает перетаскивать трек целиком: диапазон меняется только ползунками.",
            },
            source: {
                code: NonDraggableTrackSource,
                language: "tsx",
            },
        },
    },
};

export const Disabled: StoryObj<typeof SliderRange> = {
    render: DisabledRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Неактивный слайдер: ползунки, трек и метки не реагируют на курсор и выпадают из табуляции.",
            },
            source: {
                code: DisabledSource,
                language: "tsx",
            },
        },
    },
};

export const Reverse: StoryObj<typeof SliderRange> = {
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

export const Amounts: StoryObj<typeof SliderRange> = {
    render: AmountsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Выбор диапазона сумм по шкале с неравномерным шагом: слайдер работает с индексами шкалы, поэтому шаги равны визуально.",
            },
            source: {
                code: AmountsSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof SliderRange> = {
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
        // Фокус на левом ползунке первого слайдера: видны обводка фокуса и подсказка.
        await userEvent.tab();
    },
};
