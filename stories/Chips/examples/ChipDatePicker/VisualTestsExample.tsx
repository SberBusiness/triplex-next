import React from "react";
import { ChipDatePicker, EComponentSize, EDropdownAlignment } from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ChipDatePicker
            value="19700101"
            label="Date label"
            onChange={() => {}}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.SM}
        />
        <ChipDatePicker
            value="19700101"
            label="Date label"
            onChange={() => {}}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.MD}
        />
        <ChipDatePicker
            value="19700101"
            label="Date label"
            onChange={() => {}}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.LG}
        />
    </div>
);
