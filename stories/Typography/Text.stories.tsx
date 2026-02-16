import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes } from "@storybook/addon-docs/blocks";
import { Text, ETextSize, ELineType, EFontWeightText, EFontType } from "../../src";
import "./Typography.less";

export default {
    title: "Components/Typography/Text",
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <h2>Props</h2>
                    <ArgTypes of={Text} />
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

export const Playground: StoryObj<typeof Text> = {
    tags: ["!autodocs"],
    render: (args) => (
        <div className="typography-example">
            <Text {...args}>Интерактивный текст с controls</Text>
        </div>
    ),
    argTypes: {
        size: {
            control: { type: "select" },
            options: [ETextSize.B1, ETextSize.B2, ETextSize.B3, ETextSize.B4],
            description: "Размер текста",
            table: {
                type: { summary: "ETextSize" },
                defaultValue: { summary: "ETextSize.B2" },
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
        line: {
            control: { type: "select" },
            options: [ELineType.NORMAL, ELineType.COMPACT],
            description: "Высота блока строки (Normal = обычная, Compact = компактная)",
            table: {
                type: { summary: "ELineType" },
                defaultValue: { summary: "ELineType.NORMAL" },
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
        size: ETextSize.B2,
        weight: EFontWeightText.REGULAR,
        line: ELineType.NORMAL,
        type: EFontType.PRIMARY,
        tag: "span",
        underline: false,
        strikethrough: false,
        className: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация компонента Text с возможностью изменения всех пропсов через controls панель. Включает control для выбора высоты строки (Normal/Compact).",
            },
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        controls: {
            include: ["size", "weight", "line", "type", "tag", "underline", "strikethrough"],
        },
    },
};

export const Sizes: StoryObj<typeof Text> = {
    render: () => (
        <div className="typography-example">
            <Text size={ETextSize.B1}>B1 - Основной текст большого размера (18px)</Text>
            <Text size={ETextSize.B2}>B2 - Основной текст среднего размера (16px)</Text>
            <Text size={ETextSize.B3}>B3 - Основной текст малого размера (14px)</Text>
            <Text size={ETextSize.B4}>B4 - Основной текст очень малого размера (12px)</Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Основные размеры текста: B1 (18px), B2 (16px), B3 (14px), B4 (12px)",
            },
        },
        controls: { disable: true },
    },
};

export const Weights: StoryObj<typeof Text> = {
    render: () => (
        <div className="typography-example">
            <Text size={ETextSize.B2} weight={EFontWeightText.REGULAR}>
                Regular - Обычный вес текста
            </Text>
            <Text size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                Semibold - Полужирный текст
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные веса шрифта для текста: Regular, Semibold",
            },
        },
        controls: { disable: true },
    },
};

export const LineTypes: StoryObj<typeof Text> = {
    render: () => (
        <div className="typography-example">
            <Text size={ETextSize.B3} line={ELineType.NORMAL}>
                Normal - Обычная высота строки. Этот текст демонстрирует нормальную высоту строки для лучшей читаемости.
            </Text>
            <Text size={ETextSize.B3} line={ELineType.COMPACT}>
                Compact - Компактная высота строки. Этот текст демонстрирует компактную высоту строки для экономии
                места.
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы высоты строки для текста: Normal (обычная), Compact (компактная)",
            },
        },
        controls: { disable: true },
    },
};

export const Types: StoryObj<typeof Text> = {
    render: () => (
        <div className="typography-examples-wrapper">
            <div className="typography-example">
                <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Primary
                </Text>
                <Text size={ETextSize.B2} type={EFontType.COMPLEMENTARY}>
                    Complementary
                </Text>
                <Text size={ETextSize.B2} type={EFontType.SECONDARY}>
                    Secondary
                </Text>
                <Text size={ETextSize.B2} type={EFontType.TERTIARY}>
                    Tertiary
                </Text>
                <Text size={ETextSize.B2} type={EFontType.BRAND}>
                    Brand
                </Text>
                <Text size={ETextSize.B2} type={EFontType.INFO}>
                    Info
                </Text>
                <Text size={ETextSize.B2} type={EFontType.SUCCESS}>
                    Success
                </Text>
                <Text size={ETextSize.B2} type={EFontType.WARNING}>
                    Warning
                </Text>
                <Text size={ETextSize.B2} type={EFontType.ERROR}>
                    Error
                </Text>
                <Text size={ETextSize.B2} type={EFontType.DISABLED}>
                    Disabled
                </Text>
                <Text size={ETextSize.B2} type={EFontType.SYSTEM}>
                    System
                </Text>
            </div>
            <div className="typography-invert-example">
                <Text size={ETextSize.B2} type={EFontType.PRIMARY_INVERT}>
                    Primary Invert
                </Text>
                <Text size={ETextSize.B2} type={EFontType.COMPLEMENTARY_INVERT}>
                    Complementary Invert
                </Text>
                <Text size={ETextSize.B2} type={EFontType.SECONDARY_INVERT}>
                    Secondary Invert
                </Text>
                <Text size={ETextSize.B2} type={EFontType.TERTIARY_INVERT}>
                    Tertiary Invert
                </Text>
                <Text size={ETextSize.B2} type={EFontType.BRAND_INVERT}>
                    Brand Invert
                </Text>
                <Text size={ETextSize.B2} type={EFontType.INFO_INVERT}>
                    Info Invert
                </Text>
                <Text size={ETextSize.B2} type={EFontType.SUCCESS_INVERT}>
                    Success Invert
                </Text>
                <Text size={ETextSize.B2} type={EFontType.WARNING_INVERT}>
                    Warning Invert
                </Text>
                <Text size={ETextSize.B2} type={EFontType.ERROR_INVERT}>
                    Error Invert
                </Text>
                <Text size={ETextSize.B2} type={EFontType.DISABLED_INVERT}>
                    Disabled Invert
                </Text>
                <Text size={ETextSize.B2} type={EFontType.SYSTEM_INVERT}>
                    System Invert
                </Text>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы цветов для текста: Primary, Secondary, Tertiary, Brand, Info, Success, Warning, Error, Disabled и их инвертированные варианты.",
            },
        },
        controls: { disable: true },
    },
};

export const Decorations: StoryObj<typeof Text> = {
    render: () => (
        <div className="typography-example">
            <Text size={ETextSize.B2}>Обычный текст без декораций</Text>
            <Text size={ETextSize.B2} underline>
                Текст с подчеркиванием
            </Text>
            <Text size={ETextSize.B2} strikethrough>
                Текст с зачеркиванием
            </Text>
            <Text size={ETextSize.B2} underline strikethrough>
                Текст с подчеркиванием и зачеркиванием
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные варианты декорации текста: без декораций, подчеркивание, зачеркивание, комбинация",
            },
        },
        controls: { disable: true },
    },
};
