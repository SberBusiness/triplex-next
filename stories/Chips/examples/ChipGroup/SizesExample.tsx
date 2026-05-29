import React, { useState } from "react";
import { Chip, ChipGroup, EComponentSize } from "@sberbusiness/triplex-next";

type SizeItemProps = {
    size: EComponentSize;
    label: string;
};

type SizeItemChipProps = Pick<SizeItemProps, "size"> & {
    name: string;
};

const SizeItemChip = ({ size, name }: SizeItemChipProps) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => setSelected((prevSelected) => !prevSelected);

    return (
        <Chip size={size} selected={selected} onClick={handleClick}>
            {name}
        </Chip>
    );
};

const NAMES = ["Alpha", "Beta", "Gamma", "Delta"];

const SizeItem = ({ size, label }: SizeItemProps) => (
    <div>
        <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
        <ChipGroup size={size}>
            {NAMES.map((name) => (
                <SizeItemChip key={name} size={size} name={name} />
            ))}
        </ChipGroup>
    </div>
);

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
