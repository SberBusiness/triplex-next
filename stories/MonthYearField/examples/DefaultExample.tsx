import React, { useState } from "react";
import { MonthYearField } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState("");

    return (
        <div style={{ maxWidth: 300 }}>
            <MonthYearField value={value} placeholder="Select to proceed" label="Label" onChange={setValue} />
        </div>
    );
};
