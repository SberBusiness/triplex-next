import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { Overlay, EOverlayDirection } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Directions as DirectionsRender,
    DirectionsSource,
    Fixed as FixedRender,
    FixedSource,
    IOverlayPlaygroundProps,
    Playground as PlaygroundRender,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/Overlay",
    component: Overlay,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Компонент Overlay — затемняющий слой с выезжающей панелью из выбранной стороны контейнера или страницы.\n\n- **Расположение панели**: RIGHT, LEFT, TOP, BOTTOM\n- **Режимы позиционирования**: relative (по родителю) и fixed (на всю страницу)\n- **События**: opening, open, closing, close\n- **Доступность**: кликабельная маска, управление с клавиатуры в содержимом панели",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Overlay} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Overlay>;

export default meta;

export const Playground: StoryObj<IOverlayPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        direction: EOverlayDirection.RIGHT,
        fixed: false,
        opened: false,
        label: "Открыть оверлей",
    },
    argTypes: {
        direction: {
            control: { type: "select" },
            options: Object.values(EOverlayDirection),
            description: "Расположение панели",
            table: {
                type: { summary: "EOverlayDirection" },
                defaultValue: { summary: "EOverlayDirection.RIGHT" },
            },
        },
        fixed: {
            control: { type: "boolean" },
            description: "Фиксированное позиционирование на всю страницу",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        opened: {
            control: { type: "boolean" },
            description: "Состояние открытости",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        label: {
            control: { type: "text" },
            description: "Текст кнопки открытия",
            table: {
                category: "Settings",
                type: { summary: "string" },
                defaultValue: { summary: "Открыть оверлей" },
            },
        },
    },
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: ["direction", "fixed", "opened", "label"],
        },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
    render: (args) => <PlaygroundRender {...args} />,
};

export const Default: StoryObj<typeof Overlay> = {
    render: DefaultRender,
    parameters: {
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

export const Directions: StoryObj<typeof Overlay> = {
    render: DirectionsRender,
    parameters: {
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: DirectionsSource,
                language: "tsx",
            },
        },
    },
};

export const Fixed: StoryObj<typeof Overlay> = {
    render: FixedRender,
    parameters: {
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: FixedSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof Overlay> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => <VisualTestsRender />,
    play: async ({ canvas, userEvent }) => {
        const openButtons = await canvas.findAllByRole("button", { name: /^Открыть / });

        for (const button of openButtons) {
            await userEvent.click(button);
        }
    },
};
