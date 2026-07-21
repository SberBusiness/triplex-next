import React from "react";
import { Text, ETextSize, EFontWeightText } from "@sberbusiness/triplex-next";

export const Weights = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Text size={ETextSize.B2} weight={EFontWeightText.REGULAR}>
            Regular - Обычный вес текста
        </Text>
        <Text size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
            Semibold - Полужирный текст
        </Text>
    </div>
);
