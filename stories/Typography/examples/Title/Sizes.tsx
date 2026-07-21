import React from "react";
import { Title, ETitleSize } from "@sberbusiness/triplex-next";

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Title size={ETitleSize.H1}>Заголовок H1</Title>
        <Title size={ETitleSize.H2}>Заголовок H2</Title>
        <Title size={ETitleSize.H3}>Заголовок H3</Title>
    </div>
);
