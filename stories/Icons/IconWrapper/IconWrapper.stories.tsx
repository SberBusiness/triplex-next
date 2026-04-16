import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { IconWrapper } from "@sberbusiness/triplex-next";
import { SettingsStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { DefaultExample, DefaultExampleSource, StatesExample, StatesExampleSource } from "./examples";

const meta = {
    title: "Icons/IconWrapper",
    component: IconWrapper,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={IconWrapper} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof IconWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        active: false,
        disabled: false,
        disableInteraction: false,
        displayContents: false,
        children: <SettingsStrokeSrvIcon20 paletteIndex={5} />,
    },
    argTypes: {
        active: {
            control: "boolean",
            description: "Активное состояние иконки.",
        },
        disabled: {
            control: "boolean",
            description: "Отключённое состояние иконки.",
        },
        disableInteraction: {
            control: "boolean",
            description: "Отключить взаимодействие с иконкой.",
        },
        displayContents: {
            control: "boolean",
            description: "Отобразить элемент со свойством display: contents.",
        },
        children: {
            table: { disable: true },
        },
    },
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: StoryObj<typeof IconWrapper> = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const States: StoryObj<typeof IconWrapper> = {
    name: "States",
    render: StatesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: StatesExampleSource,
                language: "tsx",
            },
        },
    },
};
