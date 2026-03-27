import React from "react";
import { LoaderSmall, ELoaderSmallTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const ThemesExample = () => (
    <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>BRAND</div>
            <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>NEUTRAL</div>
            <div style={{ display: "inline-flex", padding: "8px", borderRadius: "8px", background: "#1C1C1E" }}>
                <LoaderSmall theme={ELoaderSmallTheme.NEUTRAL} size={EComponentSize.MD} />
            </div>
        </div>
    </div>
);
