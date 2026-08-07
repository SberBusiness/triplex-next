import React, { useState } from "react";
import { MaskedField, FormFieldMaskedInput } from "@sberbusiness/triplex-next";

/**
 * placeholderMask подсказывает формат ввода: незаполненная часть маски отображается
 * за введённым значением. Без него незаполненная часть заполняется символом placeholderChar.
 */
export const WithPlaceholderMask = () => {
    const [valueWithMask, setValueWithMask] = useState("12");
    const [valueWithoutMask, setValueWithoutMask] = useState("12");

    const handleWithMaskChange = (event: React.ChangeEvent<HTMLInputElement>) => setValueWithMask(event.target.value);

    const handleWithoutMaskChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setValueWithoutMask(event.target.value);

    return (
        <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>С placeholderMask</div>
                <MaskedField
                    label="Дата"
                    maskedInputProps={{
                        mask: FormFieldMaskedInput.presets.masks.date,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.date,
                        value: valueWithMask,
                        onChange: handleWithMaskChange,
                    }}
                />
            </div>

            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Без placeholderMask</div>
                <MaskedField
                    label="Дата"
                    maskedInputProps={{
                        mask: FormFieldMaskedInput.presets.masks.date,
                        value: valueWithoutMask,
                        onChange: handleWithoutMaskChange,
                    }}
                />
            </div>
        </div>
    );
};
