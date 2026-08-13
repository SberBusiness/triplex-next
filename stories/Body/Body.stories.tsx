import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { Body } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    WithFullWidthContent as WithFullWidthContentRender,
    WithFullWidthContentSource,
    Example as ExampleRender,
    ExampleSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/Body",
    component: Body,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Body — контейнер основного контента. Корневой элемент является flex-контейнером, " +
                    "внутренняя обёртка растягивает контент на всю доступную ширину. " +
                    "Настраиваемых props нет — принимает `children` и стандартные HTML-атрибуты `div`. " +
                    "Собственных отступов не задаёт: их добавляет потребитель, например `BodyPage` (`Page.Body`).",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Body>;

export default meta;

export const Default: StoryObj<typeof Body> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithFullWidthContent: StoryObj<typeof Body> = {
    render: WithFullWidthContentRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithFullWidthContentSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof Body> = {
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof Body> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
};
