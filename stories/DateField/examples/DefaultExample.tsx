import React, { useState } from "react";
import { DateField, MaskedInput } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState("");

    return (
        <div style={{ maxWidth: 300 }}>
            {/* <DateField
                value={value}
                label="Label"
                placeholderMask="дд.мм.гггг"
                invalidDateHint="Указана недоступная для выбора дата."
                onChange={setValue}
            /> */}
            <MaskedInput
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                mask={MaskedInput.presets.masks.date}
            />
        </div>
    );
};
