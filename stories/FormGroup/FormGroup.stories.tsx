import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { FormGroup } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Example as ExampleRender,
    ExampleSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/FormGroup",
    component: FormGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "FormGroup — контейнер формы, объединяющий поле ввода с относящимися к нему элементами: " +
                    "`FormField`, `FormFieldDescription`, `HelpBox`, `Alert`. Части передаются декларативно " +
                    "через `children`, поэтому каждой можно задать свои props и data-атрибуты. " +
                    "Настраиваемых props нет — принимает `children` и стандартные HTML-атрибуты `div`. " +
                    "Собственных стилей и отступов не задаёт: расстояния между частями задают сами части.",
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
} satisfies Meta<typeof FormGroup>;

export default meta;

export const Default: StoryObj<typeof FormGroup> = {
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

export const Example: StoryObj<typeof FormGroup> = {
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

export const VisualTests: StoryObj<typeof FormGroup> = {
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
