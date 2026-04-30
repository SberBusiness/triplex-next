import React from "react";
import { Avatar, EAvatarSize, TAvatarBorderRadius } from "@sberbusiness/triplex-next";

const BORDER_RADIUSES: TAvatarBorderRadius[] = [10, 12, 14];

export const BorderRadiusExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {BORDER_RADIUSES.map((borderRadius) => (
            <div key={borderRadius} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{borderRadius}</div>
                <Avatar size={EAvatarSize.XXL} borderRadius={borderRadius} />
            </div>
        ))}
    </div>
);
