import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "../src/components/Tag";
import { EComponentSize } from "../src/enums";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

const meta = {
    title: "Components/Tag",
    component: Tag,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
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

export const Playground: Story = {
    name: "Playground",
    args: {
        children: "Selected value",
        id: "playground-tag",
        size: EComponentSize.LG,
        disabled: false,
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Контент тега",
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер тега",
        },
        disabled: {
            control: { type: "boolean" },
            description: "Состояние disabled",
        },
    },
    parameters: {
        controls: {
            include: ["children", "size", "disabled"],
        },
    },
};

export const Default: Story = {
    name: "Default",
    args: {
        children: "Selected value",
        id: "default-tag",
        size: EComponentSize.LG,
    },
    parameters: {
        controls: { disable: true },
    },
};

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
        controls: { disable: true },
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
        controls: { disable: true },
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Tag id="small-tag" size={EComponentSize.SM}>
                Selected value
            </Tag>
            <Tag id="medium-tag" size={EComponentSize.MD}>
                Selected value
            </Tag>
            <Tag id="large-tag" size={EComponentSize.LG}>
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
        controls: { disable: true },
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
        controls: { disable: true },
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
        controls: { disable: true },
    },
};

export const WithOverflow: Story = {
    name: "With overflow",
    render: () => (
        <div style={{ maxWidth: "440px" }}>
            <Tag id="long-tag" size={EComponentSize.LG}>
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
        controls: { disable: true },
    },
};
