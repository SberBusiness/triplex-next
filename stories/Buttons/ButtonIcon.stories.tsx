import React from "react";
import { ButtonIcon } from "../../src/components/Button/ButtonIcon";
import { EButtonIconShape } from "../../src/components/Button/enums";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import {
    DefaulticonStrokePrdIcon16,
    DefaulticonStrokePrdIcon20,
    DefaulticonStrokePrdIcon24,
    DefaulticonStrokePrdIcon32,
} from "@sberbusiness/icons-next";

export default {
    title: "Components/Buttons/ButtonIcon",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент кнопки-иконки с различными формами и состояниями.

## Особенности

- **Формы**: squircle, circle
- **Состояния**: active, disabled

## Использование

\`\`\`tsx
import { ButtonIcon, EButtonIconShape } from '@sberbusiness/triplex-next';

// Кнопка-иконка формы squircle (по умолчанию)
<ButtonIcon onClick={handleClick}>
    <DefaulticonStrokePrdIcon32 paletteIndex={5} />
</ButtonIcon>

// Круглая кнопка-иконка
<ButtonIcon shape={EButtonIconShape.CIRCLE} onClick={handleClick}>
    <DefaulticonStrokePrdIcon32 paletteIndex={5} />
</ButtonIcon>

// Кнопка-иконка в состоянии active
<ButtonIcon active onClick={handleClick}>
    <DefaulticonStrokePrdIcon32 paletteIndex={5} />
</ButtonIcon>

// Кнопка-иконка в состоянии disabled
<ButtonIcon disabled onClick={handleClick}>
    <DefaulticonStrokePrdIcon32 paletteIndex={5} />
</ButtonIcon>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        shape: {
            control: { type: "select" },
            options: [EButtonIconShape.CIRCLE, EButtonIconShape.SQUIRCLE],
            description: "Форма границы кнопки",
            table: {
                type: { summary: "EButtonIconShape" },
                defaultValue: { summary: EButtonIconShape.SQUIRCLE },
            },
        },
        active: {
            control: { type: "boolean" },
            description: "Активное состояние",
            table: {
                type: { summary: "boolean" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Отключенное состояние",
            table: {
                type: { summary: "boolean" },
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
    },
};

export const Playground: StoryObj<typeof ButtonIcon> = {
    args: {
        active: false,
        disabled: false,
        shape: EButtonIconShape.SQUIRCLE,
        onClick: action("On Click"),
    },
    argTypes: {
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <ButtonIcon {...args}>
            <DefaulticonStrokePrdIcon32 paletteIndex={5} />
        </ButtonIcon>
    ),
};

export const DifferentSizes: StoryObj<typeof ButtonIcon> = {
    args: {
        shape: EButtonIconShape.SQUIRCLE,
    },
    argTypes: {
        shape: {
            control: { type: "select" },
            options: Object.values(EButtonIconShape),
            table: {
                type: { summary: "EButtonIconShape" },
                defaultValue: { summary: EButtonIconShape.SQUIRCLE },
            },
        },
        active: {
            table: {
                disable: true,
            },
        },
        disabled: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Кнопка-иконка разных размеров (16, 20, 24, 32)",
            },
        },
    },
    render: (args) => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ButtonIcon shape={args.shape}>
                <DefaulticonStrokePrdIcon16 paletteIndex={5} />
            </ButtonIcon>
            <ButtonIcon shape={args.shape}>
                <DefaulticonStrokePrdIcon20 paletteIndex={5} />
            </ButtonIcon>
            <ButtonIcon shape={args.shape}>
                <DefaulticonStrokePrdIcon24 paletteIndex={5} />
            </ButtonIcon>
            <ButtonIcon shape={args.shape}>
                <DefaulticonStrokePrdIcon32 paletteIndex={5} />
            </ButtonIcon>
        </div>
    ),
};

export const Disabled: StoryObj<typeof ButtonIcon> = {
    args: {
        disabled: true,
    },
    argTypes: {
        disabled: {
            table: {
                disable: true,
            },
        },
        active: {
            table: {
                disable: true,
            },
        },
        shape: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Кнопка-иконка в состоянии disabled",
            },
        },
    },
    render: () => (
        <ButtonIcon disabled>
            <DefaulticonStrokePrdIcon32 paletteIndex={5} />
        </ButtonIcon>
    ),
};
