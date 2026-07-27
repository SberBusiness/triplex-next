import React, { useState } from "react";
import { TextField, FormFieldClear } from "@sberbusiness/triplex-next";

export const WithClearButton = () => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ maxWidth: "300px" }}>
            <TextField
                label="Label"
                postfix={<FormFieldClear onClick={() => setValue("")} />}
                inputProps={{ value, onChange: handleChange, placeholder: "Type to proceed" }}
            />
        </div>
    );
};
