import React, { useState } from "react";
import { action } from "storybook/actions";
import { TextField, Text, EComponentSize, EFormFieldStatus, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export interface PlaygroundArgs {
    size: EComponentSize;
    status: EFormFieldStatus;
    label: string;
    prefix: string;
    postfix: string;
    description: string;
    counter: string;
    placeholder: string;
}

export const Playground = ({ label, prefix, postfix, description, counter, placeholder, ...props }: PlaygroundArgs) => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        action("onChange")(event.target.value);
    };

    return (
        <div style={{ maxWidth: "300px" }}>
            <TextField
                {...props}
                label={label || undefined}
                prefix={prefix || undefined}
                postfix={postfix || undefined}
                description={
                    description ? (
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {description}
                        </Text>
                    ) : undefined
                }
                counter={
                    counter ? (
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {counter}
                        </Text>
                    ) : undefined
                }
                inputProps={{ value, onChange: handleChange, placeholder }}
            />
        </div>
    );
};
