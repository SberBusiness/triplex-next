import React from "react";
import { action } from "storybook/actions";
import { useArgs } from "storybook/preview-api";
import { Radio, IRadioProps } from "@sberbusiness/triplex-next";

export const Playground = (args: IRadioProps) => {
    const [, updateArgs] = useArgs<IRadioProps>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        action("onChange")(event);
        updateArgs({ checked: event.target.checked });
    };

    return <Radio {...args} onChange={handleChange} />;
};
