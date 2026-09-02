import React, { useState } from "react";
import { SmallInput } from "@sberbusiness/triplex-next";
import { action } from "storybook/actions";

export type PlaygroundArgs = Pick<
    React.ComponentProps<typeof SmallInput>,
    "placeholder" | "maxLength" | "disabled" | "readOnly"
>;

export const Playground = (args: PlaygroundArgs) => {
    const [value, setValue] = useState("");

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value);
        action("onChange")(event);
    };

    return (
        <div style={{ width: "120px" }}>
            <SmallInput {...args} value={value} onChange={handleChange} />
        </div>
    );
};
