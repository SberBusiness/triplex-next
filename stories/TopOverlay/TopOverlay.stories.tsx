import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { TopOverlay } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    ITopOverlayPlaygroundProps,
    Playground as PlaygroundRender,
    VisualTests as VisualTestsRender,
    WithConfirm as WithConfirmRender,
    WithConfirmSource,
} from "./examples";

const STORY_META_DESCRIPTION = `
Компонент **TopOverlay** — верхняя панель поверх контента \`LightBox\`: затемняющая маска на всю ширину экрана и выезжающая сверху панель.

- **Назначение**: подтверждения и короткие сообщения, перекрывающие контент лайтбокса.
- **Состояние**: полностью управляемое — открытием заведует свойство \`opened\`.
- **Доступность**: пока панель открыта, фокус удерживается внутри неё (\`FocusTrapExtended\`).
- **Позиционирование**: пересчитывается при открытии, чтобы панель встала по верхней границе экрана лайтбокса даже при прокрученном контенте.

Компонент реэкспортируется как \`LightBox.TopOverlay\` — это один и тот же компонент.
Родительскому \`LightBox\` нужно передать \`isTopOverlayOpened\`, чтобы он приглушил контролы под панелью.
`;

const meta = {
    title: "Components/TopOverlay",
    component: TopOverlay,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: STORY_META_DESCRIPTION,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TopOverlay} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof TopOverlay>;

export default meta;

export const Playground: StoryObj<ITopOverlayPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        opened: false,
    },
    argTypes: {
        opened: {
            control: { type: "boolean" },
            description: "Верхняя панель открыта",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
    },
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: ["opened"],
        },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
    render: (args) => <PlaygroundRender {...args} />,
};

export const Default: StoryObj<typeof TopOverlay> = {
    render: () => <DefaultRender />,
    parameters: {
        // Лайтбокс с панелью открывается по клику — статичный скриншот показал бы только кнопку.
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithConfirm: StoryObj<typeof TopOverlay> = {
    render: () => <WithConfirmRender />,
    parameters: {
        // Лайтбокс с панелью открывается по клику — статичный скриншот показал бы только кнопку.
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: WithConfirmSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof TopOverlay> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => <VisualTestsRender />,
};
