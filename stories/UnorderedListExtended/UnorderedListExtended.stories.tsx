import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { UnorderedListExtended } from "@sberbusiness/triplex-next";
import { DefaultRender, DefaultSource, CustomMarkerTextRender, CustomMarkerTextSource } from "./examples";

export default {
    title: "Components/UnorderedListExtended",
    component: UnorderedListExtended,
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
} satisfies Meta<typeof UnorderedListExtended>;

type Story = StoryObj<typeof UnorderedListExtended>;

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
    },
    render: CustomMarkerTextRender,
};
