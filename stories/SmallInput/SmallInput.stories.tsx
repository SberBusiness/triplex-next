import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { SmallInput } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    PlaygroundArgs,
    Default as DefaultRender,
    DefaultSource,
    Disabled as DisabledRender,
    DisabledSource,
    ReadOnly as ReadOnlyRender,
    ReadOnlySource,
    Production as ProductionRender,
    ProductionSource,
    VisualTests as VisualTestsRender,
} from "./examples";

export default {
    title: "Components/SmallInput",
    component: SmallInput,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компактное текстовое поле ввода высотой 20px без лейбла и статусов — для инлайн-редактирования в плотной вёрстке.

Собственных props у компонента нет: \`ISmallInputProps\` расширяет \`React.InputHTMLAttributes<HTMLInputElement>\`, поэтому принимаются все стандартные атрибуты \`<input>\` (\`value\`, \`onChange\`, \`placeholder\`, \`maxLength\`, \`disabled\`, \`readOnly\`, \`aria-*\`, \`data-*\`). Атрибут \`type\` всегда \`text\` и переданный извне не применяется.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SmallInput>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    placeholder: "000000",
    maxLength: 6,
    disabled: false,
    readOnly: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        placeholder: {
            control: "text",
            description: "Текст-подсказка в пустом поле.",
            table: { category: "Props" },
        },
        maxLength: {
            control: "number",
            description: "Максимальное число вводимых символов.",
            table: { category: "Props" },
        },
        disabled: {
            control: "boolean",
            description: "Поле отключено.",
            table: { category: "Props", defaultValue: { summary: "false" } },
        },
        readOnly: {
            control: "boolean",
            description: "Поле только для чтения.",
            table: { category: "Props", defaultValue: { summary: "false" } },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof SmallInput> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
        // Состояние повторяется вариантом PLACEHOLDER в VisualTests.
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

export const Disabled: StoryObj<typeof SmallInput> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DisabledSource,
                language: "tsx",
            },
        },
        // Состояние повторяется вариантом DISABLED в VisualTests.
        testRunner: { skip: true },
    },
    render: DisabledRender,
};

export const ReadOnly: StoryObj<typeof SmallInput> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ReadOnlySource,
                language: "tsx",
            },
        },
        // Состояние повторяется вариантом READ ONLY в VisualTests.
        testRunner: { skip: true },
    },
    render: ReadOnlyRender,
};

export const Production: StoryObj<typeof SmallInput> = {
    name: "Example: production",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ProductionSource,
                language: "tsx",
            },
        },
        // Композиция из примера, само поле не добавляет состояний сверх VisualTests.
        testRunner: { skip: true },
    },
    render: ProductionRender,
};

export const VisualTests: StoryObj<typeof SmallInput> = {
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
