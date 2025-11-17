import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "../src/components/Tag";
import { EComponentSize } from "../src/enums";

const meta = {
    title: "Components/Tag",
    component: Tag,
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
        onEdit: {
            action: "edited",
        },
        onRemove: {
            action: "removed",
        },
    },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        children: "Selected value",
        id: "basic-tag",
        size: EComponentSize.LG,
        disabled: false,
        onEdit: undefined,
    },
    parameters: {
        docs: {
            description: {
                story: "Базовый тег с функцией удаления.",
            },
        },
    },
};

export const Edit: Story = {
    args: {
        children: "Selected value",
        id: "editable-tag",
        size: EComponentSize.LG,
    },
    parameters: {
        docs: {
            description: {
                story: "Тег с возможностью редактирования и удаления.",
            },
        },
    },
};

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Tag {...args} id="small-tag" size={EComponentSize.SM}>
                Selected value
            </Tag>
            <Tag {...args} id="medium-tag" size={EComponentSize.MD}>
                Selected value
            </Tag>
            <Tag {...args} id="large-tag" size={EComponentSize.LG}>
                Selected value
            </Tag>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Теги разных размеров: SM, MD, LG.",
            },
        },
    },
};

export const Disabled: Story = {
    args: {
        children: "Selected value",
        id: "disabled-tag",
        size: EComponentSize.LG,
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Отключенный тег.",
            },
        },
    },
};

export const WithCustomButtonProps: Story = {
    name: "With custom button props",
    args: {
        children: "Selected value",
        id: "custom-props-tag",
        size: EComponentSize.LG,
        editButtonProps: {
            title: "Edit tag",
            "aria-label": "Edit tag",
        },
        removeButtonProps: {
            title: "Remove tag",
            "aria-label": "Remove tag",
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Тег с кастомными свойствами для кнопок редактирования и удаления.",
            },
        },
    },
};

export const WithOverflow: Story = {
    name: "With overflow",
    render: (args) => (
        <div style={{ maxWidth: "440px" }}>
            <Tag {...args} id="long-tag" size={EComponentSize.LG}>
                Very long tag text that should be truncated with ellipsis
            </Tag>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Тег с длинным текстом, который обрезается многоточием.",
            },
        },
    },
};
