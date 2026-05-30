import React, { useState } from "react";
import { ChipSort, EChipType, EComponentSize, type ISelectFieldOption } from "@sberbusiness/triplex-next";

const options: ISelectFieldOption[] = [
    { id: "chip-sort-1", label: "По дате", value: "i1" },
    { id: "chip-sort-2", label: "По времени", value: "i2" },
    { id: "chip-sort-3", label: "По названию", value: "i3" },
];

type TypeItemProps = {
    type: EChipType;
    label: string;
};

const TypeItem = ({ type, label }: TypeItemProps) => {
    const [value, setValue] = useState<ISelectFieldOption>(options[0]);

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
            <ChipSort
                type={type}
                size={EComponentSize.MD}
                defaultValue={options[0]}
                value={value}
                options={options}
                onChange={setValue}
            />
        </div>
    );
};

const sizeOptions = Object.values(EChipType).map((type) => ({
    value: type,
    label: type.toUpperCase(),
}));

export const TypesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sizeOptions.map(({ value, label }) => (
            <TypeItem key={value} type={value} label={label} />
        ))}
    </div>
);
