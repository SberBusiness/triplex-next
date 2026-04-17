import React, { useState } from "react";
import {
    EFontType,
    ETextSize,
    FormField,
    FormFieldDescription,
    FormFieldLabel,
    FormFieldMaskedInput,
    FormGroup,
    Gap,
    Text,
} from "@sberbusiness/triplex-next";

export const MaskedInputExample = () => {
    const [phoneValue, setPhoneValue] = useState("");
    const [cardValue, setCardValue] = useState("");
    return (
        <div style={{ maxWidth: "300px" }}>
            <FormGroup>
                <FormField>
                    <FormFieldLabel>Номер телефона</FormFieldLabel>
                    <FormFieldMaskedInput
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                        mask={FormFieldMaskedInput.presets.masks.phone}
                    />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Описание поля
                    </Text>
                </FormFieldDescription>
            </FormGroup>
            <Gap size={24} />
            <FormGroup>
                <FormField>
                    <FormFieldLabel>Номер карты</FormFieldLabel>
                    <FormFieldMaskedInput
                        value={cardValue}
                        onChange={(e) => setCardValue(e.target.value)}
                        mask={FormFieldMaskedInput.presets.masks.cardNumber}
                        placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.cardNumber}
                        placeholder="Введите номер карты"
                    />
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
