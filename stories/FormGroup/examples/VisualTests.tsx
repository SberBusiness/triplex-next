import React from "react";
import {
    AlertContext,
    EAlertType,
    EFontType,
    EFormFieldStatus,
    ETextSize,
    FormField,
    FormFieldDescription,
    FormFieldInput,
    FormFieldLabel,
    FormGroup,
    Text,
} from "@sberbusiness/triplex-next";

const columnStyle: React.CSSProperties = { width: "280px" };

const captionStyle: React.CSSProperties = { marginBottom: "8px", fontSize: "16px", fontWeight: 700 };

export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
        <div style={columnStyle}>
            <div style={captionStyle}>Только поле</div>
            <FormGroup>
                <FormField>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput defaultValue="Значение" />
                </FormField>
            </FormGroup>
        </div>

        <div style={columnStyle}>
            <div style={captionStyle}>Поле и описание</div>
            <FormGroup>
                <FormField>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput defaultValue="Значение" />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Описание поля
                    </Text>
                </FormFieldDescription>
            </FormGroup>
        </div>

        <div style={columnStyle}>
            <div style={captionStyle}>Поле с ошибкой</div>
            <FormGroup>
                <FormField status={EFormFieldStatus.ERROR}>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput defaultValue="Значение" />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                        Текст ошибки
                    </Text>
                </FormFieldDescription>
            </FormGroup>
        </div>

        <div style={columnStyle}>
            <div style={captionStyle}>Поле, описание и Alert</div>
            <FormGroup>
                <FormField>
                    <FormFieldLabel>Название поля</FormFieldLabel>
                    <FormFieldInput defaultValue="Значение" />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Описание поля
                    </Text>
                </FormFieldDescription>
                <AlertContext type={EAlertType.INFO}>Сообщение, относящееся к полю.</AlertContext>
            </FormGroup>
        </div>

        <div style={columnStyle}>
            <div style={captionStyle}>Пустая группа</div>
            <FormGroup />
        </div>
    </div>
);
