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
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Buttons/ButtonIcon",
    component: ButtonIcon,
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
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
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
    parameters: {
        controls: {
            include: ["shape", "active", "disabled"],
        },
    },
    render: (args) => (
        <ButtonIcon {...args}>
            <DefaulticonStrokePrdIcon32 paletteIndex={5} />
        </ButtonIcon>
    ),
};

export const Default: StoryObj<typeof ButtonIcon> = {
    render: () => (
        <ButtonIcon>
            <DefaulticonStrokePrdIcon32 paletteIndex={5} />
        </ButtonIcon>
    ),
    parameters: {
        controls: { disable: true },
    },
};

export const DifferentSizes: StoryObj<typeof ButtonIcon> = {
    parameters: {
        docs: {
            description: {
                story: "Кнопка-иконка разных размеров (16, 20, 24, 32)",
            },
        },
        controls: { disable: true },
    },
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ButtonIcon>
                <DefaulticonStrokePrdIcon16 paletteIndex={5} />
            </ButtonIcon>
            <ButtonIcon>
                <DefaulticonStrokePrdIcon20 paletteIndex={5} />
            </ButtonIcon>
            <ButtonIcon>
                <DefaulticonStrokePrdIcon24 paletteIndex={5} />
            </ButtonIcon>
            <ButtonIcon>
                <DefaulticonStrokePrdIcon32 paletteIndex={5} />
            </ButtonIcon>
        </div>
    ),
};

export const Disabled: StoryObj<typeof ButtonIcon> = {
    parameters: {
        docs: {
            description: {
                story: "Кнопка-иконка в состоянии disabled",
            },
        },
        controls: { disable: true },
    },
    render: () => (
        <ButtonIcon disabled>
            <DefaulticonStrokePrdIcon32 paletteIndex={5} />
        </ButtonIcon>
    ),
};
