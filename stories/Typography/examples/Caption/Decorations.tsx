import React from "react";
import { Caption, ECaptionSize } from "@sberbusiness/triplex-next";

export const Decorations = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Caption size={ECaptionSize.C1}>Подпись без декораций</Caption>
        <Caption size={ECaptionSize.C1} underline>
            Подпись с подчеркиванием
        </Caption>
        <Caption size={ECaptionSize.C1} strikethrough>
            Подпись с зачеркиванием
        </Caption>
        <Caption size={ECaptionSize.C1} underline strikethrough>
            Подпись с подчеркиванием и зачеркиванием
        </Caption>
    </div>
);
