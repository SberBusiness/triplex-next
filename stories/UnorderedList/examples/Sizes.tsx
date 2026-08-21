import React from "react";
import { UnorderedList, ETextSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(ETextSize);

export const Sizes = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size}</div>
                <UnorderedList
                    items={[
                        { size, children: "List item text" },
                        { size, children: "List item text" },
                    ]}
                />
            </div>
        ))}
    </div>
);
