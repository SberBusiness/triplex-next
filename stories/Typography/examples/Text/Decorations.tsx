import React from "react";
import { Text, ETextSize } from "@sberbusiness/triplex-next";

export const Decorations = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Text size={ETextSize.B2}>Текст без декораций</Text>
        <Text size={ETextSize.B2} underline>
            Текст с подчеркиванием
        </Text>
        <Text size={ETextSize.B2} strikethrough>
            Текст с зачеркиванием
        </Text>
        <Text size={ETextSize.B2} underline strikethrough>
            Текст с подчеркиванием и зачеркиванием
        </Text>
    </div>
);
