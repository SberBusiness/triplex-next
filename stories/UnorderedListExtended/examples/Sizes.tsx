import React from "react";
import { UnorderedListExtended, ETextSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(ETextSize);

export const Sizes = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size}</div>
                <UnorderedListExtended>
                    <UnorderedListExtended.Item size={size}>
                        <UnorderedListExtended.Item.Marker />
                        List item text
                    </UnorderedListExtended.Item>
                    <UnorderedListExtended.Item size={size}>
                        <UnorderedListExtended.Item.Marker />
                        List item text
                    </UnorderedListExtended.Item>
                </UnorderedListExtended>
            </div>
        ))}
    </div>
);
