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

export interface IFormFieldPlaygroundProps extends React.ComponentProps<typeof FormField> {
    labelText?: string;
    placeholder?: string;
    showClear?: boolean;
    descriptionText?: string;
    counter?: string;
}

export const PlaygroundExample = (args: IFormFieldPlaygroundProps) => {
    const [value, setValue] = useState("");
    const { labelText, placeholder, descriptionText, counter, ...formFieldProps } = args;
    return (
        <div style={{ maxWidth: "300px" }}>
            <FormGroup>
                <FormField {...formFieldProps}>
                    <FormFieldLabel>{labelText || "Название поля"}</FormFieldLabel>
                    <FormFieldInput
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder || "Введите текст..."}
                    />
                </FormField>
                {(descriptionText || counter) && (
                    <FormFieldDescription>
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {descriptionText || "Описание поля"}
                        </Text>
                    </FormFieldDescription>
                )}
            </FormGroup>
        </div>
    );
};
