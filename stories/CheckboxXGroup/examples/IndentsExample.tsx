import React from "react";
import { Checkbox, CheckboxXGroup } from "@sberbusiness/triplex-next";

const indents = [12, 16, 20, 24, 28, 32] as const;

export const IndentsExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {indents.map((indent) => (
            <div key={indent}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{indent}px</div>
                <CheckboxXGroup indent={indent}>
                    {[1, 2, 3, 4].map((value) => (
                        <Checkbox key={value} name={`checkbox-x-group-${indent}`} value={value}>
                            Checkbox text
                        </Checkbox>
                    ))}
                </CheckboxXGroup>
            </div>
        ))}
    </div>
);
