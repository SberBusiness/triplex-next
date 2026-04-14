import React from "react";
import { HelpBox, ETooltipSize } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div style={{ padding: 50 }}>
        <HelpBox tooltipSize={ETooltipSize.SM} aria-label="Подсказка" tooltipXButtonProps={{ "aria-label": "Закрыть" }}>
            Подсказка по элементу интерфейса
        </HelpBox>
    </div>
);
