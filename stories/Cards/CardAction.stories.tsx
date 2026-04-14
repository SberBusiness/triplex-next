import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    CardAction,
    ICardActionProps,
    ECardTheme,
    ECardRoundingSize,
    ECardContentPaddingSize,
} from "@sberbusiness/triplex-next";
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
    PlaygroundExample,
    RoundingSizesExample,
    RoundingSizesExampleSource,
    ThemesExample,
    ThemesExampleSource,
} from "./examples/CardAction";

type TCardActionPlaygroundProps = Pick<
    ICardActionProps,
    "roundingSize" | "theme" | "selected" | "onToggle" | "toggle"
> & {
    paddingSize: ECardContentPaddingSize;
};

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
    argTypes: {
        paddingSize: {
            control: { type: "select" },
            options: Object.values(ECardContentPaddingSize),
            desciption: "Возможные размеры внутреннего отступа",
            table: { defaultValue: { summary: ECardContentPaddingSize.MD } },
        },
        roundingSize: {
            control: { type: "select" },
            options: Object.values(ECardRoundingSize),
            description: "Размер скругления карточки",
            table: { defaultValue: { summary: ECardRoundingSize.MD } },
        },
        theme: {
            control: { type: "select" },
            options: Object.values(ECardTheme),
            description: "Тема карточки",
            table: { defaultValue: { summary: ECardTheme.GENERAL } },
        },
        selected: { table: { disable: true } },
        onToggle: { table: { disable: true } },
        toggle: { table: { disable: true } },
    },
} satisfies Meta<TCardActionPlaygroundProps>;

export default meta;

export const Playground: StoryObj<TCardActionPlaygroundProps> = {
    tags: ["!autodocs"],
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
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
        selected: false,
    },
    render: PlaygroundExample,
};

export const Default: StoryObj<TCardActionPlaygroundProps> = {
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

export const Themes: StoryObj<TCardActionPlaygroundProps> = {
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

export const PaddingSizes: StoryObj<TCardActionPlaygroundProps> = {
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

export const RoundingSizes: StoryObj<TCardActionPlaygroundProps> = {
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
