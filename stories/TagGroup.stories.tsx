import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Tag, TagGroup } from "../src";
import { EComponentSize } from "../src/enums";

const meta = {
    title: "Components/TagGroup",
    component: TagGroup,
    tags: ["autodocs"],
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
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
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Object.values(EComponentSize).map((size) => (
                <div key={size}>
                    <h4>{sizeToLabelMap[size]}</h4>
                    <TagGroup {...args} size={size}>
                        {tags.map((tag) => (
                            <Tag key={tag.id} size={size} {...tag} />
                        ))}
                    </TagGroup>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Группы тегов разных размеров.",
            },
        },
    },
};

export const WithOverflow: Story = {
    name: "With overflow",
    args: {
        size: EComponentSize.LG,
    },
    render: (args) => (
        <div style={{ width: "400px", border: "1px dashed #808080" }}>
            <TagGroup {...args}>
                {Array.from({ length: 10 }, (_, i) => (
                    <Tag key={i} id={`tag-${i}`} size={args.size}>
                        Tag {i}
                    </Tag>
                ))}
            </TagGroup>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Группа тегов в ограниченном по ширине контейнере.",
            },
        },
    },
};
