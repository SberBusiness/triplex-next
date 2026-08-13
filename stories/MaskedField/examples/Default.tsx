import React, { useState } from "react";
import { MaskedField, FormFieldMaskedInput } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ maxWidth: "300px" }}>
            <MaskedField
                label="Label"
                maskedInputProps={{
                    mask: FormFieldMaskedInput.presets.masks.phone,
                    value,
                    onChange: handleChange,
                }}
            />
        </div>
    );
};
