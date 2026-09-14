import React, { useState } from "react";
import { ChipMonthYearPicker, EChipType, EDropdownAlignment } from "@sberbusiness/triplex-next";

type TypeItemProps = {
    type: EChipType;
    label: string;
};

const TypeItem = ({ type, label }: TypeItemProps) => {
    const [value, setValue] = useState("");

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
            <ChipMonthYearPicker
                value={value}
                label="MonthYear label"
                placeholder="мм.гггг"
                clearButtonProps={{ "aria-label": "Очистить" }}
                type={type}
                alignment={EDropdownAlignment.LEFT}
                onChange={setValue}
            />
        </div>
    );
};

const typeOptions = Object.values(EChipType).map((type) => ({
    value: type,
    label: type.toUpperCase(),
}));

export const TypesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {typeOptions.map(({ value, label }) => (
            <TypeItem key={value} type={value} label={label} />
        ))}
    </div>
);
