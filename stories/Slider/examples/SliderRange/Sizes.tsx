import React, { useState } from "react";
import { EComponentSize, SliderRange, TSliderRangeValues } from "@sberbusiness/triplex-next";

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
    const [values, setValues] = useState<TSliderRangeValues>([30, 70]);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <SliderRange min={0} max={100} size={size} marks={MARKS} values={values} onChange={setValues} />
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
