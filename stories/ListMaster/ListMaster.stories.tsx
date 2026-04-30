import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { ListMaster } from "@sberbusiness/triplex-next";
import { Default as DefaultRender, DefaultSource } from "./examples";

const meta = {
    title: "Components/List/ListMaster",
    component: ListMaster,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент, оборачивающий список и фильтры. Составной компонент: \`ListMaster.Header\`, \`ListMaster.Body\`, \`ListMaster.ChipGroup\`, \`ListMaster.Footer\`, \`ListMaster.SelectionControls\`, \`ListMaster.FooterDescription\`, \`ListMaster.FooterControls\`.
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
} satisfies Meta<typeof ListMaster>;

export default meta;

export const Default: StoryObj<typeof ListMaster> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Production-like пример: TabsLine, фильтры в ChipGroup, выбор элементов с шапкой и футером, виды действий, пустое состояние и LightBox с расширенными фильтрами.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};
