import React, { useState } from "react";
import { Chip, ChipGroup, EComponentSize } from "@sberbusiness/triplex-next";

export const ChipGroupSizesExample = () => {
    const [selectedSM, setSelectedSM] = useState<number | null>(null);
    const [selectedMD, setSelectedMD] = useState<number | null>(null);
    const [selectedLG, setSelectedLG] = useState<number | null>(null);
    const chips = ["Alpha", "Beta", "Gamma", "Delta"];

    return (
        <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <ChipGroup size={EComponentSize.SM} style={{ maxWidth: 360 }}>
                    {chips.map((label, index) => (
                        <Chip
                            size={EComponentSize.SM}
                            key={label}
                            selected={selectedSM === index}
                            onClick={() => setSelectedSM(index)}
                        >
                            {label}
                        </Chip>
                    ))}
                </ChipGroup>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <ChipGroup size={EComponentSize.MD} style={{ maxWidth: 360 }}>
                    {chips.map((label, index) => (
                        <Chip
                            size={EComponentSize.MD}
                            key={label}
                            selected={selectedMD === index}
                            onClick={() => setSelectedMD(index)}
                        >
                            {label}
                        </Chip>
                    ))}
                </ChipGroup>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <ChipGroup size={EComponentSize.LG} style={{ maxWidth: 360 }}>
                    {chips.map((label, index) => (
                        <Chip
                            size={EComponentSize.LG}
                            key={label}
                            selected={selectedLG === index}
                            onClick={() => setSelectedLG(index)}
                        >
                            {label}
                        </Chip>
                    ))}
                </ChipGroup>
            </div>
        </div>
    );
};
