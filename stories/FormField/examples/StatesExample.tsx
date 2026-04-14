import React, { useState } from "react";
import {
    EFontType,
    EFormFieldStatus,
    ETextSize,
    FormField,
    FormFieldDescription,
    FormFieldInput,
    FormFieldLabel,
    FormGroup,
    Gap,
    Text,
} from "@sberbusiness/triplex-next";

export const StatesExample = () => {
    const [v, setV] = useState("");
    const [e, setE] = useState("");
    const [w, setW] = useState("");

    return (
        <div style={{ maxWidth: "300px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Default</div>
            <FormGroup>
                <FormField>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput value={v} onChange={(x) => setV(x.target.value)} />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Описание поля
                    </Text>
                </FormFieldDescription>
            </FormGroup>
            <Gap size={24} />
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Error</div>
            <FormGroup>
                <FormField status={EFormFieldStatus.ERROR}>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput value={e} onChange={(x) => setE(x.target.value)} />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                        Текст ошибки
                    </Text>
                </FormFieldDescription>
            </FormGroup>
            <Gap size={24} />
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Warning</div>
            <FormGroup>
                <FormField status={EFormFieldStatus.WARNING}>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput value={w} onChange={(x) => setW(x.target.value)} />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                        Текст предупреждения
                    </Text>
                </FormFieldDescription>
            </FormGroup>
            <Gap size={24} />
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Disabled</div>
            <FormGroup>
                <FormField status={EFormFieldStatus.DISABLED}>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput value="Value disabled" />
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
