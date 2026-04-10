import React, { useState } from "react";
import { ChipIcon, EComponentSize } from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

export const SizesExample = () => {
    const [selectedSM, setSelectedSM] = useState(false);
    const [selectedMD, setSelectedMD] = useState(false);
    const [selectedLG, setSelectedLG] = useState(false);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <ChipIcon size={EComponentSize.SM} selected={selectedSM} onClick={() => setSelectedSM((s) => !s)}>
                    <DefaulticonStrokePrdIcon24 paletteIndex={selectedSM ? 6 : 5} />
                </ChipIcon>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <ChipIcon size={EComponentSize.MD} selected={selectedMD} onClick={() => setSelectedMD((s) => !s)}>
                    <DefaulticonStrokePrdIcon24 paletteIndex={selectedMD ? 6 : 5} />
                </ChipIcon>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <ChipIcon size={EComponentSize.LG} selected={selectedLG} onClick={() => setSelectedLG((s) => !s)}>
                    <DefaulticonStrokePrdIcon24 paletteIndex={selectedLG ? 6 : 5} />
                </ChipIcon>
            </div>
        </div>
    );
};
