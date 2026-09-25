import React from "react";
import { Spoiler, Text, EComponentSize, ETextSize, EFontType } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);

const SIZE_TO_TEXT_SIZE_MAP: Record<EComponentSize, ETextSize> = {
    [EComponentSize.SM]: ETextSize.B4,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.LG]: ETextSize.B2,
};

export const DifferentSizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <Spoiler size={size} labelExpand="Развернуть" labelCollapse="Свернуть">
                    <Text size={SIZE_TO_TEXT_SIZE_MAP[size]} type={EFontType.PRIMARY}>
                        Скрытый контент
                    </Text>
                </Spoiler>
            </div>
        ))}
    </div>
);
