import React, { useState } from "react";
import { NumberField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState<string>("");

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value);
    };

    return (
        <div style={{ maxWidth: 300 }}>
            <NumberField
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                inputProps={{
                    value,
                    placeholder: "0",
                    onChange: handleInputChange,
                }}
                label="Label"
            />
        </div>
    );
};
