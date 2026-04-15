import React, { useState } from "react";
import { TextareaField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState("");

    const handleTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setValue(event.target.value);
    };

    return (
        <div style={{ maxWidth: 300 }}>
            <TextareaField
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                textareaProps={{
                    value,
                    placeholder: "Type to proceed",
                    onChange: handleTextareaChange,
                }}
                label="Label"
            />
        </div>
    );
};
