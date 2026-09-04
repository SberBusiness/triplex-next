import React, { useState } from "react";
import { SmallInput } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [value, setValue] = useState("");

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value);
    };

    return (
        <div style={{ width: "120px" }}>
            <SmallInput value={value} placeholder="000000" aria-label="Номер документа" onChange={handleChange} />
        </div>
    );
};
