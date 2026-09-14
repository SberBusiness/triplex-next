import React, { useState } from "react";
import { EComponentSize, Slider } from "@sberbusiness/triplex-next";

const MARKS = [
    { value: 0, label: "0" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
];

interface ISizeItemProps {
    size: EComponentSize.MD | EComponentSize.LG;
}

const SIZES: ISizeItemProps["size"][] = [EComponentSize.MD, EComponentSize.LG];

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState(35);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <Slider min={0} max={100} size={size} marks={MARKS} value={value} onChange={setValue} />
        </div>
    );
};

export const Sizes = () => (
    <div style={{ maxWidth: "750px", padding: "30px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
