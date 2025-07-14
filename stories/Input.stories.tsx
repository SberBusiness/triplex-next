import React from "react";
import { Input } from "../src";
import { StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
    title: "Components/Input",
    component: Input,
    tags: ["autodocs"],
};

export const Default: StoryObj<typeof Input> = {
    name: "Input  Default",
    args: {
        placeholder: "Введите текст",
        onFocus: action("On Focus"),
        onBlur: action("On Blur"),
    },
    argTypes: {
        value: { control: false },
    },
    parameters: {
        docs: {
            description: {
                story: "Default Input",
            },
        },
    },
    render: (args) => {
        return <Input {...args} />;
    },
};
export const Disabled = () => <Input placeholder="Enter text" disabled />;
