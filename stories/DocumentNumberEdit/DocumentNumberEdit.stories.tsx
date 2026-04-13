import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DocumentNumberEdit } from "../../src/components/DocumentNumberEdit/DocumentNumberEdit";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { PlaygroundExample, DefaultExample, DefaultExampleSource, VisualTestsExample } from "./examples/index";

const meta = {
    title: "Components/DocumentNumberEdit",
    component: DocumentNumberEdit,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Компонент для редактирования номера документа.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={DocumentNumberEdit} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof DocumentNumberEdit>;

export default meta;
type Story = StoryObj<typeof DocumentNumberEdit>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        buttonLabel: "Изменить",
        emptyNumberButtonLabel: "Задать номер",
        emptyNumberLabel: "Номер документа будет присвоен автоматически",
        numberLabel: "Документ №",
        maxLength: 6,
    },
    argTypes: {
        buttonLabel: { control: { type: "text" }, description: "Текст кнопки редактирования" },
        emptyNumberButtonLabel: { control: { type: "text" }, description: "Текст кнопки при отсутствии номера" },
        emptyNumberLabel: { control: { type: "text" }, description: "Текст при отсутствии номера" },
        numberLabel: { control: { type: "text" }, description: "Текст перед номером документа" },
        maxLength: {
            control: { type: "select" },
            options: [0, 1, 2, 3, 4, 5, 6],
            description: "Максимальная длина поля ввода",
        },
    },
    parameters: {
        controls: {
            include: ["buttonLabel", "emptyNumberButtonLabel", "emptyNumberLabel", "numberLabel", "maxLength"],
        },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { skip: true },
    },
    render: PlaygroundExample,
};

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    render: VisualTestsExample,
    play: async ({ canvas, userEvent }) => {
        const links = await canvas.findAllByRole("link");
        await userEvent.click(links[0]);
    },
};
