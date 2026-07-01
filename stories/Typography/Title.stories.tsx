import React from "react";
import { StoryObj } from "@storybook/react";
import {
    Title as DocsTitle,
    Description,
    Primary,
    Controls,
    Stories,
    ArgTypes,
    Heading,
} from "@storybook/addon-docs/blocks";
import { Title, ETitleSize, EFontWeightTitle, EFontType } from "@sberbusiness/triplex-next";
import "./Typography.less";

export default {
    title: "Components/Typography/Title",
    parameters: {
        docs: {
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Title} />
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

export const Playground: StoryObj<typeof Title> = {
    tags: ["!autodocs"],
    render: (args) => <Title {...args}>Интерактивный заголовок с controls</Title>,
    argTypes: {
        size: {
            control: { type: "select" },
            options: [ETitleSize.H1, ETitleSize.H2, ETitleSize.H3],
            description: "Размер заголовка",
            table: {
                type: { summary: "ETitleSize" },
                defaultValue: { summary: "ETitleSize.H1" },
            },
        },
        weight: {
            control: { type: "select" },
            options: [
                EFontWeightTitle.REGULAR,
                EFontWeightTitle.MEDIUM,
                EFontWeightTitle.SEMIBOLD,
                EFontWeightTitle.BOLD,
            ],
            description: "Толщина шрифта",
            table: {
                type: { summary: "EFontWeightTitle" },
                defaultValue: { summary: "EFontWeightTitle.SEMIBOLD" },
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
            options: ["h1", "h2", "h3", "div", "span", "p"],
            description: "HTML тег для рендера",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "h1" },
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
        size: ETitleSize.H1,
        weight: EFontWeightTitle.SEMIBOLD,
        type: EFontType.PRIMARY,
        tag: "h1",
        underline: false,
        strikethrough: false,
        className: "",
    },
    parameters: {
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        controls: {
            include: ["size", "weight", "type", "tag", "underline", "strikethrough"],
        },
        testRunner: { skip: true },
    },
};

export const Sizes: StoryObj<typeof Title> = {
    render: () => (
        <div className="typography-example">
            <Title size={ETitleSize.H1}>Заголовок H1</Title>
            <Title size={ETitleSize.H2}>Заголовок H2</Title>
            <Title size={ETitleSize.H3}>Заголовок H3</Title>
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};

export const Weights: StoryObj<typeof Title> = {
    render: () => (
        <div className="typography-example">
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.REGULAR}>
                Regular - Обычный вес
            </Title>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.MEDIUM}>
                Medium - Средний вес
            </Title>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.SEMIBOLD}>
                Semibold - Полужирный
            </Title>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.BOLD}>
                Bold - Жирный
            </Title>
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};

export const Types: StoryObj<typeof Title> = {
    render: () => (
        <div className="typography-examples-wrapper">
            <div className="typography-example">
                <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                    Primary
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.COMPLEMENTARY}>
                    Complementary
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.SECONDARY}>
                    Secondary
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.TERTIARY}>
                    Tertiary
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.BRAND}>
                    Brand
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.INFO}>
                    Info
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.SUCCESS}>
                    Success
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.WARNING}>
                    Warning
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.ERROR}>
                    Error
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.DISABLED}>
                    Disabled
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.SYSTEM}>
                    System
                </Title>
            </div>
            <div className="typography-invert-example">
                <Title size={ETitleSize.H2} type={EFontType.PRIMARY_INVERT}>
                    Primary Invert
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.COMPLEMENTARY_INVERT}>
                    Complementary Invert
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.SECONDARY_INVERT}>
                    Secondary Invert
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.TERTIARY_INVERT}>
                    Tertiary Invert
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.BRAND_INVERT}>
                    Brand Invert
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.INFO_INVERT}>
                    Info Invert
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.SUCCESS_INVERT}>
                    Success Invert
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.WARNING_INVERT}>
                    Warning Invert
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.ERROR_INVERT}>
                    Error Invert
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.DISABLED_INVERT}>
                    Disabled Invert
                </Title>
                <Title size={ETitleSize.H2} type={EFontType.SYSTEM_INVERT}>
                    System Invert
                </Title>
            </div>
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};

export const Decorations: StoryObj<typeof Title> = {
    render: () => (
        <div className="typography-example">
            <Title size={ETitleSize.H2}>Заголовок без декораций</Title>
            <Title size={ETitleSize.H2} underline>
                Заголовок с подчеркиванием
            </Title>
            <Title size={ETitleSize.H2} strikethrough>
                Заголовок с зачеркиванием
            </Title>
            <Title size={ETitleSize.H2} underline strikethrough>
                Заголовок с подчеркиванием и зачеркиванием
            </Title>
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};
