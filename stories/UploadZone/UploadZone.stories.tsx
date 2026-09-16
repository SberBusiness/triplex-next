import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { UploadZone } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    PlaygroundSource,
    DefaultRender,
    DefaultSource,
    WithDropZoneContainerRender,
    WithDropZoneContainerSource,
    ProductionRender,
    ProductionSource,
    VisualTestsRender,
    type PlaygroundArgs,
} from "./examples";

export default {
    title: "Components/UploadZone",
    component: UploadZone,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Зона загрузки файлов: кликабельная область с выбором файлов через системный диалог и дроп-зона для перетаскивания.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={UploadZone} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof UploadZone>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Settings
    multiple: true,
    withDropZoneContainer: true,
    withContainerContent: true,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Settings
        multiple: {
            control: "boolean",
            description: "Выбор нескольких файлов в UploadZone.Input.",
            table: {
                category: "Settings",
                defaultValue: { summary: "true" },
            },
        },
        withDropZoneContainer: {
            control: "boolean",
            description: "Передавать внешний контейнер в dropZoneContainer.",
            table: {
                category: "Settings",
                defaultValue: { summary: "true" },
            },
        },
        withContainerContent: {
            control: "boolean",
            description: "Рисовать контент дроп-зоны через renderContainerContent.",
            table: {
                category: "Settings",
                defaultValue: { summary: "true" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
            source: {
                code: PlaygroundSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof UploadZone> = {
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

export const WithDropZoneContainer: StoryObj<typeof UploadZone> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithDropZoneContainerSource,
                language: "tsx",
            },
        },
    },
    render: WithDropZoneContainerRender,
};

export const Production: StoryObj<typeof UploadZone> = {
    name: "Example: production",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ProductionSource,
                language: "tsx",
            },
        },
        testRunner: { skip: true },
    },
    render: ProductionRender,
};

export const VisualTests: StoryObj<typeof UploadZone> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
    play: async ({ canvas }) => {
        const dropContainer = await canvas.findByTestId("uploadzone-drop-container");

        // Компонент слушает dragenter на контейнере дроп-зоны — эмулируем перетаскивание файла над блоком.
        dropContainer.dispatchEvent(new Event("dragenter", { bubbles: true }));

        // Оверлей монтируется в отдельный React-root, то есть не в том же тике. Без ожидания
        // скриншот может сняться в состоянии покоя и молча уехать в baseline.
        await canvas.findByText("Положите файлы сюда");
    },
};
