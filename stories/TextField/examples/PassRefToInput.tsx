import React, { useRef, useState } from "react";
import { TextField } from "@sberbusiness/triplex-next";

export const PassRefToInput = () => {
    const [value, setValue] = useState("");
    const ref = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ maxWidth: "300px" }}>
            <TextField
                label="Label"
                inputProps={{ ref, value, onChange: handleChange, placeholder: "Type to proceed" }}
            />
        </div>
    );
};
