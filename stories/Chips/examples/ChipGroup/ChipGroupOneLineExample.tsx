import React, { useState } from "react";
import { Chip, ChipGroup, EComponentSize } from "@sberbusiness/triplex-next";

export const ChipGroupOneLineExample = () => {
    const [selected, setSelected] = useState<number | null>(null);
    const chips = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
    return (
        <ChipGroup oneLine style={{ maxWidth: 360, whiteSpace: "nowrap", overflowX: "auto" }}>
            {chips.map((label, index) => (
                <Chip
                    key={label}
                    size={EComponentSize.MD}
                    selected={selected === index}
                    onClick={() => setSelected(index)}
                >
                    {label}
                </Chip>
            ))}
        </ChipGroup>
    );
};
