import React, { useState } from "react";
import { AmountField, EComponentSize } from "@sberbusiness/triplex-next";

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState<string>("");

    return (
        <div style={{ maxWidth: 300 }}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
            <AmountField
                size={size}
                label="Label"
                inputProps={{
                    value,
                    placeholder: "0,00 ₽",
                    onChange: setValue,
                }}
                currency="₽"
            />
        </div>
    );
};

const SIZES = Object.values(EComponentSize);

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
