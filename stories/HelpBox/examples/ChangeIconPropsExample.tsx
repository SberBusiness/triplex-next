import React from "react";
import { HelpBox, ETooltipSize } from "@sberbusiness/triplex-next";

export const ChangeIconPropsExample = () => (
    <div style={{ padding: 50 }}>
        <HelpBox tooltipSize={ETooltipSize.SM} iconProps={{ paletteIndex: 0 }}>
            Подсказка по элементу интерфейса
        </HelpBox>
    </div>
);
