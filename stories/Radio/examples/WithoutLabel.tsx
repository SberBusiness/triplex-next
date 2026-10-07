import React from "react";
import { Radio, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG];

export const WithoutLabel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                    <Radio size={size} aria-label={`Не выбран, ${size}`} />
                    <Radio size={size} defaultChecked aria-label={`Выбран, ${size}`} />
                    <Radio size={size} disabled aria-label={`Не выбран, недоступен, ${size}`} />
                    <Radio size={size} defaultChecked disabled aria-label={`Выбран, недоступен, ${size}`} />
                </div>
            </div>
        ))}
    </div>
);
