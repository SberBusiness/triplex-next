import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Island, EIslandType, EIslandBorderRadius, EIslandPaddingSize } from "../src/components/Island";
import { IslandHeader } from "../src/components/Island/components/IslandHeader";
import { IslandBody } from "../src/components/Island/components/IslandBody";
import { IslandFooter } from "../src/components/Island/components/IslandFooter";

const meta = {
    title: "Components/Island",
    component: Island,
    tags: ["autodocs"],
    parameters: {
        backgrounds: { default: "gray" },
        docs: {
            description: {
                component: `
Контейнерный компонент с визуальными вариациями: тип, скругление и внутренние отступы.

## Особенности

- **Типы**: type1, type2, type3
- **Скругление**: SM, MD
- **Внутренние отступы**: SM, MD, LG

## Состав

- Header — шапка контента
- Body — основной контент
- Footer — нижняя часть
                `,
            },
        },
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EIslandType),
            description: "Тип визуального оформления острова",
            table: { type: { summary: "EIslandType" }, defaultValue: { summary: EIslandType.type1 } },
        },
        borderRadius: {
            control: { type: "select" },
            options: Object.values(EIslandBorderRadius),
            description: "Размер скругления",
            table: { type: { summary: "EIslandBorderRadius" }, defaultValue: { summary: EIslandBorderRadius.MD } },
        },
        paddingSize: {
            control: { type: "select" },
            options: Object.values(EIslandPaddingSize),
            description: "Размер внутреннего отступа",
            table: { type: { summary: "EIslandPaddingSize" }, defaultValue: { summary: EIslandPaddingSize.MD } },
        },
        className: {
            control: { type: "text" },
            description: "Дополнительные CSS классы",
        },
    },
} satisfies Meta<typeof Island>;

export default meta;

type Story = StoryObj<typeof meta>;

interface IPlaygroundProps extends React.ComponentProps<typeof Island> {
    headerText?: string;
    bodyText?: string;
    footerText?: string;
    showHeader?: boolean;
    showBody?: boolean;
    showFooter?: boolean;
}

export const Playground: StoryObj<IPlaygroundProps> = {
    name: "Playground",
    args: {
        type: EIslandType.type1,
        borderRadius: EIslandBorderRadius.MD,
        paddingSize: EIslandPaddingSize.MD,
        headerText: "Island Header",
        bodyText: "Island Body",
        footerText: "Island Footer",
        showHeader: true,
        showBody: true,
        showFooter: true,
    },
    argTypes: {
        headerText: {
            control: { type: "text" },
            description: "Текст в шапке",
            table: { type: { summary: "string" } },
        },
        bodyText: {
            control: { type: "text" },
            description: "Текст в теле",
            table: { type: { summary: "string" } },
        },
        footerText: {
            control: { type: "text" },
            description: "Текст в футере",
            table: { type: { summary: "string" } },
        },
        showHeader: {
            control: { type: "boolean" },
            description: "Показывать шапку",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
        },
        showBody: {
            control: { type: "boolean" },
            description: "Показывать тело",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
        },
        showFooter: {
            control: { type: "boolean" },
            description: "Показывать футер",
            table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация Island с управлением типом, скруглением, отступами и составными частями.",
            },
        },
    },
    render: (args) => {
        const { showHeader, showBody, showFooter, headerText, bodyText, footerText, ...rest } = args;

        return (
            <div style={{ maxWidth: 360 }}>
                <Island {...rest}>
                    {showHeader ? <IslandHeader>{headerText}</IslandHeader> : null}
                    {showBody ? <IslandBody>{bodyText}</IslandBody> : null}
                    {showFooter ? <IslandFooter>{footerText}</IslandFooter> : null}
                </Island>
            </div>
        );
    },
};

export const Types: Story = {
    name: "Types",
    parameters: {
        docs: {
            description: { story: "Варианты визуального типа: type1, type2, type3." },
        },
    },
    argTypes: {
        type: { table: { disable: true } },
        borderRadius: { table: { disable: true } },
        paddingSize: { table: { disable: true } },
        className: { table: { disable: true } },
        children: { table: { disable: true } },
    },
    render: () => (
        <div
            style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            }}
        >
            <Island type={EIslandType.type1} paddingSize={EIslandPaddingSize.MD} borderRadius={EIslandBorderRadius.MD}>
                <IslandHeader>Type 1</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
            <Island type={EIslandType.type2} paddingSize={EIslandPaddingSize.MD} borderRadius={EIslandBorderRadius.MD}>
                <IslandHeader>Type 2</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
            <Island type={EIslandType.type3} paddingSize={EIslandPaddingSize.MD} borderRadius={EIslandBorderRadius.MD}>
                <IslandHeader>Type 3</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
        </div>
    ),
};

export const BorderRadius: Story = {
    name: "Border radius",
    parameters: {
        docs: {
            description: { story: "Демонстрация размеров скругления: SM и MD." },
        },
    },
    argTypes: {
        type: { table: { disable: true } },
        borderRadius: { table: { disable: true } },
        paddingSize: { table: { disable: true } },
        className: { table: { disable: true } },
        children: { table: { disable: true } },
    },
    render: () => (
        <div
            style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            }}
        >
            <Island type={EIslandType.type1} paddingSize={EIslandPaddingSize.MD} borderRadius={EIslandBorderRadius.SM}>
                <IslandHeader>SM</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
            <Island type={EIslandType.type1} paddingSize={EIslandPaddingSize.MD} borderRadius={EIslandBorderRadius.MD}>
                <IslandHeader>MD</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
        </div>
    ),
};

export const PaddingSizes: Story = {
    name: "Padding sizes",
    parameters: {
        docs: {
            description: { story: "Демонстрация размеров внутренних отступов: SM, MD, LG." },
        },
    },
    argTypes: {
        type: { table: { disable: true } },
        borderRadius: { table: { disable: true } },
        paddingSize: { table: { disable: true } },
        className: { table: { disable: true } },
        children: { table: { disable: true } },
    },
    render: () => (
        <div
            style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            }}
        >
            <Island type={EIslandType.type1} paddingSize={EIslandPaddingSize.SM} borderRadius={EIslandBorderRadius.MD}>
                <IslandHeader>Padding SM</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
            <Island type={EIslandType.type1} paddingSize={EIslandPaddingSize.MD} borderRadius={EIslandBorderRadius.MD}>
                <IslandHeader>Padding MD</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
            <Island type={EIslandType.type1} paddingSize={EIslandPaddingSize.LG} borderRadius={EIslandBorderRadius.MD}>
                <IslandHeader>Padding LG</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
        </div>
    ),
};
