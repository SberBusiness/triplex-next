import React from "react";
import { ChipDatePicker, EComponentSize, EFormFieldStatus, EDropdownAlignment } from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ChipDatePicker
            value="19700101"
            label="Date label"
            onChange={() => {}}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.SM}
            status={EFormFieldStatus.DEFAULT}
        />
        <ChipDatePicker
            value="19700101"
            label="Date label"
            onChange={() => {}}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.MD}
            status={EFormFieldStatus.DEFAULT}
        />
        <ChipDatePicker
            value="19700101"
            label="Date label"
            onChange={() => {}}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.LG}
            status={EFormFieldStatus.DEFAULT}
        />
    </div>
);
