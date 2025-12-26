import React from "react";
import { Controls, Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { Meta, StoryObj } from "@storybook/react";
import { TagColor } from "../src/components/TagColor";
import { EComponentSize } from "../src/enums";
import { ETagColorStatus } from "../src/components/TagColor/enums";
import { Gap } from "../src/components/Gap";

const meta = {
    title: "Components/TagColor",
    component: TagColor,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент, который используется для маркировки и классификации.

## Особенности

- Размеры - small (SM), medium (MD), large (LG)
- Статусы - default(по умолчанию), success, info, warning, error

## Использование

\`\`\`tsx
import { TagColor } from '@sberbusiness/triplex-next';   

<TagColor size={EComponentSize.LG} status={ETagColorStatus.SUCCESS}>Tag text</TagColor>
\`\`\`
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG],
            description: "Размер компонента",
        },
        status: {
            control: { type: "select" },
            options: [
                ETagColorStatus.DEFAULT,
                ETagColorStatus.SUCCESS,
                ETagColorStatus.INFO,
                ETagColorStatus.WARNING,
                ETagColorStatus.ERROR,
            ],
            description: "Статус",
        },
        children: {
            control: { type: "text" },
            description: "Текст тега",
        },
    },
} satisfies Meta<typeof TagColor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<typeof TagColor> = {
    args: {
        size: EComponentSize.MD,
        status: ETagColorStatus.SUCCESS,
        children: "Tag text",
    },
    render: (args) => <TagColor {...args}>{args.children}</TagColor>,
};

export const Default: StoryObj<typeof TagColor> = {
    args: {
        size: EComponentSize.MD,
        status: ETagColorStatus.DEFAULT,
        children: "Tag text",
    },
    parameters: {
        docs: {
            description: {
                story: "Тег без выбранного статуса.",
            },
        },
        controls: {
            disable: true,
        },
    },
    render: (args) => <TagColor {...args}>{args.children}</TagColor>,
};

export const DifferentSizes: Story = {
    args: {
        status: ETagColorStatus.INFO,
        children: "Tag text",
    },
    parameters: {
        docs: {
            description: {
                story: "Теги разных размеров: small (SM), medium (MD), large (LG).",
            },
        },
        controls: {
            disable: true,
        },
    },
    render: (args) => (
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <TagColor {...args} size={EComponentSize.SM}>
                {args.children}
            </TagColor>
            <Gap size={16} />
            <TagColor {...args} size={EComponentSize.MD}>
                {args.children}
            </TagColor>
            <Gap size={16} />
            <TagColor {...args} size={EComponentSize.LG}>
                {args.children}
            </TagColor>
        </div>
    ),
};

export const DifferentStatuses: StoryObj<typeof TagColor> = {
    args: {
        children: "Tag text",
        size: EComponentSize.MD,
    },
    parameters: {
        docs: {
            description: {
                story: "Теги с разными цветовыми статусами: default(по умолчанию), success, info, warning, error.",
            },
        },
        controls: {
            disable: true,
        },
    },
    render: (args) => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <TagColor {...args} size={args.size}>
                {args.children}
            </TagColor>
            <Gap size={16} />
            <TagColor {...args} status={ETagColorStatus.SUCCESS}>
                {args.children}
            </TagColor>
            <Gap size={16} />
            <TagColor {...args} status={ETagColorStatus.INFO}>
                {args.children}
            </TagColor>
            <Gap size={16} />
            <TagColor {...args} status={ETagColorStatus.WARNING}>
                {args.children}
            </TagColor>
            <Gap size={16} />
            <TagColor {...args} status={ETagColorStatus.ERROR}>
                {args.children}
            </TagColor>
        </div>
    ),
};

export const WithOverflow: Story = {
    name: "With overflow",
    args: {
        size: EComponentSize.LG,
        status: ETagColorStatus.DEFAULT,
        children: "Very long tag text that should be truncated with ellipsis",
    },
    parameters: {
        docs: {
            description: {
                story: "Тег с длинным текстом, который обрезается многоточием.",
            },
        },
        controls: {
            disable: true,
        },
    },
    render: (args) => (
        <div style={{ maxWidth: "400px" }}>
            <TagColor {...args}>{args.children}</TagColor>
        </div>
    ),
};
