import React from "react";
import { HelpBox, ETooltipSize, ETooltipPreferPlace } from "@sberbusiness/triplex-next";

export const SizesExample = () => (
    <div style={{ padding: 50, display: "flex", gap: 100 }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
            <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                SM
            </HelpBox>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
            <HelpBox tooltipSize={ETooltipSize.LG} preferPlace={ETooltipPreferPlace.BELOW}>
                LG
            </HelpBox>
        </div>
    </div>
);
