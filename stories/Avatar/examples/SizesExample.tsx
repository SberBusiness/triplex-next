import React from "react";
import { Avatar, EAvatarSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EAvatarSize);

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {SIZES.map((size) => (
            <div key={size} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
                <Avatar size={size} />
            </div>
        ))}
    </div>
);
