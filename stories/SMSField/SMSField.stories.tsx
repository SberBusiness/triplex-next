import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { SMSField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Error as ErrorRender,
    ErrorSource,
    Disabled as DisabledRender,
    DisabledSource,
    Sizes as SizesRender,
    SizesSource,
    Example as ExampleRender,
    ExampleSource,
    VisualTests as VisualTestsRender,
    VisualTestsFocused as VisualTestsFocusedRender,
    VisualTestsErrorFocused as VisualTestsErrorFocusedRender,
    VisualTestsSubmitHovered as VisualTestsSubmitHoveredRender,
    VisualTestsRefreshHovered as VisualTestsRefreshHoveredRender,
    type IPlaygroundArgs,
} from "./examples";

export default {
    title: "Components/SMSField",
    component: SMSField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Управляемое поле ввода СМС-кода. Составные части SMSField.Input, SMSField.Refresh, SMSField.Submit и SMSField.Tooltip получают code, size и status через контекст. Обратный отсчёт для повторного запроса управляется снаружи.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SMSField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SMSField>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    size: EComponentSize.MD,
    status: EFormFieldStatus.DEFAULT,
    description: "",
    errorText: "Неверный код",
    maxLength: 8,
    placeholder: "Введите код",
    withCounter: false,
};

const VISUAL_TEST_PARAMETERS = {
    controls: { disable: true },
    docs: { canvas: { sourceState: "none" }, codePanel: false },
};

type TStory = StoryObj<typeof SMSField>;

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        size: {
            control: "select",
            options: Object.values(EComponentSize),
            description: "Размер поля и вложенных элементов.",
            table: { category: "Props" },
        },
        status: {
            control: "select",
            options: [EFormFieldStatus.DEFAULT, EFormFieldStatus.ERROR, EFormFieldStatus.DISABLED],
            description: "Состояние поля. WARNING не поддерживается.",
            table: { category: "Props" },
        },
        description: {
            control: "text",
            description: "Описание под полем ввода.",
            table: { category: "Input" },
        },
        errorText: {
            control: "text",
            description: "Заменяет placeholder вне фокуса в статусе ERROR.",
            table: { category: "Input" },
        },
        maxLength: {
            control: { type: "number", min: 1 },
            description: "Максимальная длина кода. Вводятся только цифры.",
            table: { category: "Input" },
        },
        placeholder: {
            control: "text",
            table: { category: "Input" },
        },
        withCounter: {
            control: "boolean",
            description: "Показать счётчик введённых символов.",
            table: { category: "Settings" },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: TStory = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultSource, language: "tsx" } },
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

export const Error: TStory = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: ErrorSource, language: "tsx" } },
    },
    render: ErrorRender,
};

export const Disabled: TStory = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DisabledSource, language: "tsx" } },
    },
    render: DisabledRender,
};

export const Sizes: TStory = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: SizesSource, language: "tsx" } },
    },
    render: SizesRender,
};

export const Example: TStory = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: ExampleSource, language: "tsx" } },
        testRunner: { skip: true },
    },
    render: ExampleRender,
};

export const VisualTests: TStory = {
    tags: ["!autodocs", "!dev"],
    parameters: VISUAL_TEST_PARAMETERS,
    render: VisualTestsRender,
};

export const VisualTestsFocused: TStory = {
    tags: ["!autodocs", "!dev"],
    parameters: VISUAL_TEST_PARAMETERS,
    render: VisualTestsFocusedRender,
    play: async ({ canvas, userEvent }) => {
        await userEvent.click(canvas.getByRole("textbox", { name: "СМС-код" }));
    },
};

export const VisualTestsErrorFocused: TStory = {
    tags: ["!autodocs", "!dev"],
    parameters: VISUAL_TEST_PARAMETERS,
    render: VisualTestsErrorFocusedRender,
    play: async ({ canvas, userEvent }) => {
        await userEvent.click(canvas.getByRole("textbox", { name: "СМС-код" }));
    },
};

export const VisualTestsSubmitHovered: TStory = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        ...VISUAL_TEST_PARAMETERS,
        testRunner: { hover: { role: "button", name: "Отправить код" } },
    },
    render: VisualTestsSubmitHoveredRender,
    play: async ({ canvas, userEvent }) => {
        await userEvent.hover(canvas.getByRole("button", { name: "Отправить код" }));
    },
};

export const VisualTestsRefreshHovered: TStory = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        ...VISUAL_TEST_PARAMETERS,
        testRunner: { hover: { role: "button", name: "Запросить новый код" } },
    },
    render: VisualTestsRefreshHoveredRender,
    play: async ({ canvas, userEvent }) => {
        await userEvent.hover(canvas.getByRole("button", { name: "Запросить новый код" }));
    },
};
