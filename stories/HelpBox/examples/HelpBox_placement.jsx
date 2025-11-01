import React from "react";
import { HelpBox } from "@sber-business/triplex/components/HelpBox/HelpBox";
import { ETooltipSize, ETooltipPreferPlace } from "@sber-business/triplex/components/Tooltip/enums";

const renderHelpBox = (preferPlace) => (
    <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={preferPlace}>
        Текст подсказки.
    </HelpBox>
);

<div style={{ display: "flex", textAlign: "center" }}>
    <div style={{ flex: "1 1 0" }}>
        <div>Left</div>
        {renderHelpBox(ETooltipPreferPlace.LEFT)}
    </div>
    <div style={{ flex: "1 1 0" }}>
        <div>Above</div>
        {renderHelpBox(ETooltipPreferPlace.ABOVE)}
    </div>
    <div style={{ flex: "1 1 0" }}>
        <div>Below</div>
        {renderHelpBox(ETooltipPreferPlace.BELOW)}
    </div>
    <div style={{ flex: "1 1 0" }}>
        <div>Right</div>
        {renderHelpBox(ETooltipPreferPlace.RIGHT)}
    </div>
</div>