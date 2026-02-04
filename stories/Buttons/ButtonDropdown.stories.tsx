import React, { useMemo, useState } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { ButtonDropdown, IButtonDropdownOption } from "../../src/components/Button/ButtonDropdown";
import { EButtonTheme, EButtonDotsTheme } from "../../src/components/Button/enums";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Title, Description, Primary, Controls, Stories, ArgTypes } from "@storybook/addon-docs/blocks";
import "./ButtonDropdown.less";
import { Gap } from "../../src/components/Gap/Gap";

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
                    <h2>Props</h2>
                    <ArgTypes of={ButtonDropdown} />
                    <h2>Playground</h2>
                    <Primary />
                    <Controls of={Playground} />
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

export const Playground: StoryObj<typeof ButtonDropdown> = {
    tags: ["!autodocs"],
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
        block: false,
        disabled: false,
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация ButtonDropdown с контролами.",
            },
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        controls: {
            include: ["children", "theme", "size", "block", "disabled"],
        },
    },
};

export const Default: StoryObj<typeof ButtonDropdown> = {
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

export const Sizes: StoryObj<typeof ButtonDropdown> = {
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <ButtonDropdown size={EComponentSize.SM} theme={EButtonTheme.GENERAL} options={options}>
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown size={EComponentSize.MD} theme={EButtonTheme.GENERAL} options={options}>
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown size={EComponentSize.LG} theme={EButtonTheme.GENERAL} options={options}>
                        Button text
                    </ButtonDropdown>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <ButtonDropdown size={EComponentSize.SM} theme={EButtonTheme.SECONDARY} options={options}>
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown size={EComponentSize.MD} theme={EButtonTheme.SECONDARY} options={options}>
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown size={EComponentSize.LG} theme={EButtonTheme.SECONDARY} options={options}>
                        Button text
                    </ButtonDropdown>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <ButtonDropdown size={EComponentSize.SM} theme={EButtonTheme.SECONDARY_LIGHT} options={options}>
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown size={EComponentSize.MD} theme={EButtonTheme.SECONDARY_LIGHT} options={options}>
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown size={EComponentSize.LG} theme={EButtonTheme.SECONDARY_LIGHT} options={options}>
                        Button text
                    </ButtonDropdown>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <ButtonDropdown size={EComponentSize.SM} theme={EButtonTheme.DANGER} options={options}>
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown size={EComponentSize.MD} theme={EButtonTheme.DANGER} options={options}>
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown size={EComponentSize.LG} theme={EButtonTheme.DANGER} options={options}>
                        Button text
                    </ButtonDropdown>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 54 }}>
                    <ButtonDropdown size={EComponentSize.SM} theme={EButtonDotsTheme.DOTS_SECONDARY} options={options}>
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown size={EComponentSize.MD} theme={EButtonDotsTheme.DOTS_SECONDARY} options={options}>
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown size={EComponentSize.LG} theme={EButtonDotsTheme.DOTS_SECONDARY} options={options}>
                        Button text
                    </ButtonDropdown>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 54 }}>
                    <ButtonDropdown
                        size={EComponentSize.SM}
                        theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                        options={options}
                    >
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown
                        size={EComponentSize.MD}
                        theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                        options={options}
                    >
                        Button text
                    </ButtonDropdown>
                    <ButtonDropdown
                        size={EComponentSize.LG}
                        theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                        options={options}
                    >
                        Button text
                    </ButtonDropdown>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Доступные размеры кнопок",
            },
        },
        controls: { disable: true },
    },
};

export const Themes: StoryObj<typeof ButtonDropdown> = {
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                        General
                    </ButtonDropdown>
                    <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} options={options}>
                        Secondary
                    </ButtonDropdown>
                    <ButtonDropdown theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD} options={options}>
                        Secondary Light
                    </ButtonDropdown>
                    <ButtonDropdown theme={EButtonTheme.DANGER} size={EComponentSize.MD} options={options}>
                        Danger
                    </ButtonDropdown>
                    <ButtonDropdown theme={EButtonTheme.LINK} size={EComponentSize.MD} options={options}>
                        Link
                    </ButtonDropdown>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <ButtonDropdown theme={EButtonDotsTheme.DOTS_SECONDARY} size={EComponentSize.MD} options={options}>
                        Dots Secondary
                    </ButtonDropdown>
                    <ButtonDropdown
                        theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                        size={EComponentSize.MD}
                        options={options}
                    >
                        Dots Secondary Light
                    </ButtonDropdown>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Доступные темы кнопок",
            },
        },
        controls: { disable: true },
    },
};

export const BlockMode: StoryObj<typeof ButtonDropdown> = {
    render: () => {
        const options = useMemo(() => createOptions(), []);
        return (
            <>
                <ButtonDropdown block theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <Gap size={16} />
                <ButtonDropdown block theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <Gap size={16} />
                <ButtonDropdown block theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
                <Gap size={16} />
                <ButtonDropdown block theme={EButtonTheme.DANGER} size={EComponentSize.MD} options={options}>
                    Button text
                </ButtonDropdown>
            </>
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

export const WithSelectedOption: StoryObj<typeof ButtonDropdown> = {
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
            description: { story: "Кнопка с заранее выбранным в выпадающем списке значением" },
        },
        controls: { disable: true },
    },
};
