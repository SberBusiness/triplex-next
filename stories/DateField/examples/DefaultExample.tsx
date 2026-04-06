import React, { useState } from "react";
import { DateField } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState("");
    return (
        <div style={{ maxWidth: "300px" }}>
            <DateField value={value} onChange={setValue} label="Label" placeholderMask="дд.мм.гггг" />
        </div>
    );
};
