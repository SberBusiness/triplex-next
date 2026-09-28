import React from "react";
import { Step, EComponentSize, EStepStatus } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size, index) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <Step step={index + 1} status={EStepStatus.ACTIVE} size={size} />
            </div>
        ))}
    </div>
);
