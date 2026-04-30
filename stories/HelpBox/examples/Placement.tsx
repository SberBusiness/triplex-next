import React from "react";
import { HelpBox, ETooltipSize, ETooltipPreferPlace } from "@sberbusiness/triplex-next";

export const Placement = () => (
    <div style={{ padding: 50, display: "grid", gridTemplateColumns: "repeat(2, minmax(120px, 1fr))", gap: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 150 }}>above</span>
            <HelpBox
                tooltipSize={ETooltipSize.SM}
                preferPlace={ETooltipPreferPlace.ABOVE}
                aria-label="Подсказка"
                tooltipXButtonProps={{ "aria-label": "Закрыть" }}
            >
                Подсказка сверху
            </HelpBox>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 150 }}>below</span>
            <HelpBox
                tooltipSize={ETooltipSize.SM}
                preferPlace={ETooltipPreferPlace.BELOW}
                aria-label="Подсказка"
                tooltipXButtonProps={{ "aria-label": "Закрыть" }}
            >
                Подсказка снизу
            </HelpBox>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 150 }}>left</span>
            <HelpBox
                tooltipSize={ETooltipSize.SM}
                preferPlace={ETooltipPreferPlace.LEFT}
                aria-label="Подсказка"
                tooltipXButtonProps={{ "aria-label": "Закрыть" }}
            >
                Подсказка слева
            </HelpBox>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 150 }}>right</span>
            <HelpBox
                tooltipSize={ETooltipSize.SM}
                preferPlace={ETooltipPreferPlace.RIGHT}
                aria-label="Подсказка"
                tooltipXButtonProps={{ "aria-label": "Закрыть" }}
            >
                Подсказка справа
            </HelpBox>
        </div>
    </div>
);
