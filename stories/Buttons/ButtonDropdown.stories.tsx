import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ButtonDropdown, EButtonDotsTheme, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import {
    BlockModeExample,
    BlockModeExampleSource,
    DefaultExample,
    DefaultExampleSource,
    PlaygroundExample,
    DisabledExample,
    DisabledExampleSource,
    SizesExample,
    SizesExampleSource,
    ThemesExample,
    ThemesExampleSource,
    WithSelectedOptionExample,
    WithSelectedOptionExampleSource,
    VisualTestsExample,
} from "./examples/ButtonDropdown/index";

const meta = {
    title: "Components/Buttons/ButtonDropdown",
    component: ButtonDropdown,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент-кнопка с выпадающим списком действий.

## Особенности

- Можно использовать в строчном или блочном (свойство block) режиме.
- Можно использовать как обычную кнопку (**EButtonTheme**) либо как кнопку-dots (**EButtonDotsTheme**).
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ButtonDropdown} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ButtonDropdown>;

export default meta;

type Story = StoryObj<typeof ButtonDropdown>;

export const Playground: Story = {
    tags: ["!autodocs"],
    render: PlaygroundExample,
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Контент кнопки",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        theme: {
            control: { type: "select" },
            options: [...Object.values(EButtonTheme), ...Object.values(EButtonDotsTheme)],
            description: "Тема кнопки",
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер кнопки",
        },
        block: {
            control: { type: "boolean" },
            description: "Блочный режим",
        },
        disabled: {
            control: { type: "boolean" },
            description: "Отключенное состояние",
        },
        options: { table: { disable: true } },
        selected: { table: { disable: true } },
        buttonAttributes: { table: { disable: true } },
    },
    args: {
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
        children: "Button text",
        block: false,
        disabled: false,
    },
    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        controls: {
            include: ["children", "theme", "size", "block", "disabled"],
        },
        testRunner: { skip: true },
    },
};

export const Default: StoryObj<typeof ButtonDropdown> = {
    args: {
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
        children: "Button text",
    },
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: Story = {
    args: {
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
        children: "Button text",
    },
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Themes: Story = {
    args: {
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
        children: "Button text",
    },
    render: ThemesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ThemesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const BlockMode: Story = {
    args: {
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
        children: "Button text",
        block: true,
    },
    render: BlockModeExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Кнопка в блочном режиме (свойство block)." },
            source: {
                code: BlockModeExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Disabled: Story = {
    args: {
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
        children: "Button text",
        disabled: true,
    },
    render: DisabledExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DisabledExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithSelectedOption: Story = {
    args: {
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
        children: "Button text",
    },
    render: WithSelectedOptionExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Кнопка с заранее выбранным в выпадающем списке значением." },
            source: {
                code: WithSelectedOptionExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    render: VisualTestsExample,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
};
