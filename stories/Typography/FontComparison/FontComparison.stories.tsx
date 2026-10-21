import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { DefaultRender, DefaultSource } from "./examples";

const meta = {
    title: "Components/Typography/Font Comparison",
    tags: ["autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                component:
                    "Старый и новый SB Sans Text на одинаковых примерах. Сравните читаемость, насыщенность и вертикальное выравнивание. Текст и значения полей синхронизированы между колонками. Для проверки на тёмном фоне переключите тему Storybook.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Сравнение рядом",
    render: DefaultRender,
    play: async ({ canvasElement }) => {
        const fonts = canvasElement.ownerDocument.fonts;
        await Promise.all([
            fonts.load("400 16px TriplexPreviousSBSansText"),
            fonts.load("600 16px TriplexPreviousSBSansText"),
            fonts.load("400 16px SBSansText"),
            fonts.load("600 16px SBSansTextSemibold"),
        ]);
    },
    parameters: {
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
            source: { code: DefaultSource, language: "tsx" },
        },
    },
};
