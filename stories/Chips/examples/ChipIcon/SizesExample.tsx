import React, { useState } from "react";
import { ChipIcon, EComponentSize } from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

type SizeItemProps = {
    size: EComponentSize;
    label: string;
};

const SizeItem = ({ size, label }: SizeItemProps) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => setSelected((prevSelected) => !prevSelected);

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
            <ChipIcon size={size} selected={selected} onClick={handleClick}>
                <DefaulticonStrokePrdIcon24 paletteIndex={selected ? 6 : 5} />
            </ChipIcon>
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
