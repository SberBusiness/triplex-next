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
    name: "Default",
    args: {
        children: "Click me",
        onClick: action("On Click"),
    },
    parameters: {
        docs: {
            description: {
                story: "Default Button",
            },
        },
    },
    render: (args) => <Button {...args} />,
};
export const Disabled = () => <Button disabled>Click me</Button>;
