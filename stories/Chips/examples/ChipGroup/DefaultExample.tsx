import React, { useState } from "react";
import { Chip, ChipGroup } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [selected, setSelected] = useState<number | null>(null);
    const chips = ["Alpha", "Beta", "Gamma", "Delta"];
    return (
        <ChipGroup style={{ maxWidth: 360 }}>
            {chips.map((label, index) => (
                <Chip key={label} selected={selected === index} onClick={() => setSelected(index)}>
                    {label}
                </Chip>
            ))}
        </ChipGroup>
    );
};
