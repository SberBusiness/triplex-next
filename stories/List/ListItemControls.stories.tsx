import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { ListItemControls } from "@sberbusiness/triplex-next";
import { Default as DefaultRender, DefaultSource } from "./examples/ListItemControls";

const meta = {
    title: "Components/List/ListItemControls",
    component: ListItemControls,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Контейнер с кнопками действий.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ListItemControls>;

export default meta;

export const Default: StoryObj<typeof ListItemControls> = {
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
