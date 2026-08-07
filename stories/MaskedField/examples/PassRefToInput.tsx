import React, { useRef, useState } from "react";
import { MaskedField, FormFieldMaskedInput } from "@sberbusiness/triplex-next";

/** Ссылка на элемент input передаётся через maskedInputProps.forwardedRef. */
export const PassRefToInput = () => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ maxWidth: "300px" }}>
            <MaskedField
                label="Label"
                maskedInputProps={{
                    forwardedRef: inputRef,
                    mask: FormFieldMaskedInput.presets.masks.phone,
                    value,
                    onChange: handleChange,
                }}
            />
        </div>
    );
};
