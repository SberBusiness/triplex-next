import React from "react";
import { Button } from "triplex-next";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";

export default {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
};

export const Default: StoryObj<typeof Button> = {
    name: "Button Default",
    args: {
        label: "Click me",
        onClick: action("On Click"),
    },
    parameters: {
        docs: {
            description: {
                story: "Default Button",
            },
        },
    },
    render: (args) => {
        return <Button {...args}>{args.label}</Button>;
    },
};
export const Disabled = () => <Button disabled>Click me</Button>;
