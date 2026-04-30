import React from "react";
import { ChipOptions, EComponentSize } from "@sberbusiness/triplex-next";

export const StatesExample = () => {
    return (
        <div style={{ display: "flex", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Selected</div>
                <ChipOptions size={EComponentSize.SM} selected clearSelected={() => {}}>
                    {1}
                </ChipOptions>
                <ChipOptions size={EComponentSize.MD} selected clearSelected={() => {}}>
                    {2}
                </ChipOptions>
                <ChipOptions size={EComponentSize.LG} selected clearSelected={() => {}}>
                    {3}
                </ChipOptions>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Disabled</div>
                <ChipOptions size={EComponentSize.SM} disabled clearSelected={() => {}} />
                <ChipOptions size={EComponentSize.MD} disabled clearSelected={() => {}} />
                <ChipOptions size={EComponentSize.LG} disabled clearSelected={() => {}} />
            </div>
        </div>
    );
};
