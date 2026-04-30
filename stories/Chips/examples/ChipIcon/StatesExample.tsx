import React from "react";
import { ChipIcon, EComponentSize } from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

export const StatesExample = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Selected</div>
                <ChipIcon size={EComponentSize.MD} selected>
                    <DefaulticonStrokePrdIcon24 paletteIndex={6} />
                </ChipIcon>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Disabled</div>
                <ChipIcon size={EComponentSize.MD} disabled>
                    <DefaulticonStrokePrdIcon24 paletteIndex={5} />
                </ChipIcon>
            </div>
        </div>
    );
};
