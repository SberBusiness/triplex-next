import React from "react";
import { Button } from "../src/components/Button";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { Gap } from "../src/components/Gap";
import { DefaulticonPrdIcon20 } from "@sberbusiness/icons/DefaulticonPrdIcon20";
import { DefaulticonPrdIcon32 } from "@sberbusiness/icons/DefaulticonPrdIcon32";
import { EButtonTheme, EButtonSize } from "../src/components/Button/enums";

export default {
    title: "Components/Button",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент кнопки с различными темами, размерами и состояниями.

## Особенности

- **Темы**: General, Secondary, Danger, Link
- **Размеры**: small (SM), medium (MD), large (LG)
- **Состояния**: disabled, loading
- **Режимы**: обычный, блочный (block)
- **Доступность**: поддержка ARIA атрибутов и клавиатурной навигации

## Использование

\`\`\`tsx
import { Button, EButtonTheme, EButtonSize } from '@sberbusiness/triplex-next';

// Основная кнопка
<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={handleClick}>
    Click me
</Button>

// Кнопка в состоянии загрузки
<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} loading>
    Click me
</Button>

// Кнопка в состоянии disabled
<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} disabled>
    Click me
</Button>

// Кнопка в блочном режиме
<Button theme={EButtonTheme.SECONDARY} size={EButtonSize.LG} block>
    Click me
</Button>
\`\`\`
                `,
            },
        },
    },
};

export const Default: StoryObj<typeof Button> = {
    name: "Default",
    args: {
        children: "Button text",
        onClick: action("On Click"),
        theme: EButtonTheme.GENERAL,
        size: EButtonSize.MD,
    },
    argTypes: {
        theme: {
            control: { type: "select" },
            options: Object.values(EButtonTheme),
            description: "Тема кнопки",
        },
        size: {
            control: { type: "select" },
            options: Object.values(EButtonSize),
            description: "Размер кнопки",
            table: {
                defaultValue: { summary: EButtonSize.MD },
            },
        },
        borderRadius: {
            control: { type: "number" },
            description: "Радиус скругления кнопки",
            table: {
                type: { summary: "number" },
                defaultValue: { summary: "lg=10 md=8 sm=6" },
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
        onClick: {
            table: {
                disable: true,
            },
        },
    },

    render: (args) => <Button {...args} />,
};

export const DifferentThemes: StoryObj<typeof Button> = {
    name: "Different Themes",
    render: () => {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    General
                </Button>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                    Secondary
                </Button>
                <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD}>
                    Danger
                </Button>
                <Button theme={EButtonTheme.LINK} size={EButtonSize.MD}>
                    Link
                </Button>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Тема кнопки",
            },
        },
    },
};

export const Icon: StoryObj<typeof Button> = {
    name: "Icon",
    args: {
        icon: <DefaulticonPrdIcon20 />,
    },
    argTypes: {
        icon: { table: { disable: true } },
    },
    render: (args) => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button icon={args.icon} size={EButtonSize.SM} theme={EButtonTheme.GENERAL} />
            <Button icon={args.icon} size={EButtonSize.MD} theme={EButtonTheme.SECONDARY} />
            <Button icon={<DefaulticonPrdIcon32 />} size={EButtonSize.LG} theme={EButtonTheme.DANGER} />
        </div>
    ),
};

export const DifferentSizes: StoryObj<typeof Button> = {
    name: "Different Sizes",
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button size={EButtonSize.SM} theme={EButtonTheme.GENERAL}>
                Size small
            </Button>
            <Button size={EButtonSize.MD} theme={EButtonTheme.GENERAL}>
                Size medium
            </Button>
            <Button size={EButtonSize.LG} theme={EButtonTheme.GENERAL}>
                Size large
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Размер кнопки",
            },
        },
    },
};

export const BlockMode: StoryObj<typeof Button> = {
    name: "Block mode",
    render: () => (
        <div style={{ width: "250px" }}>
            <Button block theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                Button text
            </Button>
            <Gap size={16} />
            <Button block theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button text
            </Button>
            <Gap size={16} />
            <Button block icon={<DefaulticonPrdIcon20 />} size={EButtonSize.SM} theme={EButtonTheme.DANGER} />
        </div>
    ),
};

export const Disabled: StoryObj<typeof Button> = {
    name: "Disabled",
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button disabled theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                Button text
            </Button>
            <Button disabled theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button text
            </Button>
            <Button disabled theme={EButtonTheme.DANGER} size={EButtonSize.MD}>
                Button text
            </Button>
            <Button disabled theme={EButtonTheme.LINK} size={EButtonSize.MD}>
                Button text
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка в состоянии disabled",
            },
        },
    },
};

export const Loading: StoryObj<typeof Button> = {
    name: "Loading",
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button loading theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                Button text
            </Button>
            <Button loading theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button text
            </Button>
            <Button loading theme={EButtonTheme.DANGER} size={EButtonSize.MD}>
                Button text
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка в состоянии loading",
            },
        },
    },
};
