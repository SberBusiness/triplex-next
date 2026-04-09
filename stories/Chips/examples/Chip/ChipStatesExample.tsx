import React from "react";
import { Chip } from "@sberbusiness/triplex-next";

export const ChipStatesExample = () => (
    <div style={{ display: "flex", gap: 12 }}>
        <Chip selected>Selected</Chip>
        <Chip disabled>Disabled</Chip>
    </div>
);
