import React, { useMemo, useState } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { ButtonDropdown, IButtonDropdownOption } from "../../src/components/Button/ButtonDropdown";
import { EButtonTheme, EButtonDotsTheme } from "../../src/components/Button/enums";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import "./ButtonDropdown.less";

export default {
    title: "Components/Buttons/ButtonDropdown",
    component: ButtonDropdown,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент кнопки с выпадающим списком действий.

## Особенности

- **Темы**: General, Secondary, SecondaryLight, Danger
- **Размеры**: small (SM), medium (MD), large (LG)
- **Состояния**: disabled, block
- **Доступность**: ARIA-атрибуты, поддержка клавиатурной навигации
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
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация ButtonDropdown с контролами.",
            },
        },
        controls: {
            include: ["children", "theme", "size", "block", "disabled"],
        },
    },
};

export const Default: StoryObj<typeof ButtonDropdown> = {
    name: "Default",
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div style={{ width: 280 }}>
                <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const SecondaryTheme: StoryObj<typeof ButtonDropdown> = {
    name: "Secondary Theme",
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EComponentSize.SM} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EComponentSize.LG} options={options}>
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

export const SecondaryLightTheme: StoryObj<typeof ButtonDropdown> = {
    name: "Secondary Light Theme",
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div className="button-dropdown-example">
                <ButtonDropdown theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.SM} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.LG} options={options}>
                    Button text
                </ButtonDropdown>
            </div>
        );
    },
    parameters: {
        docs: {
            description: { story: "Кнопка с темой Secondary Light в трёх размерах" },
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
                <ButtonDropdown theme={EButtonTheme.DANGER} size={EComponentSize.SM} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonTheme.DANGER} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonTheme.DANGER} size={EComponentSize.LG} options={options}>
                    Button text
                </ButtonDropdown>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const DotsTheme: StoryObj<typeof ButtonDropdown> = {
    name: "Dots Theme",
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <ButtonDropdown theme={EButtonDotsTheme.DOTS_SECONDARY} size={EComponentSize.SM} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonDotsTheme.DOTS_SECONDARY} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown theme={EButtonDotsTheme.DOTS_SECONDARY} size={EComponentSize.LG} options={options}>
                    Button text
                </ButtonDropdown>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const DotsLightTheme: StoryObj<typeof ButtonDropdown> = {
    name: "Dots Light Theme",
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div className="button-dropdown-example-dots">
                <ButtonDropdown
                    theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                    size={EComponentSize.SM}
                    options={options}
                >
                    Button text
                </ButtonDropdown>
                <ButtonDropdown
                    theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                    size={EComponentSize.MD}
                    options={options}
                >
                    Button text
                </ButtonDropdown>
                <ButtonDropdown
                    theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                    size={EComponentSize.LG}
                    options={options}
                >
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
                <ButtonDropdown block theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
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
                <ButtonDropdown disabled theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown disabled theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown
                    disabled
                    theme={EButtonTheme.SECONDARY_LIGHT}
                    size={EComponentSize.MD}
                    options={options}
                >
                    Button text
                </ButtonDropdown>
                <ButtonDropdown disabled theme={EButtonTheme.DANGER} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown
                    disabled
                    theme={EButtonDotsTheme.DOTS_SECONDARY}
                    size={EComponentSize.MD}
                    options={options}
                >
                    Button text
                </ButtonDropdown>
                <ButtonDropdown
                    disabled
                    theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                    size={EComponentSize.MD}
                    options={options}
                >
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
                <ButtonDropdown
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.MD}
                    options={options}
                    selected={selected}
                >
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
