import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { Tag, TagGroup } from "../src";
import { EComponentSize } from "../src/enums";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";

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
                    <Heading>Props</Heading>
                    <ArgTypes of={TagGroup} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
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

const tags = [
    { children: "Selected value", id: "tag-1" },
    { children: "Selected value", id: "tag-2" },
    { children: "Selected value", id: "tag-3" },
];

export const Playground: StoryObj<typeof meta> = {
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.MD,
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
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
};

export const Default: StoryObj<typeof meta> = {
    args: {
        size: EComponentSize.LG,
        onRemove: action("removed"),
    },
    render: ({ onRemove, ...restArgs }) => (
        <TagGroup {...restArgs}>
            {tags.map((tag) => (
                <Tag key={tag.id} size={restArgs.size} onRemove={onRemove} {...tag} />
            ))}
        </TagGroup>
    ),
    parameters: {
        testRunner: { skip: true },
    },
};

export const Editable: StoryObj<typeof meta> = {
    args: {
        size: EComponentSize.LG,
        onEdit: action("edited"),
        onRemove: action("removed"),
    },
    render: ({ onEdit, onRemove, ...restArgs }) => (
        <TagGroup {...restArgs}>
            {tags.map((tag) => (
                <Tag key={tag.id} size={restArgs.size} onEdit={onEdit} onRemove={onRemove} {...tag} />
            ))}
        </TagGroup>
    ),
    parameters: {
        testRunner: { skip: true },
    },
};

const sizeToLabelMap = {
    [EComponentSize.SM]: "SM",
    [EComponentSize.MD]: "MD",
    [EComponentSize.LG]: "LG",
};

export const Sizes: StoryObj<typeof meta> = {
    name: "Sizes",
    parameters: {
        controls: { disable: true },
    },
    args: {
        onEdit: action("edited"),
        onRemove: action("removed"),
    },
    render: ({ onEdit, onRemove }) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Object.values(EComponentSize).map((size) => (
                <div key={size}>
                    <h4>{sizeToLabelMap[size]}</h4>
                    <TagGroup size={size}>
                        {tags.map((tag) => (
                            <Tag key={tag.id} size={size} onEdit={onEdit} onRemove={onRemove} {...tag} />
                        ))}
                    </TagGroup>
                </div>
            ))}
        </div>
    ),
};

export const WithOverflow: StoryObj<typeof meta> = {
    name: "With overflow",
    parameters: {
        controls: { disable: true },
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
