import React from "react";
import { ChipMonthYearPicker, EComponentSize, EDropdownAlignment } from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ChipMonthYearPicker
            value="19700101"
            label="MonthYear label"
            placeholder="мм.гггг"
            clearButtonProps={{ "aria-label": "Очистить" }}
            onChange={() => {}}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.SM}
        />
        <ChipMonthYearPicker
            value="19700101"
            label="MonthYear label"
            placeholder="мм.гггг"
            clearButtonProps={{ "aria-label": "Очистить" }}
            onChange={() => {}}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.MD}
        />
        <ChipMonthYearPicker
            value="19700101"
            label="MonthYear label"
            placeholder="мм.гггг"
            clearButtonProps={{ "aria-label": "Очистить" }}
            onChange={() => {}}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.LG}
        />
    </div>
);
