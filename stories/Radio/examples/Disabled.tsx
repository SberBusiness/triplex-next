import React from "react";
import { Radio, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG];

export const Disabled = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    <Radio size={size} disabled>
                        Не выбран
                    </Radio>
                    <Radio size={size} defaultChecked disabled>
                        Выбран
                    </Radio>
                </div>
            </div>
        ))}
    </div>
);
