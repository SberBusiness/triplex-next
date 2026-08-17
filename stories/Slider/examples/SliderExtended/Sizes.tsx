import React, { useState } from "react";
import { EComponentSize, SliderExtended } from "@sberbusiness/triplex-next";

interface ISizeItemProps {
    size: EComponentSize.MD | EComponentSize.LG;
}

const SIZES: ISizeItemProps["size"][] = [EComponentSize.MD, EComponentSize.LG];

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState(35);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <SliderExtended min={0} max={100} step={1} size={size}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={value} onChange={setValue} aria-label="Значение">
                    <SliderExtended.Tooltip value={value}>{value}</SliderExtended.Tooltip>
                </SliderExtended.Dot>
                <SliderExtended.Track />
                <SliderExtended.Marks>
                    <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                    <SliderExtended.Mark value={50}>50</SliderExtended.Mark>
                    <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
                </SliderExtended.Marks>
            </SliderExtended>
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
