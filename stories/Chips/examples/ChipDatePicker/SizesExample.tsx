import React, { useState } from "react";
import { ChipDatePicker, EComponentSize, EDropdownAlignment } from "@sberbusiness/triplex-next";

type SizeItemProps = {
    size: EComponentSize;
    label: string;
};

const SizeItem = ({ size, label }: SizeItemProps) => {
    const [value, setValue] = useState("");

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
            <ChipDatePicker
                size={size}
                alignment={EDropdownAlignment.LEFT}
                value={value}
                label="Date label"
                onChange={setValue}
            />
        </div>
    );
};

const sizeOptions = Object.values(EComponentSize).map((size) => ({
    value: size,
    label: size.toUpperCase(),
}));

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sizeOptions.map(({ value, label }) => (
            <SizeItem key={value} size={value} label={label} />
        ))}
    </div>
);
