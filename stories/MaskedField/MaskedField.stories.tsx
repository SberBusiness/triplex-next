import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { MaskedField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    PlaygroundArgs,
    MASK_TYPES,
    Default as DefaultRender,
    DefaultSource,
    Sizes as SizesRender,
    SizesSource,
    Statuses as StatusesRender,
    StatusesSource,
    WithPlaceholderMask as WithPlaceholderMaskRender,
    WithPlaceholderMaskSource,
    PassRefToInput as PassRefToInputRender,
    PassRefToInputSource,
    AllMasks as AllMasksRender,
    AllMasksSource,
    Production as ProductionRender,
    ProductionSource,
    VisualTests as VisualTestsRender,
} from "./examples";

export default {
    title: "Components/TextFields/MaskedField",
    component: MaskedField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={MaskedField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof MaskedField>;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    // Props
    size: EComponentSize.LG,
    status: EFormFieldStatus.DEFAULT,
    label: "Label",
    prefix: "",
    postfix: "",
    description: "(21) Description",
    counter: "",
    // Settings
    maskType: "phone",
    placeholder: "",
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер поля",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.LG" },
            },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
            description: "Визуальное состояние",
            table: {
                type: { summary: "EFormFieldStatus" },
                defaultValue: { summary: "EFormFieldStatus.DEFAULT" },
            },
        },
        label: {
            control: { type: "text" },
            description: "Лейбл поля ввода",
        },
        prefix: {
            control: { type: "text" },
            description: "Префикс поля ввода",
        },
        postfix: {
            control: { type: "text" },
            description: "Постфикс поля ввода",
        },
        description: {
            control: { type: "text" },
            description: "Описание поля ввода",
        },
        counter: {
            control: { type: "text" },
            description: "Счетчик символов",
        },
        // Settings
        maskType: {
            control: { type: "select" },
            options: MASK_TYPES,
            description: "Маска из пресетов FormFieldMaskedInput.presets.",
            table: {
                category: "Settings",
            },
        },
        placeholder: {
            control: { type: "text" },
            description: "Текст-заполнитель в поле ввода. Скрывает плейсхолдер маски у незаполненного поля.",
            table: {
                category: "Settings",
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

export const Default: StoryObj<typeof MaskedField> = {
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

export const Sizes: StoryObj<typeof MaskedField> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const Statuses: StoryObj<typeof MaskedField> = {
    render: StatusesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: StatusesSource,
                language: "tsx",
            },
        },
    },
};

export const WithPlaceholderMask: StoryObj<typeof MaskedField> = {
    render: WithPlaceholderMaskRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithPlaceholderMaskSource,
                language: "tsx",
            },
        },
    },
};

export const PassRefToInput: StoryObj<typeof MaskedField> = {
    render: PassRefToInputRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: PassRefToInputSource,
                language: "tsx",
            },
        },
        // Визуально дублирует пустое поле из стори Default — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const AllMasks: StoryObj<typeof MaskedField> = {
    render: AllMasksRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: AllMasksSource,
                language: "tsx",
            },
        },
        // Незаполненные поля всех пресетов визуально идентичны — отображение масок покрыто стори VisualTests.
        testRunner: { skip: true },
    },
};

export const Production: StoryObj<typeof MaskedField> = {
    name: "Example: production",
    render: ProductionRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ProductionSource,
                language: "tsx",
            },
        },
        // Комбинация покрыта скриншотами стори VisualTests.
        testRunner: { skip: true },
    },
};

export const VisualTests: StoryObj<typeof MaskedField> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
    play: async ({ canvas, userEvent }) => {
        const inputs = await canvas.findAllByRole("textbox");

        // Фокус на первом поле (вариант FOCUSED) — показывает плейсхолдер маски.
        await userEvent.click(inputs[0]);
    },
};
