import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { LoaderScreen, EComponentSize, EButtonTheme, Button } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, TypesExample, TypesExampleSource } from "./examples";

const meta = {
    title: "Components/Loaders/LoaderScreen",
    component: LoaderScreen,
    parameters: {
        docs: {
            description: {
                component: "Виджет-загрузчик, перекрывающий содержимое и отображающий лоадер по центру своей области.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={LoaderScreen} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof LoaderScreen>;

export default meta;

export type PlaygroundArgs = React.ComponentProps<typeof LoaderScreen> & {
    /** С кнопками. */
    withButtons: boolean;
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        type: "small",
        size: EComponentSize.MD,
        description: "This message provides additional context or highlights important information to note.",
        withButtons: true,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: ["small", "middle"],
            description: "Тип лоадера",
            table: {
                type: { summary: '"small" | "middle"' },
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер (только для типа small)",
            if: { arg: "type", eq: "small" },
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        description: {
            control: { type: "text" },
            description: "Текст, который будет отображаться под спиннером.",
        },
        withButtons: {
            control: { type: "boolean" },
            table: { category: "Settings" },
        },
        controls: {
            control: false,
            table: { disable: true },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ position: "relative", height: "200px", width: "300px" }}>
                <Story />
            </div>
        ),
    ],
    render: ({ withButtons, ...args }) => (
        <LoaderScreen
            {...args}
            controls={
                withButtons ? (
                    <>
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                            Button text
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                            Button text
                        </Button>
                    </>
                ) : null
            }
        />
    ),
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};

export const Default: StoryObj<typeof LoaderScreen> = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Types: StoryObj<typeof LoaderScreen> = {
    name: "Types",
    render: TypesExample,
    parameters: {
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: TypesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof LoaderScreen> = {
    name: "Visual tests",
    tags: ["!autodocs", "!dev"],
    decorators: [
        (Story) => (
            <>
                <style>{`* { animation: none !important; }`}</style>
                <Story />
            </>
        ),
    ],
    render: () => (
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", height: "200px", width: "300px" }}>
                <LoaderScreen type="small" size={EComponentSize.MD} />
            </div>
            <div style={{ position: "relative", height: "300px", width: "400px" }}>
                <LoaderScreen
                    type="middle"
                    description="This message provides additional context or highlights important information to note."
                    controls={
                        <>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                Button text
                            </Button>
                        </>
                    }
                />
            </div>
        </div>
    ),
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
