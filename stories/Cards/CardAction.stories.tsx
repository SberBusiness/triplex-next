import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CardAction, ECardTheme, ECardRoundingSize, ECardContentPaddingSize } from "@sberbusiness/triplex-next";
import {
    Title as DocsTitle,
    Description,
    Primary,
    Controls,
    Stories,
    Heading,
    ArgTypes,
} from "@storybook/addon-docs/blocks";
import {
    DefaultExample,
    DefaultExampleSource,
    PaddingSizesExample,
    PaddingSizesExampleSource,
    type PlaygroundArgs,
    PlaygroundExample,
    RoundingSizesExample,
    RoundingSizesExampleSource,
    ThemesExample,
    ThemesExampleSource,
    VisualTestsExample,
} from "./examples/CardAction";

const meta = {
    title: "Components/Cards/CardAction",
    component: CardAction,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Интерактивная карточка с возможностью выбора.
                `,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CardAction} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CardAction>;

export default meta;

type Story = StoryObj<typeof CardAction>;

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
        selected: false,
    },
    argTypes: {
        roundingSize: {
            control: { type: "select" },
            options: Object.values(ECardRoundingSize),
            description: "Размер скругления карточки",
            table: {
                category: "Props",
                type: { summary: "ECardRoundingSize" },
                defaultValue: { summary: ECardRoundingSize.MD },
            },
        },
        theme: {
            control: { type: "select" },
            options: Object.values(ECardTheme),
            description: "Тема карточки",
            table: {
                category: "Props",
                type: { summary: "ECardTheme" },
                defaultValue: { summary: ECardTheme.GENERAL },
            },
        },
        paddingSize: {
            control: { type: "select" },
            options: Object.values(ECardContentPaddingSize),
            description: "Размер внутреннего отступа контента карточки (prop CardAction.Content)",
            table: {
                category: "Settings",
                type: { summary: "ECardContentPaddingSize" },
                defaultValue: { summary: ECardContentPaddingSize.MD },
            },
        },
    },
    parameters: {
        controls: {
            include: ["paddingSize", "roundingSize", "theme"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
    render: DefaultExample,
};

export const Themes: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ThemesExampleSource,
                language: "tsx",
            },
        },
    },
    render: ThemesExample,
};

export const PaddingSizes: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: PaddingSizesExampleSource,
                language: "tsx",
            },
        },
    },
    render: PaddingSizesExample,
};

export const RoundingSizes: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: RoundingSizesExampleSource,
                language: "tsx",
            },
        },
    },
    render: RoundingSizesExample,
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: VisualTestsExample,
    play: async ({ canvas, userEvent }) => {
        const cards = await canvas.findAllByRole("button");

        // Выбранное состояние в обеих темах и клавиатурный фокус на невыбранной карточке.
        await userEvent.click(cards[0]);
        await userEvent.click(cards[2]);
        cards[1].focus();
    },
};
