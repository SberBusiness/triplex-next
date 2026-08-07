import React, { useState } from "react";
import { MaskedField, FormFieldMaskedInput } from "@sberbusiness/triplex-next";

/**
 * placeholderMask подсказывает формат ввода: незаполненная часть маски отображается
 * за введённым значением. Без него незаполненная часть заполняется символом placeholderChar.
 */
export const WithPlaceholderMask = () => {
    const [dateValue, setDateValue] = useState("12");
    const [timeValue, setTimeValue] = useState("12");

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setDateValue(event.target.value);

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => setTimeValue(event.target.value);

    return (
        <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>С placeholderMask</div>
                <MaskedField
                    label="Дата"
                    maskedInputProps={{
                        mask: FormFieldMaskedInput.presets.masks.date,
                        placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.date,
                        value: dateValue,
                        onChange: handleDateChange,
                    }}
                />
            </div>

            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Без placeholderMask</div>
                <MaskedField
                    label="Время"
                    maskedInputProps={{
                        mask: FormFieldMaskedInput.presets.masks.time,
                        value: timeValue,
                        onChange: handleTimeChange,
                    }}
                />
            </div>
        </div>
    );
};
