import React, { useState } from "react";
import { ChipOptions, EChipType } from "@sberbusiness/triplex-next";

type TypeItemProps = {
    type: EChipType;
    label: string;
};

const TypeItem = ({ type, label }: TypeItemProps) => {
    const [count, setCount] = useState(0);

    const handleClick = () => setCount((prevCount) => prevCount + 1);

    const handleClearSelected = () => setCount(0);

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
            <ChipOptions type={type} selected={count > 0} onClick={handleClick} clearSelected={handleClearSelected}>
                {count || undefined}
            </ChipOptions>
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
