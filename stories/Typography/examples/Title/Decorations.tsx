import React from "react";
import { Title, ETitleSize } from "@sberbusiness/triplex-next";

export const Decorations = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Title size={ETitleSize.H2}>Заголовок без декораций</Title>
        <Title size={ETitleSize.H2} underline>
            Заголовок с подчеркиванием
        </Title>
        <Title size={ETitleSize.H2} strikethrough>
            Заголовок с зачеркиванием
        </Title>
        <Title size={ETitleSize.H2} underline strikethrough>
            Заголовок с подчеркиванием и зачеркиванием
        </Title>
    </div>
);
