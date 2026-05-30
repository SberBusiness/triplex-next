import React, { useState } from "react";
import { ChipOptions, EComponentSize } from "@sberbusiness/triplex-next";

type SizeItemProps = {
    size: EComponentSize;
    label: string;
};

const SizeItem = ({ size, label }: SizeItemProps) => {
    const [count, setCount] = useState(0);

    const handleClick = () => setCount((prevCount) => prevCount + 1);

    const handleClearSelected = () => setCount(0);

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
            <ChipOptions size={size} selected={count > 0} onClick={handleClick} clearSelected={handleClearSelected}>
                {count || undefined}
            </ChipOptions>
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
