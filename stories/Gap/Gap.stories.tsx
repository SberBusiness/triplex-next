import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Gap, TGapSize } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, SizesExample, SizesExampleSource } from "./examples";

const GAP_SIZES: TGapSize[] = [4, 8, 12, 16, 24, 32, 64, 128];

const meta = {
    title: "Components/Gap",
    component: Gap,
    parameters: {
        docs: {
            description: {
                component: "Компонент-разделитель. Добавляет пустое вертикальное пространство между компонентами.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Gap} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Gap>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        size: 16,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: GAP_SIZES,
            description: "Размер отступа",
            table: {
                type: { summary: "TGapSize" },
                defaultValue: { summary: "16" },
            },
        },
    },
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: (args) => (
        <div>
            <div
                style={{
                    padding: "16px",
                    textAlign: "center",
                    backgroundColor: "rgb(255, 217, 160)",
                }}
            >
                Sample Text Above
            </div>

            <Gap size={args.size} />

            <div
                style={{
                    padding: "16px",
                    textAlign: "center",
                    backgroundColor: "rgb(255, 217, 160)",
                }}
            >
                Sample Text Below
            </div>
        </div>
    ),
};

export const Default: StoryObj<typeof Gap> = {
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

export const Sizes: StoryObj<typeof Gap> = {
    name: "Sizes",
    render: SizesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};
