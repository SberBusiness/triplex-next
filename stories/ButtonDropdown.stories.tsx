import React, { useMemo, useState } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { ButtonDropdown, IButtonDropdownOption } from "../src/components/Button/ButtonDropdown";
import { EButtonSize, EButtonTheme } from "../src/components/Button/enums";

export default {
    title: "Components/Button/ButtonDropdown",
    component: ButtonDropdown,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент кнопки с выпадающим списком действий.

## Особенности

- **Темы**: General, Secondary, Danger
- **Размеры**: small (SM), medium (MD), large (LG)
- **Состояния**: disabled, block
- **Доступность**: ARIA-атрибуты, поддержка клавиатурной навигации

## Использование

\`\`\`tsx
<ButtonDropdown
    theme={EButtonTheme.GENERAL}
    size={EButtonSize.MD}
    options=[{ id: '1', label: 'Action' }]
>
    Действия
</ButtonDropdown>
\`\`\`
                `,
            },
        },
    },
};

const createOptions = (onItemSelect?: (id: string) => void): IButtonDropdownOption[] => [
    {
        id: "opt-1",
        label: "Действие 1",
        onSelect: () => {
            action("select")("opt-1");
            onItemSelect?.("opt-1");
        },
    },
    {
        id: "opt-2",
        label: "Действие 2",
        onSelect: () => {
            action("select")("opt-2");
            onItemSelect?.("opt-2");
        },
    },
    {
        id: "opt-3",
        label: "Действие 3",
        onSelect: () => {
            action("select")("opt-3");
            onItemSelect?.("opt-3");
        },
    },
];

type IButtonDropdownWithControlsProps = React.ComponentProps<typeof ButtonDropdown>;

export const Playground: StoryObj<IButtonDropdownWithControlsProps> = {
    render: (args) => {
        const options = useMemo(() => createOptions(), []);
        const { children, ...rest } = args;
        return (
            <div style={{ width: 280 }}>
                <ButtonDropdown {...rest} options={options}>
                    {children}
                </ButtonDropdown>
            </div>
        );
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Название кнопки",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        theme: {
            control: { type: "select" },
            options: Object.values(EButtonTheme),
            description: "Тема кнопки",
        },
        size: {
            control: { type: "select" },
            options: Object.values(EButtonSize),
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
        size: EButtonSize.MD,
        children: "Button text",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация ButtonDropdown с контролами.",
            },
        },
    },
};

export const SecondaryTheme: StoryObj<typeof ButtonDropdown> = {
    name: "Secondary Theme",
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EButtonSize.SM} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EButtonSize.LG} options={options}>
                    Button text
                </ButtonDropdown>
            </div>
        );
    },
    parameters: {
        docs: {
            description: { story: "Кнопка с темой Secondary в трёх размерах" },
        },
        controls: { disable: true },
    },
};

export const DangerTheme: StoryObj<typeof ButtonDropdown> = {
    name: "Danger Theme",
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <ButtonDropdown theme={EButtonTheme.DANGER} size={EButtonSize.SM} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonTheme.DANGER} size={EButtonSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonTheme.DANGER} size={EButtonSize.LG} options={options}>
                    Button text
                </ButtonDropdown>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const Block: StoryObj<typeof ButtonDropdown> = {
    name: "Block",
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div style={{ maxWidth: 280 }}>
                <ButtonDropdown block theme={EButtonTheme.GENERAL} size={EButtonSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
            </div>
        );
    },
    parameters: {
        docs: {
            description: { story: "Кнопка занимает всю доступную ширину контейнера" },
        },
        controls: { disable: true },
    },
};

export const Disabled: StoryObj<typeof ButtonDropdown> = {
    name: "Disabled",
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <ButtonDropdown disabled theme={EButtonTheme.GENERAL} size={EButtonSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown disabled theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown disabled theme={EButtonTheme.DANGER} size={EButtonSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
            </div>
        );
    },
    parameters: {
        docs: {
            description: { story: "Примеры в состоянии disabled" },
        },
        controls: { disable: true },
    },
};

export const WithSelected: StoryObj<typeof ButtonDropdown> = {
    name: "With Selected Option",
    render: () => {
        const [selectedId, setSelectedId] = useState<string | undefined>("opt-2");
        const options = useMemo(() => createOptions(setSelectedId), []);
        const selected = options.find((o) => o.id === selectedId);

        return (
            <div style={{ maxWidth: 280 }}>
                <ButtonDropdown theme={EButtonTheme.GENERAL} size={EButtonSize.MD} options={options} selected={selected}>
                    Button text
                </ButtonDropdown>
            </div>
        );
    },
    parameters: {
        docs: {
            description: { story: "Контролируемый пример с выбранным значением" },
        },
        controls: { disable: true },
    },
};


