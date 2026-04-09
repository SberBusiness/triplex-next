import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CardStatic, ECardTheme, ECardRoundingSize, ECardContentPaddingSize } from "@sberbusiness/triplex-next";
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
} from "./examples/CardStatic";

const meta = {
    title: "Components/Cards/CardStatic",
    component: CardStatic,
    globals: {
        backgrounds: { value: "gray" },
    },
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Статичная карточка.
                `,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CardStatic} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CardStatic>;

export default meta;

export const Playground: StoryObj<typeof CardStatic> = {
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
    },
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
    },
    render: PlaygroundExample,
};

export const Default: StoryObj<typeof CardStatic> = {
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

export const Themes: StoryObj<typeof CardStatic> = {
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

export const PaddingSizes: StoryObj<typeof CardStatic> = {
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

export const RoundingSizes: StoryObj<typeof CardStatic> = {
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
