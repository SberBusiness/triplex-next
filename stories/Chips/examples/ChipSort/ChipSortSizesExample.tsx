import React, { useState } from "react";
import { ChipSort, EComponentSize } from "@sberbusiness/triplex-next";

const options = [
    { id: "chip-sort-1", label: "По дате", value: "i1" },
    { id: "chip-sort-2", label: "По времени", value: "i2" },
    { id: "chip-sort-3", label: "По названию", value: "i3" },
];

export const ChipSortSizesExample = () => {
    const [valueSM, setValueSM] = useState(options[0]);
    const [valueMD, setValueMD] = useState(options[0]);
    const [valueLG, setValueLG] = useState(options[0]);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <ChipSort
                    defaultValue={options[0]}
                    size={EComponentSize.SM}
                    value={valueSM}
                    options={options}
                    onChange={setValueSM}
                />
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <ChipSort
                    defaultValue={options[0]}
                    size={EComponentSize.MD}
                    value={valueMD}
                    options={options}
                    onChange={setValueMD}
                />
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <ChipSort
                    defaultValue={options[0]}
                    size={EComponentSize.LG}
                    value={valueLG}
                    options={options}
                    onChange={setValueLG}
                />
            </div>
        </div>
    );
};
