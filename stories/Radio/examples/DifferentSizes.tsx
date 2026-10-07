import React from "react";
import { Radio, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG];

export const DifferentSizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <Radio size={size}>Radio text</Radio>
            </div>
        ))}
    </div>
);
