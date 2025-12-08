import React, { useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { DocumentNumberEdit } from "../src/components/DocumentNumberEdit/DocumentNumberEdit";

const meta: Meta<typeof DocumentNumberEdit> = {
    title: "Components/DocumentNumberEdit",
    component: DocumentNumberEdit,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `Компонент для редактирования номера документа.`,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof DocumentNumberEdit>;

export const Default: Story = {
    name: "Default",
    render: () => {
        const [value, setValue] = useState("");

        const handleChange = (event) => setValue(event.target.value);

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
