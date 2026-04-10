import React, { useState } from "react";
import { ChipOptions, EComponentSize } from "@sberbusiness/triplex-next";

export const SizesExample = () => {
    const [countSM, setCountSM] = useState(0);
    const [countMD, setCountMD] = useState(0);
    const [countLG, setCountLG] = useState(0);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <ChipOptions
                    size={EComponentSize.SM}
                    selected={countSM > 0}
                    onClick={() => setCountSM((c) => c + 1)}
                    clearSelected={() => setCountSM(0)}
                >
                    {countSM > 0 ? countSM : undefined}
                </ChipOptions>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <ChipOptions
                    size={EComponentSize.MD}
                    selected={countMD > 0}
                    onClick={() => setCountMD((c) => c + 1)}
                    clearSelected={() => setCountMD(0)}
                >
                    {countMD > 0 ? countMD : undefined}
                </ChipOptions>
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <ChipOptions
                    size={EComponentSize.LG}
                    selected={countLG > 0}
                    onClick={() => setCountLG((c) => c + 1)}
                    clearSelected={() => setCountLG(0)}
                >
                    {countLG > 0 ? countLG : undefined}
                </ChipOptions>
            </div>
        </div>
    );
};
