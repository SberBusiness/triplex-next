import React from "react";
import { DefaulticonStrokePrdIcon32 } from "@sberbusiness/icons-next";
import { ButtonIcon, EButtonIconShape } from "@sberbusiness/triplex-next";

export const StatesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Active</div>
            <ButtonIcon shape={EButtonIconShape.SQUIRCLE} active>
                <DefaulticonStrokePrdIcon32 paletteIndex={5} />
            </ButtonIcon>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Disabled</div>
            <ButtonIcon shape={EButtonIconShape.SQUIRCLE} disabled>
                <DefaulticonStrokePrdIcon32 paletteIndex={5} />
            </ButtonIcon>
        </div>
    </div>
);
