import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { ThemeProvider, ETriplexNextTheme } from "@sberbusiness/triplex-next";
import {
    PlaygroundArgs,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    DarkTheme as DarkThemeRender,
    DarkThemeSource,
    CustomTokens as CustomTokensRender,
    CustomTokensSource,
    ThemeSwitcher as ThemeSwitcherRender,
    ThemeSwitcherSource,
    ScopedTheme as ScopedThemeRender,
    ScopedThemeSource,
} from "./examples";

export default {
    title: "Components/ThemeProvider",
    component: ThemeProvider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ThemeProvider} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ThemeProvider>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    theme: ETriplexNextTheme.LIGHT,
    scopeClassName: "",
    tokens: {},
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        theme: {
            control: { type: "select" },
            options: Object.values(ETriplexNextTheme),
            description: "Дизайн-тема Triplex Next.",
            table: {
                type: { summary: "ETriplexNextTheme" },
                defaultValue: { summary: "ETriplexNextTheme.LIGHT" },
            },
        },
        scopeClassName: {
            control: { type: "text" },
            description:
                "Classname, который добавлен к элементу из scopeRef для создания области видимости css-переменных. Если не задан — генерируется автоматически.",
        },
        tokens: {
            control: { type: "object" },
            description: "Переопределяемые токены.",
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof ThemeProvider> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const DarkTheme: StoryObj<typeof ThemeProvider> = {
    name: "Dark theme",
    render: DarkThemeRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DarkThemeSource,
                language: "tsx",
            },
        },
    },
};

export const CustomTokens: StoryObj<typeof ThemeProvider> = {
    name: "Custom tokens",
    render: CustomTokensRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CustomTokensSource,
                language: "tsx",
            },
        },
    },
};

export const ThemeSwitcher: StoryObj<typeof ThemeProvider> = {
    name: "Theme switcher",
    render: ThemeSwitcherRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ThemeSwitcherSource,
                language: "tsx",
            },
        },
    },
};

export const ScopedTheme: StoryObj<typeof ThemeProvider> = {
    name: "Scoped theme",
    render: ScopedThemeRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ScopedThemeSource,
                language: "tsx",
            },
        },
    },
};
