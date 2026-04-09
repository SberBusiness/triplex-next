import React, { useMemo, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import {
    ButtonDropdown,
    EButtonDotsTheme,
    EButtonTheme,
    EComponentSize,
    EScreenWidth,
    IButtonDropdownOption,
} from "@sberbusiness/triplex-next";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import {
    BlockModeExample,
    BlockModeExampleSource,
    DefaultExample,
    DefaultExampleSource,
    DisabledExample,
    DisabledExampleSource,
    SizesExample,
    SizesExampleSource,
    ThemesExample,
    ThemesExampleSource,
    WithSelectedOptionExample,
    WithSelectedOptionExampleSource,
} from "./examples/ButtonDropdown/index";
import { AdaptiveUtils } from "../utils/adaptiveUtils";

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
    render: (args) => {
        const options = createOptions();
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
    render: () => {
        const [selectedId, setSelectedId] = useState<string | undefined>("opt-2");
        const options = useMemo(() => createOptions(setSelectedId), []);
        const selectedSM = options.find((o) => o.id === selectedId);
        const selectedMD = options.find((o) => o.id === selectedId);
        const selectedLG = options.find((o) => o.id === selectedId);

        return (
            <div style={{ display: "flex", gap: 16 }}>
                <ButtonDropdown
                    opened={true}
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.SM}
                    options={options}
                    selected={selectedSM}
                >
                    Button text
                </ButtonDropdown>
                <ButtonDropdown
                    opened={!AdaptiveUtils.isAdaptive(EScreenWidth.SM_MAX)}
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.MD}
                    options={options}
                    selected={selectedMD}
                >
                    Button text
                </ButtonDropdown>
                <ButtonDropdown
                    opened={!AdaptiveUtils.isAdaptive(EScreenWidth.SM_MAX)}
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.LG}
                    options={options}
                    selected={selectedLG}
                >
                    Button text
                </ButtonDropdown>
            </div>
        );
    },
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
