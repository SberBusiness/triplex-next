import React from "react";
import { Text, ETextSize, ELineType } from "@sberbusiness/triplex-next";

export const LineTypes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Text size={ETextSize.B3} line={ELineType.NORMAL}>
            Normal - Обычная высота строки. Этот текст демонстрирует нормальную высоту строки для лучшей читаемости.
        </Text>
        <Text size={ETextSize.B3} line={ELineType.COMPACT}>
            Compact - Компактная высота строки. Этот текст демонстрирует компактную высоту строки для экономии места.
        </Text>
    </div>
);
