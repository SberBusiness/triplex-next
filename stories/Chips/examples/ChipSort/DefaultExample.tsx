import React, { useState } from "react";
import { ChipSort, EComponentSize, type ISelectFieldOption } from "@sberbusiness/triplex-next";

const options: ISelectFieldOption[] = [
    { id: "chip-sort-1", label: "По дате", value: "i1" },
    { id: "chip-sort-2", label: "По времени", value: "i2" },
    { id: "chip-sort-3", label: "По названию", value: "i3" },
];

export const DefaultExample = () => {
    const [value, setValue] = useState<ISelectFieldOption>(options[0]);
    return (
        <ChipSort
            size={EComponentSize.MD}
            defaultValue={options[0]}
            value={value}
            options={options}
            onChange={setValue}
        />
    );
};
