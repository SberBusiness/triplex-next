import React, { useState } from "react";
import { Radio } from "@sberbusiness/triplex-next";

const OPTIONS = [
    { value: "email", label: "По электронной почте" },
    { value: "sms", label: "В SMS" },
];

export const Controlled = () => {
    const [value, setValue] = useState("email");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div
            role="radiogroup"
            aria-label="Способ уведомления"
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
            {OPTIONS.map((option) => (
                <Radio
                    key={option.value}
                    name="notification-method"
                    value={option.value}
                    checked={value === option.value}
                    onChange={handleChange}
                >
                    {option.label}
                </Radio>
            ))}
        </div>
    );
};
