import React, { useState } from "react";
import {
    EFontType,
    ETextSize,
    FormField,
    FormFieldCounter,
    FormFieldDescription,
    FormFieldLabel,
    FormFieldTextarea,
    FormGroup,
    Text,
} from "@sberbusiness/triplex-next";

export const TextareaExample = () => {
    const [value, setValue] = useState("");
    const maxLength = 201;
    return (
        <div style={{ maxWidth: "300px" }}>
            <FormGroup>
                <FormField>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldTextarea
                        value={value}
                        onChange={(e) => e.target.value.length <= maxLength && setValue(e.target.value)}
                    />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Описание поля
                    </Text>
                    <FormFieldCounter>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {value.length}/{maxLength}
                        </Text>
                    </FormFieldCounter>
                </FormFieldDescription>
            </FormGroup>
        </div>
    );
};
