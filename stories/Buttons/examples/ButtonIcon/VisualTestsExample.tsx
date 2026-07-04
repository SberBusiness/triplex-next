import React from "react";
import { DefaulticonStrokePrdIcon32 } from "@sberbusiness/icons-next";
import { ButtonIcon, EButtonIconShape } from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => (
    <div style={{ display: "flex", gap: 16 }}>
        <ButtonIcon shape={EButtonIconShape.SQUIRCLE}>
            <DefaulticonStrokePrdIcon32 paletteIndex={5} />
        </ButtonIcon>
        <ButtonIcon shape={EButtonIconShape.CIRCLE}>
            <DefaulticonStrokePrdIcon32 paletteIndex={5} />
        </ButtonIcon>
    </div>
);
