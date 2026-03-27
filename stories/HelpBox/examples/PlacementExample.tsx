import React from "react";
import { HelpBox, ETooltipSize, ETooltipPreferPlace } from "@sberbusiness/triplex-next";

export const PlacementExample = () => (
    <div style={{ padding: 50, display: "grid", gridTemplateColumns: "repeat(2, minmax(120px, 1fr))", gap: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 150 }}>above</span>
            <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                Подсказка сверху
            </HelpBox>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 150 }}>below</span>
            <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.BELOW}>
                Подсказка снизу
            </HelpBox>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 150 }}>left</span>
            <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.LEFT}>
                Подсказка слева
            </HelpBox>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 150 }}>right</span>
            <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.RIGHT}>
                Подсказка справа
            </HelpBox>
        </div>
    </div>
);
