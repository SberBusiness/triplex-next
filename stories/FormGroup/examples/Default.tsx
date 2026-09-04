import React, { useState } from "react";
import {
    EFontType,
    ETextSize,
    FormField,
    FormFieldDescription,
    FormFieldInput,
    FormFieldLabel,
    FormGroup,
    Text,
} from "@sberbusiness/triplex-next";

export const Default = () => {
    const [value, setValue] = useState("");

    return (
        <div style={{ maxWidth: "300px" }}>
            <FormGroup>
                <FormField>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput value={value} onChange={(event) => setValue(event.target.value)} />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Описание поля
                    </Text>
                </FormFieldDescription>
            </FormGroup>
        </div>
    );
};
