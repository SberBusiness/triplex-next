import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Skeleton, ESkeletonType } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, TypesExample, TypesExampleSource } from "./examples";

const meta = {
    title: "Components/Loaders/Skeleton",
    component: Skeleton,
    parameters: {
        docs: {
            description: {
                component: "Элемент для визуализации содержимого, которое ещё не загрузилось.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Skeleton} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        type: ESkeletonType.DARK,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(ESkeletonType),
            description: "Тип скелетона",
            table: {
                type: { summary: "ESkeletonType" },
                defaultValue: { summary: "ESkeletonType.DARK" },
            },
        },
    },
    render: (args) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "30%", marginRight: "36px" }}>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {[0, 1, 2, 3].map((i) => (
                        <li key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                            <span style={{ width: "32px", height: "32px", display: "flex" }}>
                                <Skeleton {...args} />
                            </span>
                            <div style={{ flexGrow: 1, marginLeft: "16px", height: "32px", display: "flex" }}>
                                <Skeleton {...args} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                    <Skeleton {...args} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                    <Skeleton {...args} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                    <Skeleton {...args} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                    <Skeleton {...args} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: Story = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Types: Story = {
    name: "Types",
    render: TypesExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: TypesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: Story = {
    name: "Visual tests",
    tags: ["!autodocs"],
    decorators: [
        (Story) => (
            <>
                <style>{`* { animation: none !important; }`}</style>
                <Story />
            </>
        ),
    ],
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>DARK</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", padding: "24px" }}>
                    <Skeleton
                        type={ESkeletonType.DARK}
                        style={{ height: "80px", width: "calc(50% - 12px)", backgroundColor: "rgba(31, 31, 34, 0.10)" }}
                    />
                    <Skeleton
                        type={ESkeletonType.DARK}
                        style={{ height: "80px", width: "calc(50% - 12px)", backgroundColor: "rgba(31, 31, 34, 0.10)" }}
                    />
                </div>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LIGHT</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", padding: "24px", background: "#EEF0F4" }}>
                    <Skeleton
                        type={ESkeletonType.LIGHT}
                        style={{ height: "80px", width: "calc(50% - 12px)", backgroundColor: "#F2F4F7" }}
                    />
                    <Skeleton
                        type={ESkeletonType.LIGHT}
                        style={{ height: "80px", width: "calc(50% - 12px)", backgroundColor: "#F2F4F7" }}
                    />
                </div>
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
