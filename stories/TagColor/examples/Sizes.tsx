import React from "react";
import { TagColor, EComponentSize, ETagColorStatus } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <TagColor size={size} status={ETagColorStatus.INFO}>
                    Tag text
                </TagColor>
            </div>
        ))}
    </div>
);
