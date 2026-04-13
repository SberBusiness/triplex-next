import React, { useState } from "react";
import { TextareaField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState("");

    const handleTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setValue(event.target.value);
    };

    return (
        <div style={{ maxWidth: 300 }}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
            <TextareaField
                size={size}
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

const SIZES = Object.values(EComponentSize);

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
