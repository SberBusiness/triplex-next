import React, { useState } from "react";
import { FormField, FormFieldInput, FormFieldLabel } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState("");
    return (
        <div style={{ maxWidth: "300px" }}>
            <FormField>
                <FormFieldLabel>Название поля</FormFieldLabel>
                <FormFieldInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Введите текст..."
                />
            </FormField>
        </div>
    );
};
