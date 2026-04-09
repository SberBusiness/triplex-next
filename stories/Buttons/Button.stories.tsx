import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
    Title as DocsTitle,
    Description,
    Primary,
    Controls,
    Stories,
    ArgTypes,
    Heading,
} from "@storybook/addon-docs/blocks";
import { Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";
import {
    BlockModeExample,
    BlockModeExampleSource,
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    StatesExample,
    StatesExampleSource,
    TextWithIconExample,
    TextWithIconExampleSource,
    ThemesExample,
    ThemesExampleSource,
    WithIconExample,
    WithIconExampleSource,
} from "./examples/Button";

const meta = {
    title: "Components/Buttons/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент-кнопка.

## Особенности

- Можно использовать в строчном или блочном (свойство block) режиме.
- Передать иконку можно через свойство icon.
                `,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Button} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        children: "Button text",
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
        block: false,
        loading: false,
    },
    argTypes: {
        theme: {
            control: { type: "select" },
            options: Object.values(EButtonTheme),
            description: "Тема кнопки",
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер кнопки",
            table: {
                defaultValue: { summary: EComponentSize.MD },
            },
        },
        block: {
            control: { type: "boolean" },
            description: "Блочный режим",
            table: {
                type: { summary: "boolean" },
            },
        },
        loading: {
            control: { type: "boolean" },
            description: "Режим загрузки",
            table: {
                type: { summary: "boolean" },
            },
        },
        children: {
            control: { type: "text" },
            description: "Контент кнопки",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["theme", "size", "block", "loading", "children"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: (args) => (
        <div style={{ width: "250px" }}>
            <Button {...args} />
        </div>
    ),
};

export const Default: StoryObj<typeof Button> = {
    args: {
        children: "Button text",
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
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

export const States: Story = {
    args: {
        children: "Button text",
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
    },
    render: StatesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: StatesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: Story = {
    args: {
        children: "Button text",
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
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
        children: "Button text",
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
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

export const WithIcon: Story = {
    args: {
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
    },
    render: WithIconExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Кнопка с иконкой, переданной через свойство icon.",
            },
            source: {
                code: WithIconExampleSource,
                language: "tsx",
            },
        },
    },
};

export const BlockMode: Story = {
    args: {
        children: "General",
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
        block: true,
    },
    render: BlockModeExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Кнопка в блочном режиме (свойство block).",
            },
            source: {
                code: BlockModeExampleSource,
                language: "tsx",
            },
        },
    },
};

export const TextWithIcon: Story = {
    args: {
        children: "Button text",
        theme: EButtonTheme.LINK,
        size: EComponentSize.MD,
    },
    render: TextWithIconExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Контент кнопки состоит из текста и иконки (свойство icon).",
            },
            source: {
                code: TextWithIconExampleSource,
                language: "tsx",
            },
        },
    },
};
