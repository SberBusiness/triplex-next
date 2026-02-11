import React from "react";
import { StoryObj } from "@storybook/react";
import { Caption } from "../../src/components/Typography/Caption";
import { EFontType, EFontWeightText, ECaptionSize } from "../../src/components/Typography/enums";
import { Title, Description, Primary, Controls, Stories, ArgTypes } from "@storybook/addon-docs/blocks";
import "./Typography.less";

export default {
    title: "Components/Typography/Caption",
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <h2>Props</h2>
                    <ArgTypes of={Caption} />
                    <h2>Playground</h2>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
};

export const Playground: StoryObj<typeof Caption> = {
    tags: ["!autodocs"],
    render: (args) => (
        <div className="typography-example">
            <Caption {...args}>Интерактивная подпись с controls</Caption>
        </div>
    ),
    argTypes: {
        size: {
            control: { type: "select" },
            options: [ECaptionSize.C1, ECaptionSize.C2, ECaptionSize.D1],
            description: "Размер подписи",
            table: {
                type: { summary: "ECaptionSize" },
                defaultValue: { summary: "ECaptionSize.C1" },
            },
        },
        weight: {
            control: { type: "select" },
            options: [EFontWeightText.REGULAR, EFontWeightText.SEMIBOLD],
            description: "Толщина шрифта",
            table: {
                type: { summary: "EFontWeightText" },
                defaultValue: { summary: "EFontWeightText.REGULAR" },
            },
        },
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
            options: ["span", "div", "p", "h1", "h2", "h3"],
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
        size: ECaptionSize.C1,
        weight: EFontWeightText.REGULAR,
        type: EFontType.PRIMARY,
        tag: "span",
        underline: false,
        strikethrough: false,
        className: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация компонента Caption с возможностью изменения всех пропсов через controls панель.",
            },
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        controls: {
            include: ["size", "weight", "type", "tag", "underline", "strikethrough"],
        },
    },
};

export const Sizes: StoryObj<typeof Caption> = {
    render: () => (
        <div className="typography-example">
            <Caption size={ECaptionSize.C1}>C1 - Подпись малого размера (10px)</Caption>
            <Caption size={ECaptionSize.C2}>C2 - Подпись очень малого размера (8px)</Caption>
            <Caption size={ECaptionSize.D1}>D1 - Подпись большого размера (32px)</Caption>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Основные размеры подписей: C1 (10px), C2 (8px), D1 (32px)",
            },
        },
        controls: { disable: true },
    },
};

export const Weights: StoryObj<typeof Caption> = {
    render: () => (
        <div className="typography-example">
            <Caption size={ECaptionSize.C1} weight={EFontWeightText.REGULAR}>
                Regular - Обычный вес подписи
            </Caption>
            <Caption size={ECaptionSize.C1} weight={EFontWeightText.SEMIBOLD}>
                Semibold - Полужирная подпись
            </Caption>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные веса шрифта для подписей: Regular, Semibold",
            },
        },
        controls: { disable: true },
    },
};

export const Types: StoryObj<typeof Caption> = {
    render: () => (
        <div className="typography-examples-wrapper">
            <div className="typography-example">
                <Caption size={ECaptionSize.C1} type={EFontType.PRIMARY}>
                    Primary
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.COMPLEMENTARY}>
                    Complementary
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.SECONDARY}>
                    Secondary
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.TERTIARY}>
                    Tertiary
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.BRAND}>
                    Brand
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.INFO}>
                    Info
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.SUCCESS}>
                    Success
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.WARNING}>
                    Warning
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.ERROR}>
                    Error
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.DISABLED}>
                    Disabled
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.SYSTEM}>
                    System
                </Caption>
            </div>
            <div className="typography-invert-example">
                <Caption size={ECaptionSize.C1} type={EFontType.PRIMARY_INVERT}>
                    Primary Invert
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.COMPLEMENTARY_INVERT}>
                    Complementary Invert
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.SECONDARY_INVERT}>
                    Secondary Invert
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.TERTIARY_INVERT}>
                    Tertiary Invert
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.BRAND_INVERT}>
                    Brand Invert
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.INFO_INVERT}>
                    Info Invert
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.SUCCESS_INVERT}>
                    Success Invert
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.WARNING_INVERT}>
                    Warning Invert
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.ERROR_INVERT}>
                    Error Invert
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.DISABLED_INVERT}>
                    Disabled Invert
                </Caption>
                <Caption size={ECaptionSize.C1} type={EFontType.SYSTEM_INVERT}>
                    System Invert
                </Caption>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы цветов для подписей: Primary, Secondary, Tertiary, Brand, Info, Success, Warning, Error, Disabled и их инвертированные варианты.",
            },
        },
        controls: { disable: true },
    },
};
