import React from "react";
import { Checkbox, CheckboxYGroup, EComponentSize } from "@sberbusiness/triplex-next";

const sizes = [
    { label: "SM", size: EComponentSize.SM },
    { label: "MD", size: EComponentSize.MD },
    { label: "LG", size: EComponentSize.LG },
] as const;

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {sizes.map(({ label, size }) => (
            <div key={label}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{label}</div>
                <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
                    {[1, 2, 3].map((value) => (
                        <Checkbox key={value} name={`checkbox-y-group-${label}`} value={value} size={size}>
                            Checkbox text
                        </Checkbox>
                    ))}
                </CheckboxYGroup>
            </div>
        ))}
    </div>
);
