import React from "react";
import { Text, ETextSize } from "@sberbusiness/triplex-next";

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Text size={ETextSize.B1}>B1 - Основной текст большого размера (18px)</Text>
        <Text size={ETextSize.B2}>B2 - Основной текст среднего размера (16px)</Text>
        <Text size={ETextSize.B3}>B3 - Основной текст малого размера (14px)</Text>
        <Text size={ETextSize.B4}>B4 - Основной текст очень малого размера (12px)</Text>
    </div>
);
