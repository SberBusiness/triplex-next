import React from "react";
import { HelpBox, ETooltipSize } from "@sberbusiness/triplex-next";

export const WithMobileHeader = () => (
    <div style={{ padding: 50 }}>
        <HelpBox
            tooltipSize={ETooltipSize.SM}
            mobileHeaderContent="Заголовок"
            aria-label="Подсказка"
            tooltipXButtonProps={{ "aria-label": "Закрыть" }}
        >
            Текст подсказки
        </HelpBox>
    </div>
);
