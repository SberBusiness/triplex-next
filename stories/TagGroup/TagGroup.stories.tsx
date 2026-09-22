import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { TagGroup, EComponentSize } from "@sberbusiness/triplex-next";
import {
    IPlaygroundArgs,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Sizes as SizesRender,
    SizesSource,
    WithOverflow as WithOverflowRender,
    WithOverflowSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/TagGroup",
    component: TagGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "TagGroup — контейнер для группы тегов: задаёт отступ между `Tag` и переносит их по строкам, " +
                    "когда ширины контейнера не хватает. `size` группы влияет только на отступ — размер самих тегов " +
                    'задаётся на каждом `Tag` отдельно. Корневой `<div>` получает `role="group"`, поэтому доступное ' +
                    "имя группе задаёт потребитель через `aria-label` или `aria-labelledby`.",
            },
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
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof TagGroup>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    // Props
    size: EComponentSize.LG,
    // Settings
    withEditButton: false,
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        size: {
            description: "Размер — отступ между тегами.",
            control: "select",
            options: Object.values(EComponentSize),
            table: {
                category: "Props",
                type: { summary: "EComponentSize" },
            },
        },
        withEditButton: {
            description: "С кнопкой редактирования у тегов — это prop Tag, а не TagGroup.",
            control: "boolean",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Минимальная группа: `size` для отступа и теги внутри. Свой `size` каждый `Tag` получает отдельно.",
            },
            source: { code: DefaultSource, language: "tsx" },
        },
    },
};

export const Sizes: Story = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Отступ между тегами: SM — 4px, MD — 8px, LG — 12px. На размер самих тегов `size` группы не влияет.",
            },
            source: { code: SizesSource, language: "tsx" },
        },
    },
};

export const WithOverflow: Story = {
    name: "With overflow",
    render: WithOverflowRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Теги не помещаются в ширину контейнера и переносятся на новые строки с тем же отступом.",
            },
            source: { code: WithOverflowSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
