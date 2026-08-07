import React, { useState } from "react";
import { action } from "storybook/actions";
import {
    MaskedField,
    FormFieldMaskedInput,
    Text,
    EComponentSize,
    EFormFieldStatus,
    ETextSize,
    EFontType,
    TFormFieldMaskedInputMask,
} from "@sberbusiness/triplex-next";

const { masks, placeholderMasks } = FormFieldMaskedInput.presets;

interface IMaskPreset {
    mask: TFormFieldMaskedInputMask;
    placeholderMask?: string;
}

/** Маски пресетов FormFieldMaskedInput, доступные в Controls. */
export const MASK_PRESETS = {
    phone: { mask: masks.phone },
    date: { mask: masks.date, placeholderMask: placeholderMasks.date },
    time: { mask: masks.time, placeholderMask: placeholderMasks.time },
    cardNumber: { mask: masks.cardNumber, placeholderMask: placeholderMasks.cardNumber },
    account: { mask: masks.account },
    inn: { mask: masks.inn, placeholderMask: placeholderMasks.inn },
    snils: { mask: masks.snils },
    swiftCode: { mask: masks.swiftCode, placeholderMask: placeholderMasks.swiftCode },
    passportSeries: { mask: masks.passport.series },
} satisfies Record<string, IMaskPreset>;

/** Тип маски, доступный в Controls. */
export type TMaskType = keyof typeof MASK_PRESETS;

export interface PlaygroundArgs {
    size: EComponentSize;
    status: EFormFieldStatus;
    label: string;
    prefix: string;
    postfix: string;
    description: string;
    counter: string;
    maskType: TMaskType;
    placeholder: string;
}

export const Playground = ({
    label,
    prefix,
    postfix,
    description,
    counter,
    maskType,
    placeholder,
    ...props
}: PlaygroundArgs) => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        action("onChange")(event.target.value);
    };

    return (
        <div style={{ maxWidth: "300px" }}>
            <MaskedField
                {...props}
                label={label || undefined}
                prefix={prefix || undefined}
                postfix={postfix || undefined}
                description={
                    description ? (
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {description}
                        </Text>
                    ) : undefined
                }
                counter={
                    counter ? (
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {counter}
                        </Text>
                    ) : undefined
                }
                maskedInputProps={{ ...MASK_PRESETS[maskType], value, onChange: handleChange, placeholder }}
            />
        </div>
    );
};
