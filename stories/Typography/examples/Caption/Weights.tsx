import React from "react";
import { Caption, ECaptionSize, EFontWeightCaption } from "@sberbusiness/triplex-next";

export const Weights = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Caption size={ECaptionSize.C1} weight={EFontWeightCaption.REGULAR}>
            Regular - Обычный вес подписи
        </Caption>
        <Caption size={ECaptionSize.C1} weight={EFontWeightCaption.SEMIBOLD}>
            Semibold - Полужирная подпись
        </Caption>
    </div>
);
