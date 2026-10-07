import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { RadioXGroup, EComponentSize } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    IPlaygroundArgs,
    Default as DefaultRender,
    DefaultSource,
    Indents as IndentsRender,
    IndentsSource,
    RadioSizes as RadioSizesRender,
    RadioSizesSource,
    States as StatesRender,
    StatesSource,
    Wrapping as WrappingRender,
    WrappingSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/RadioXGroup",
    component: RadioXGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Группа Radio с горизонтальным расположением и переносом на следующую строку. " +
                    "Отступ задаётся через indent. Размер, выбранное и отключённое состояния задаются каждому Radio. " +
                    "У Radio одной группы должен быть общий name, а у группы — доступное имя через aria-label или aria-labelledby.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={RadioXGroup} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof RadioXGroup>;

export default meta;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    indent: 12,
    radioSize: EComponentSize.MD,
    disabled: false,
};

type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        indent: {
            control: "select",
            options: [12, 16, 20, 24, 28, 32],
            description: "Горизонтальный отступ между Radio в пикселях.",
            table: {
                category: "Props",
                type: { summary: "12 | 16 | 20 | 24 | 28 | 32" },
                defaultValue: { summary: "12" },
            },
        },
        radioSize: {
            control: "select",
            options: Object.values(EComponentSize),
            description: "Размер дочерних Radio.",
            table: { category: "Settings", defaultValue: { summary: "EComponentSize.MD" } },
        },
        disabled: {
            control: "boolean",
            description: "Отключает дочерние Radio.",
            table: { category: "Settings", defaultValue: { summary: "false" } },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: Story = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultSource, language: "tsx" } },
    },
    render: DefaultRender,
};

export const Indents: Story = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: IndentsSource, language: "tsx" } },
    },
    render: IndentsRender,
};

export const RadioSizes: Story = {
    name: "Radio sizes",
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Размер задаётся каждому дочернему Radio; у RadioXGroup собственного size нет." },
            source: { code: RadioSizesSource, language: "tsx" },
        },
    },
    render: RadioSizesRender,
};

export const States: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Выбранное и отключённое состояния принадлежат дочерним Radio." },
            source: { code: StatesSource, language: "tsx" },
        },
    },
    render: StatesRender,
};

export const Wrapping: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Перенос Radio и длинных подписей в контейнере шириной 320 px." },
            source: { code: WrappingSource, language: "tsx" },
        },
    },
    render: WrappingRender,
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    render: VisualTestsRender,
    play: async ({ canvas, userEvent }) => {
        canvas.getByRole("radiogroup", { name: "Клавиатурный фокус" }).focus();
        await userEvent.tab();
        await userEvent.hover(canvas.getByRole("radio", { name: "Наведение" }));
    },
};
