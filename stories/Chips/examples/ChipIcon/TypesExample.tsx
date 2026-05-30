import React, { useState } from "react";
import { ChipIcon, EChipType } from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

type TypeItemProps = {
    type: EChipType;
    label: string;
};

const TypeItem = ({ type, label }: TypeItemProps) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => setSelected((prevSelected) => !prevSelected);

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
            <ChipIcon type={type} selected={selected} onClick={handleClick}>
                <DefaulticonStrokePrdIcon24 paletteIndex={selected ? 6 : 5} />
            </ChipIcon>
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
