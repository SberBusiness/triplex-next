import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Tag, TagGroup } from "../src";
import { EComponentSize } from "../src/enums";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

const meta = {
    title: "Components/TagGroup",
    component: TagGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Basic} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        size: {
            options: Object.values(EComponentSize),
        },
    },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = [
    { children: "Selected value", id: "tag-1" },
    { children: "Selected value", id: "tag-2" },
    { children: "Selected value", id: "tag-3" },
];

export const Basic: Story = {
    name: "Basic",
    args: {
        size: EComponentSize.LG,
    },
    render: (args) => (
        <TagGroup {...args}>
            {tags.map((tag) => (
                <Tag key={tag.id} size={args.size} {...tag} />
            ))}
        </TagGroup>
    ),
    parameters: {
        controls: {
            include: ["size"],
        },
        docs: {
            description: {
                story: "Базовая группа тегов.",
            },
        },
    },
};

const sizeToLabelMap = {
    [EComponentSize.SM]: "SM",
    [EComponentSize.MD]: "MD",
    [EComponentSize.LG]: "LG",
};

export const Sizes: Story = {
    name: "Sizes",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Группы тегов разных размеров.",
            },
        },
    },
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Object.values(EComponentSize).map((size) => (
                <div key={size}>
                    <h4>{sizeToLabelMap[size]}</h4>
                    <TagGroup size={size}>
                        {tags.map((tag) => (
                            <Tag key={tag.id} size={size} {...tag} />
                        ))}
                    </TagGroup>
                </div>
            ))}
        </div>
    ),
};

export const WithOverflow: Story = {
    name: "With overflow",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Группа тегов в ограниченном по ширине контейнере.",
            },
        },
    },
    render: () => (
        <div style={{ width: "400px", border: "1px dashed #808080" }}>
            <TagGroup size={EComponentSize.LG}>
                {Array.from({ length: 10 }, (_, i) => (
                    <Tag key={i} id={`tag-${i}`} size={EComponentSize.LG}>
                        Tag {i}
                    </Tag>
                ))}
            </TagGroup>
        </div>
    ),
};
