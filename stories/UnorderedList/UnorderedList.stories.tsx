import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { UnorderedList } from "@sberbusiness/triplex-next";
import { DefaultRender, DefaultSource, CustomMarkerTextRender, CustomMarkerTextSource } from "./examples";

export default {
    title: "Components/UnorderedList",
    component: UnorderedList,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof UnorderedList>;

type Story = StoryObj<typeof UnorderedList>;

export const Default: Story = {
    name: "Default",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

export const CustomMarkerText: Story = {
    name: "With custom marker/text",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CustomMarkerTextSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: CustomMarkerTextRender,
};
