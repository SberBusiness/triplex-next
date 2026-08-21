import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { UnorderedList, ETextSize, EFontType } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    PlaygroundArgs,
    Default as DefaultRender,
    DefaultSource,
    CustomMarkerText as CustomMarkerTextRender,
    CustomMarkerTextSource,
    Sizes as SizesRender,
    SizesSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/UnorderedList",
    component: UnorderedList,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "UnorderedList — маркированный список с data-driven API: элементы описываются массивом `items`, " +
                    "а не JSX-разметкой. Каждый элемент принимает свойства типографики `Text` и собственный маркер " +
                    "`marker`; без него рендерится маркер-точка. Для списка, собираемого из JSX, используйте " +
                    "`UnorderedListExtended`.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={UnorderedList} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof UnorderedList>;

export default meta;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    items: [{ children: "List item text" }, { children: "List item text" }, { children: "List item text" }],
    // Settings
    size: ETextSize.B3,
    type: EFontType.PRIMARY,
    withCustomMarker: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        items: {
            control: "object",
            description: "Массив конфигурации элементов списка.",
            table: {
                category: "Props",
                type: { summary: "IUnorderedListItemProps[]" },
            },
        },
        // Settings
        size: {
            control: { type: "select" },
            options: Object.values(ETextSize),
            description: "Размер текста, применяется ко всем элементам списка.",
            table: {
                category: "Settings",
                defaultValue: { summary: "ETextSize.B3" },
            },
        },
        type: {
            control: { type: "select" },
            options: Object.values(EFontType),
            description: "Тип (цвет) текста, применяется ко всем элементам списка. Маркер наследует цвет текста.",
            table: {
                category: "Settings",
                defaultValue: { summary: "EFontType.PRIMARY" },
            },
        },
        withCustomMarker: {
            control: "boolean",
            description: "С кастомным маркером-иконкой вместо маркера по умолчанию.",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof UnorderedList> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        // Визуально идентична UnorderedListExtended → Default, скриншот не дублируем.
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

export const CustomMarkerText: StoryObj<typeof UnorderedList> = {
    name: "With custom marker/text",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CustomMarkerTextSource,
                language: "tsx",
            },
        },
        // Визуально идентична UnorderedListExtended → With custom marker/text, скриншот не дублируем.
        testRunner: { skip: true },
    },
    render: CustomMarkerTextRender,
};

export const Sizes: StoryObj<typeof UnorderedList> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
        // Визуально идентична UnorderedListExtended → Sizes, скриншот не дублируем.
        testRunner: { skip: true },
    },
    render: SizesRender,
};

export const VisualTests: StoryObj<typeof UnorderedList> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
};
