import React, { useState } from "react";
import { TextField, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

const MAX_LENGTH = 201;

export const WithCounter = () => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= MAX_LENGTH) {
            setValue(event.target.value);
        }
    };

    return (
        <div style={{ maxWidth: "300px" }}>
            <TextField
                label="Label"
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        (21) Description
                    </Text>
                }
                counter={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        {value.length}/{MAX_LENGTH}
                    </Text>
                }
                inputProps={{ value, onChange: handleChange, maxLength: MAX_LENGTH, placeholder: "Type to proceed" }}
            />
        </div>
    );
};
