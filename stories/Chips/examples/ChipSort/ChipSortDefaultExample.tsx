import React, { useState } from "react";
import { ChipSort } from "@sberbusiness/triplex-next";

const options = [
    { id: "chip-sort-1", label: "По дате", value: "i1" },
    { id: "chip-sort-2", label: "По времени", value: "i2" },
    { id: "chip-sort-3", label: "По названию", value: "i3" },
];

export const ChipSortDefaultExample = () => {
    const [value, setValue] = useState(options[0]);
    return <ChipSort defaultValue={options[0]} value={value} options={options} onChange={setValue} />;
};
