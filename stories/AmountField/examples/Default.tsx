import React, { useState } from "react";
import { AmountField } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [value, setValue] = useState<string>("");

    return (
        <div style={{ maxWidth: 300 }}>
            <AmountField
                label="Label"
                inputProps={{
                    value,
                    placeholder: "0,00 ₽",
                    onChange: setValue,
                }}
                currency="₽"
            />
        </div>
    );
};
