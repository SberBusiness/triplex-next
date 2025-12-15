import React, { useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { DocumentNumberEdit } from "../src/components/DocumentNumberEdit/DocumentNumberEdit";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

const meta: Meta<typeof DocumentNumberEdit> = {
    title: "Components/DocumentNumberEdit",
    component: DocumentNumberEdit,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `Компонент для редактирования номера документа.`,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
};

export default meta;

type Story = StoryObj<typeof DocumentNumberEdit>;

export const Playground: Story = {
    name: "Playground",
    args: {
        buttonLabel: "Изменить",
        emptyNumberButtonLabel: "Задать номер",
        emptyNumberLabel: "Номер документа будет присвоен автоматически",
        numberLabel: "Документ №",
        maxLength: 6,
    },
    argTypes: {
        buttonLabel: {
            control: { type: "text" },
            description: "Текст кнопки редактирования",
            table: {
                type: { summary: "string" },
            },
        },
        emptyNumberButtonLabel: {
            control: { type: "text" },
            description: "Текст кнопки при отсутствии номера",
            table: {
                type: { summary: "string" },
            },
        },
        emptyNumberLabel: {
            control: { type: "text" },
            description: "Текст при отсутствии номера",
            table: {
                type: { summary: "string" },
            },
        },
        numberLabel: {
            control: { type: "text" },
            description: "Текст перед номером документа",
            table: {
                type: { summary: "string" },
            },
        },
        maxLength: {
            control: { type: "select" },
            options: [0, 1, 2, 3, 4, 5, 6],
            description: "Максимальная длина поля ввода",
            table: {
                type: { summary: "0 | 1 | 2 | 3 | 4 | 5 | 6" },
                defaultValue: { summary: "6" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["buttonLabel", "emptyNumberButtonLabel", "emptyNumberLabel", "numberLabel", "maxLength"],
        },
    },
    render: (args) => {
        const [value, setValue] = useState("");

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

        return <DocumentNumberEdit {...args} value={value} onChange={handleChange} />;
    },
};

export const Default: Story = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState("");

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

        return (
            <DocumentNumberEdit
                value={value}
                buttonLabel="Изменить"
                emptyNumberButtonLabel="Задать номер"
                emptyNumberLabel="Номер документа будет присвоен автоматически"
                numberLabel="Документ №"
                onChange={handleChange}
            />
        );
    },
};
