import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { Step, EComponentSize, EStepPosition, EStepStatus } from "@sberbusiness/triplex-next";
import {
    IPlaygroundArgs,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Sizes as SizesRender,
    SizesSource,
    Statuses as StatusesRender,
    StatusesSource,
    WithTooltip as WithTooltipRender,
    WithTooltipSource,
    Example as ExampleRender,
    ExampleSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/Step",
    component: Step,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Step — круглый индикатор одного шага: номер внутри кружка и цвет фона по `status`. " +
                    "Компонент неинтерактивный: он рендерит `div` без обработчиков и фокуса и используется как элемент " +
                    "пошаговых сценариев (например, в `IslandAccordion`). " +
                    "Если передан `children`, номер оборачивается в `Tooltip`, раскрывающийся по наведению; " +
                    "`position` в этом случае задаёт выравнивание указателя подсказки по краю ряда шагов.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Step} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof Step>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    step: 2,
    status: EStepStatus.ACTIVE,
    size: EComponentSize.MD,
    position: EStepPosition.Default,
    children: "Заполните реквизиты получателя",
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        step: {
            description: "Номер шага для отображения в кружке.",
            control: "number",
            table: {
                category: "Props",
                type: { summary: "number" },
            },
        },
        status: {
            description: "Статус шага.",
            control: "select",
            options: Object.values(EStepStatus),
            table: {
                category: "Props",
                type: { summary: "EStepStatus" },
            },
        },
        size: {
            description: "Размер.",
            control: "select",
            options: Object.values(EComponentSize),
            table: {
                category: "Props",
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        position: {
            description: "Позиция шага относительно других. Задаёт выравнивание указателя подсказки.",
            control: "select",
            options: Object.values(EStepPosition),
            table: {
                category: "Props",
                type: { summary: "EStepPosition" },
                defaultValue: { summary: "EStepPosition.Default" },
            },
        },
        children: {
            description: "Текст подсказки. Пустая строка — шаг рендерится без подсказки.",
            control: "text",
            table: { category: "Props" },
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

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Минимальный шаг: обязательны только `step` и `status`. Размер по умолчанию — `EComponentSize.MD`.",
            },
            source: { code: DefaultSource, language: "tsx" },
        },
        // Состояние MD + DEFAULT уже покрыто Statuses и VisualTests — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const Sizes: Story = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "SM и MD дают кружок 28px, LG — 32px. На экранах до SM включительно LG сжимается до 28px.",
            },
            source: { code: SizesSource, language: "tsx" },
        },
    },
};

export const Statuses: Story = {
    render: StatusesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Статус задаёт только цвет фона и цвет номера — размер и типографика от него не зависят.",
            },
            source: { code: StatusesSource, language: "tsx" },
        },
    },
};

export const WithTooltip: Story = {
    name: "With tooltip",
    render: WithTooltipRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Переданный `children` становится содержимым подсказки: она раскрывается по наведению на кружок.",
            },
            source: { code: WithTooltipSource, language: "tsx" },
        },
        // Подсказка видна только по наведению — закрытое состояние дублирует Statuses, открытое снимается в Visual tests.
        testRunner: { skip: true },
    },
};

export const Example: Story = {
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story:
                    "Ряд шагов платёжного сценария. `position` для каждого шага вычисляет `calcPosition`: " +
                    "у крайних шагов указатель подсказки прижимается к краю, чтобы подсказка не выходила за границы ряда.",
            },
            source: { code: ExampleSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: async ({ canvas, userEvent }) => {
        // Раскрытая подсказка — единственное состояние Step, требующее взаимодействия.
        // Клик, а не hover: на xs (≤ SM_MAX) рендерится TooltipMobile, у которого hover-слушателей нет.
        // На десктопе клик тоже открывает подсказку — он несёт mouseover, а повторно закрыть её не даёт
        // проверка targetHoveredRef в TooltipTarget.
        await userEvent.click(await canvas.findByTestId("step-with-tooltip"));
    },
};
