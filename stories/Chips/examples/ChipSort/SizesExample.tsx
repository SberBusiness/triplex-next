import React, { useState } from "react";
import { ChipSort, EComponentSize, type ISelectFieldOption } from "@sberbusiness/triplex-next";

const options: ISelectFieldOption[] = [
    { id: "chip-sort-1", label: "По дате", value: "i1" },
    { id: "chip-sort-2", label: "По времени", value: "i2" },
    { id: "chip-sort-3", label: "По названию", value: "i3" },
];

type SizeItemProps = {
    size: EComponentSize;
    label: string;
};

const SizeItem = ({ size, label }: SizeItemProps) => {
    const [value, setValue] = useState<ISelectFieldOption>(options[0]);

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
            <ChipSort size={size} defaultValue={options[0]} value={value} options={options} onChange={setValue} />
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
