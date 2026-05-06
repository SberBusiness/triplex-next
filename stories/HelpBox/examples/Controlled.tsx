import React, { useState } from "react";
import { HelpBox, ETooltipSize, ETooltipPreferPlace } from "@sberbusiness/triplex-next";

export const Controlled = () => {
    const [open, setOpen] = useState(false);

    const handleToggle = (nextOpen: boolean) => setOpen(nextOpen);
    const handleManualOpen = () => setOpen(true);
    const handleManualClose = () => setOpen(false);

    return (
        <div style={{ padding: 40, display: "flex", alignItems: "center", gap: 16 }}>
            <button type="button" onClick={handleManualOpen}>
                Открыть
            </button>
            <button type="button" onClick={handleManualClose}>
                Закрыть
            </button>
            <HelpBox
                tooltipSize={ETooltipSize.SM}
                preferPlace={ETooltipPreferPlace.RIGHT}
                isOpen={open}
                toggle={handleToggle}
                aria-label="Подсказка"
                tooltipXButtonProps={{ "aria-label": "Закрыть" }}
            >
                Управляемое состояние тултипа
            </HelpBox>
        </div>
    );
};
