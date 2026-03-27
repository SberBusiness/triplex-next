import React from "react";
import { LoaderSmall, ELoaderSmallTheme, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {SIZES.map((size) => (
            <div key={size} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                <div style={{ width: "32px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
                <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={size} />
                <div style={{ display: "inline-flex", padding: "8px", borderRadius: "8px", background: "#1C1C1E" }}>
                    <LoaderSmall theme={ELoaderSmallTheme.NEUTRAL} size={size} />
                </div>
            </div>
        ))}
    </div>
);
