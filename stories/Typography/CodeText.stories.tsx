import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { CodeText, EFontType } from "../../src";
import "./Typography.less";

export default {
    title: "Components/Typography/CodeText",
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CodeText} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
};

export const Playground: StoryObj<typeof CodeText> = {
    tags: ["!autodocs"],
    render: (args) => (
        <div className="typography-example">
            <CodeText {...args}>const greeting = &quot;Hello, World!&quot;;</CodeText>
        </div>
    ),
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EFontType),
            description: "Тип (цвет) текста",
            table: {
                type: { summary: "EFontType" },
                defaultValue: { summary: "EFontType.PRIMARY" },
            },
        },
        tag: {
            control: { type: "select" },
            options: ["span", "code", "pre", "div"],
            description: "HTML тег для рендера",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "span" },
            },
        },
        underline: {
            control: { type: "boolean" },
            description: "Подчеркивание текста",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        strikethrough: {
            control: { type: "boolean" },
            description: "Зачеркивание текста",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        className: {
            control: { type: "text" },
            description: "Дополнительные CSS классы",
            table: {
                type: { summary: "string" },
            },
        },
    },
    args: {
        type: EFontType.PRIMARY,
        tag: "span",
        underline: false,
        strikethrough: false,
        className: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация компонента CodeText с возможностью изменения всех пропсов через controls панель.",
            },
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        controls: {
            include: ["type", "tag", "underline", "strikethrough"],
        },
        testRunner: { skip: true },
    },
};

export const Types: StoryObj<typeof CodeText> = {
    render: () => (
        <div className="typography-examples-wrapper">
            <div className="typography-example">
                <CodeText type={EFontType.PRIMARY}>Primary</CodeText>
                <CodeText type={EFontType.COMPLEMENTARY}>Complementary</CodeText>
                <CodeText type={EFontType.SECONDARY}>Secondary</CodeText>
                <CodeText type={EFontType.TERTIARY}>Tertiary</CodeText>
                <CodeText type={EFontType.BRAND}>Brand</CodeText>
                <CodeText type={EFontType.INFO}>Info</CodeText>
                <CodeText type={EFontType.SUCCESS}>Success</CodeText>
                <CodeText type={EFontType.WARNING}>Warning</CodeText>
                <CodeText type={EFontType.ERROR}>Error</CodeText>
                <CodeText type={EFontType.DISABLED}>Disabled</CodeText>
                <CodeText type={EFontType.SYSTEM}>System</CodeText>
            </div>
            <div className="typography-invert-example">
                <CodeText type={EFontType.PRIMARY_INVERT}>Primary Invert</CodeText>
                <CodeText type={EFontType.COMPLEMENTARY_INVERT}>Complementary Invert</CodeText>
                <CodeText type={EFontType.SECONDARY_INVERT}>Secondary Invert</CodeText>
                <CodeText type={EFontType.TERTIARY_INVERT}>Tertiary Invert</CodeText>
                <CodeText type={EFontType.BRAND_INVERT}>Brand Invert</CodeText>
                <CodeText type={EFontType.INFO_INVERT}>Info Invert</CodeText>
                <CodeText type={EFontType.SUCCESS_INVERT}>Success Invert</CodeText>
                <CodeText type={EFontType.WARNING_INVERT}>Warning Invert</CodeText>
                <CodeText type={EFontType.ERROR_INVERT}>Error Invert</CodeText>
                <CodeText type={EFontType.DISABLED_INVERT}>Disabled Invert</CodeText>
                <CodeText type={EFontType.SYSTEM_INVERT}>System Invert</CodeText>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы цветов: Primary, Secondary, Tertiary, Brand, Info, Success, Warning, Error, Disabled и их инвертированные варианты.",
            },
        },
        controls: { disable: true },
    },
};

export const Decorations: StoryObj<typeof CodeText> = {
    render: () => (
        <div className="typography-example">
            <CodeText>const x = 42;</CodeText>
            <CodeText underline>const x = 42; // с подчеркиванием</CodeText>
            <CodeText strikethrough>const x = 42; // с зачеркиванием</CodeText>
            <CodeText underline strikethrough>
                const x = 42; // с подчеркиванием и зачеркиванием
            </CodeText>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Варианты декорации текста: без декораций, подчеркивание, зачеркивание, комбинация.",
            },
        },
        controls: { disable: true },
    },
};
