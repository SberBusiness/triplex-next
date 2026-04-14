import React from "react";
import {
    EComponentSize,
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldMaskedInput,
    FormGroup,
} from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 24 }}>
            <FormGroup>
                <FormField size={EComponentSize.SM}>
                    <FormFieldLabel>Label</FormFieldLabel>
                    <FormFieldMaskedInput
                        value="1234 5678 9012 3456"
                        onChange={() => {}}
                        mask={FormFieldMaskedInput.presets.masks.cardNumber}
                        placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.cardNumber}
                    />
                </FormField>
            </FormGroup>
            <FormGroup>
                <FormField size={EComponentSize.MD}>
                    <FormFieldLabel>Label</FormFieldLabel>
                    <FormFieldMaskedInput
                        value="1234 5678 9012 3456"
                        onChange={() => {}}
                        mask={FormFieldMaskedInput.presets.masks.cardNumber}
                        placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.cardNumber}
                    />
                </FormField>
            </FormGroup>
            <FormGroup>
                <FormField size={EComponentSize.LG}>
                    <FormFieldLabel>Label</FormFieldLabel>
                    <FormFieldMaskedInput
                        value="1234 5678 9012 3456"
                        onChange={() => {}}
                        mask={FormFieldMaskedInput.presets.masks.cardNumber}
                        placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.cardNumber}
                    />
                </FormField>
            </FormGroup>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
            <FormGroup>
                <FormField size={EComponentSize.SM} active>
                    <FormFieldLabel>Label</FormFieldLabel>
                    <FormFieldInput value="" onChange={() => {}} placeholder="Введите текст..." />
                </FormField>
            </FormGroup>
            <FormGroup>
                <FormField size={EComponentSize.MD} active>
                    <FormFieldLabel>Label</FormFieldLabel>
                    <FormFieldInput value="" onChange={() => {}} placeholder="Введите текст..." />
                </FormField>
            </FormGroup>
            <FormGroup>
                <FormField size={EComponentSize.LG} active>
                    <FormFieldLabel>Label</FormFieldLabel>
                    <FormFieldInput value="" onChange={() => {}} placeholder="Введите текст..." />
                </FormField>
            </FormGroup>
        </div>
    </div>
);
