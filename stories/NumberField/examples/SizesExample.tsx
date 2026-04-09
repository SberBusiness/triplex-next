import React, { useState } from "react";
import { NumberField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState<string>("");

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
            <NumberField
                size={size}
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

const SIZES = Object.values(EComponentSize);

export const SizesExample = () => (
    <div style={{ maxWidth: 300, display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
