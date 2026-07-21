import React from "react";
import { Title, ETitleSize, EFontWeightTitle } from "@sberbusiness/triplex-next";

export const Weights = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Title size={ETitleSize.H2} weight={EFontWeightTitle.REGULAR}>
            Regular - Обычный вес
        </Title>
        <Title size={ETitleSize.H2} weight={EFontWeightTitle.MEDIUM}>
            Medium - Средний вес
        </Title>
        <Title size={ETitleSize.H2} weight={EFontWeightTitle.SEMIBOLD}>
            Semibold - Полужирный
        </Title>
        <Title size={ETitleSize.H2} weight={EFontWeightTitle.BOLD}>
            Bold - Жирный
        </Title>
    </div>
);
