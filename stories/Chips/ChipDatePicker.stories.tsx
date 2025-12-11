import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipDatePicker } from "../../src/components/Chip/ChipDatePicker/ChipDatePicker";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { EDropdownAlignment } from "../../src/components/Dropdown/enums";

export default {
    title: "Components/Chips/ChipDatePicker",
    component: ChipDatePicker,
    tags: ["autodocs"],
    parameters: {},
};

export const Playground: StoryObj<typeof ChipDatePicker> = {
    render: () => {
        const [value, setValue] = useState("");

        return (
            <ChipDatePicker
                value={value}
                label="Date label"
                onChange={setValue}
                displayedValue={"Date value"}
                alignment={EDropdownAlignment.LEFT}
                size={EComponentSize.MD}
                status="default"
            />
        );
    },
    args: {},
    argTypes: {},
};
