import React from "react";
import { Caption, ECaptionSize } from "@sberbusiness/triplex-next";

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Caption size={ECaptionSize.C1}>C1 - Подпись малого размера (10px)</Caption>
        <Caption size={ECaptionSize.C2}>C2 - Подпись очень малого размера (8px)</Caption>
        <Caption size={ECaptionSize.D1}>D1 - Подпись большого размера (32px)</Caption>
    </div>
);
