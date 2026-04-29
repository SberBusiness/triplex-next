import React, { useState } from "react";
import { DateField } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState("");

    return (
        <div style={{ maxWidth: 300 }}>
            <DateField
                value={value}
                label="Label"
                placeholderMask="дд.мм.гггг"
                invalidDateHint="Указана недоступная для выбора дата."
                onChange={setValue}
            />
        </div>
    );
};
