import React, { useState } from "react";
import { Chip, EComponentSize } from "@sberbusiness/triplex-next";

export const SizesExample = () => {
    const [sm, setSm] = useState(false);
    const [md, setMd] = useState(false);
    const [lg, setLg] = useState(false);
    return (
        <div style={{ display: "flex", gap: 12 }}>
            <Chip size={EComponentSize.SM} selected={sm} onClick={() => setSm((s) => !s)}>
                SM
            </Chip>
            <Chip size={EComponentSize.MD} selected={md} onClick={() => setMd((s) => !s)}>
                MD
            </Chip>
            <Chip size={EComponentSize.LG} selected={lg} onClick={() => setLg((s) => !s)}>
                LG
            </Chip>
        </div>
    );
};
