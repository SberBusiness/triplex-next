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
                    "Сравнение SB Sans Text и SB Sans Display из main и архива от 18.11 на одинаковых примерах. Текст и значения полей синхронизированы между колонками. Для проверки на тёмном фоне переключите тему Storybook.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <p>
                        <a href="./?path=/docs/components-typography-font-glyphs--docs" target="_top">
                            Посмотреть глифы всех начертаний SB Sans
                        </a>
                    </p>
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
            fonts.load("400 20px TriplexPreviousSBSansDisplay"),
            fonts.load("500 20px TriplexPreviousSBSansDisplay"),
            fonts.load("600 20px TriplexPreviousSBSansDisplay"),
            fonts.load("700 20px TriplexPreviousSBSansDisplay"),
            fonts.load("400 20px SBSansDisplay"),
            fonts.load("500 20px SBSansDisplayMedium"),
            fonts.load("600 20px SBSansDisplaySemibold"),
            fonts.load("700 20px SBSansDisplayBold"),
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
