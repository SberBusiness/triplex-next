import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Island, EIslandType } from "../src/components/Island";
import { IslandHeader } from "../src/components/Island/components/IslandHeader";
import { IslandBody } from "../src/components/Island/components/IslandBody";
import { IslandFooter } from "../src/components/Island/components/IslandFooter";
import { EComponentSize } from "@sberbusiness/triplex-next";

const meta = {
    title: "Components/Island",
    component: Island,
    tags: ["autodocs"],
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        docs: {
            description: {
                component: `
Контейнерный компонент с визуальными вариациями: тип, скругление и внутренние отступы.

## Особенности

- **Типы**: type1, type2, type3
- **Размеры**: SM, MD, LG. От размера зависит скругление и внутренние отступы.

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
            table: { type: { summary: "EIslandType" }, defaultValue: { summary: EIslandType.TYPE_1 } },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер острова",
            table: { type: { summary: "EComponentSize" }, defaultValue: { summary: EComponentSize.MD } },
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
        type: EIslandType.TYPE_1,
        size: EComponentSize.MD,
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
                    {showHeader ? <Island.Header>{headerText}</Island.Header> : null}
                    {showBody ? <Island.Body>{bodyText}</Island.Body> : null}
                    {showFooter ? <Island.Footer>{footerText}</Island.Footer> : null}
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
        size: { table: { disable: true } },
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
            <Island type={EIslandType.TYPE_1}>
                <Island.Header>Type 1</Island.Header>
                <Island.Body>Body content</Island.Body>
                <Island.Footer>Footer content</Island.Footer>
            </Island>
            <Island type={EIslandType.TYPE_2}>
                <Island.Header>Type 2</Island.Header>
                <Island.Body>Body content</Island.Body>
                <Island.Footer>Footer content</Island.Footer>
            </Island>
            <Island type={EIslandType.TYPE_3}>
                <IslandHeader>Type 3</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
        </div>
    ),
};

export const Sizes: Story = {
    name: "Sizes",
    parameters: {
        docs: {
            description: { story: "Демонстрация размеров скругления: SM и MD." },
        },
    },
    argTypes: {
        type: { table: { disable: true } },
        size: { table: { disable: true } },
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
            <Island type={EIslandType.TYPE_1} size={EComponentSize.SM}>
                <IslandHeader>Size SM</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
            <Island type={EIslandType.TYPE_1} size={EComponentSize.MD}>
                <IslandHeader>Size MD</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
            <Island type={EIslandType.TYPE_1} size={EComponentSize.LG}>
                <IslandHeader>Size LG</IslandHeader>
                <IslandBody>Body content</IslandBody>
                <IslandFooter>Footer content</IslandFooter>
            </Island>
        </div>
    ),
};
