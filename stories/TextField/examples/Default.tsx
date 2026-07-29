import React, { useState } from "react";
import { TextField } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ maxWidth: "300px" }}>
            <TextField label="Label" inputProps={{ value, onChange: handleChange, placeholder: "Type to proceed" }} />
        </div>
    );
};
