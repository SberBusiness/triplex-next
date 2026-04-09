import React, { useState } from "react";
import { ChipOptions, EComponentSize } from "@sberbusiness/triplex-next";

export const ChipOptionsSizesExample = () => {
    const [sm, setSm] = useState(0);
    const [md, setMd] = useState(0);
    const [lg, setLg] = useState(0);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <ChipOptions
                    size={EComponentSize.SM}
                    selected={sm > 0}
                    onClick={() => setSm((c) => c + 1)}
                    clearSelected={() => setSm(0)}
                >
                    {sm > 0 ? sm : undefined}
                </ChipOptions>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <ChipOptions
                    size={EComponentSize.MD}
                    selected={md > 0}
                    onClick={() => setMd((c) => c + 1)}
                    clearSelected={() => setMd(0)}
                >
                    {md > 0 ? md : undefined}
                </ChipOptions>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <ChipOptions
                    size={EComponentSize.LG}
                    selected={lg > 0}
                    onClick={() => setLg((c) => c + 1)}
                    clearSelected={() => setLg(0)}
                >
                    {lg > 0 ? lg : undefined}
                </ChipOptions>
            </div>
        </div>
    );
};
