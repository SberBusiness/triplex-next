import React, { useState } from "react";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import { ChipIcon, EComponentSize } from "@sberbusiness/triplex-next";

export const ChipIconSizesExample = () => {
    const [sm, setSm] = useState(false);
    const [md, setMd] = useState(false);
    const [lg, setLg] = useState(false);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <ChipIcon size={EComponentSize.SM} selected={sm} onClick={() => setSm((s) => !s)}>
                    <DefaulticonStrokePrdIcon24 paletteIndex={sm ? 6 : 5} />
                </ChipIcon>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <ChipIcon size={EComponentSize.MD} selected={md} onClick={() => setMd((s) => !s)}>
                    <DefaulticonStrokePrdIcon24 paletteIndex={md ? 6 : 5} />
                </ChipIcon>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <ChipIcon size={EComponentSize.LG} selected={lg} onClick={() => setLg((s) => !s)}>
                    <DefaulticonStrokePrdIcon24 paletteIndex={lg ? 6 : 5} />
                </ChipIcon>
            </div>
        </div>
    );
};
