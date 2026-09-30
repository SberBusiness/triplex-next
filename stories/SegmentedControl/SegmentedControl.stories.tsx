import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import {
    SegmentedControl,
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
} from "@sberbusiness/triplex-next";
import {
    type PlaygroundArgs,
    PlaygroundRender,
    PlaygroundSource,
    DefaultRender,
    DefaultSource,
    TypesRender,
    TypesSource,
    ThemesRender,
    ThemesSource,
    SizesRender,
    SizesSource,
    DisabledRender,
    DisabledSource,
    ExampleRender,
    ExampleSource,
    VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/SegmentedControl",
    component: SegmentedControl,
    tags: ["autodocs"],
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "SegmentedControl — набор сегментов для выбора одного (`type: SINGLE`) или нескольких " +
                    "(`type: MULTIPLE`) вариантов. Компонент управляемый: выбранное значение приходит в `value`, " +
                    "а новое значение возвращается через `onSelect` — при SINGLE это значение нажатого сегмента, " +
                    "при MULTIPLE — новый массив выбранных значений. Сами сегменты передаются как `children` " +
                    "через `SegmentedControl.Segment`.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SegmentedControl} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    type: ESegmentedControlType.SINGLE,
    theme: ESegmentedControlTheme.GENERAL_1,
    size: ESegmentedControlSize.LG,
    disabled: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        type: {
            description: "Тип выбора элементов.",
            control: "select",
            options: Object.values(ESegmentedControlType),
            table: {
                category: "Props",
                type: { summary: "ESegmentedControlType" },
            },
        },
        theme: {
            description: "Визуальный стиль сегментов.",
            control: "select",
            options: Object.values(ESegmentedControlTheme),
            table: {
                category: "Props",
                type: { summary: "ESegmentedControlTheme" },
            },
        },
        size: {
            description: "Размер сегментов.",
            control: "select",
            options: Object.values(ESegmentedControlSize),
            table: {
                category: "Props",
                type: { summary: "ESegmentedControlSize" },
            },
        },
        disabled: {
            description: "Неактивное состояние. Блокирует все сегменты.",
            control: "boolean",
            table: {
                category: "Props",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
            source: {
                code: PlaygroundSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        // Визуально дублирует блок SINGLE в story Types.
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

export const Types: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: TypesSource,
                language: "tsx",
            },
        },
    },
    render: TypesRender,
};

export const Themes: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ThemesSource,
                language: "tsx",
            },
        },
    },
    render: ThemesRender,
};

export const Sizes: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
    render: SizesRender,
};

export const Disabled: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DisabledSource,
                language: "tsx",
            },
        },
    },
    render: DisabledRender,
};

export const Example: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
        // Сегменты только с иконкой покрыты отдельным блоком в VisualTests (в теме SECONDARY_1).
        testRunner: { skip: true },
    },
    render: ExampleRender,
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
    play: async ({ canvasElement, userEvent }) => {
        // Фокус уходит на первый сегмент первого контрола — снимается состояние :focus-visible.
        await userEvent.click(canvasElement);
        await userEvent.tab();
    },
};
