import React from "react";
import {
    DefaulticonStrokePrdIcon16,
    DefaulticonStrokePrdIcon20,
    DefaulticonStrokePrdIcon24,
    DefaulticonStrokePrdIcon32,
} from "@sberbusiness/icons-next";
import { ButtonIcon, EButtonIconShape } from "@sberbusiness/triplex-next";

export const ButtonIconSizesExample = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <ButtonIcon shape={EButtonIconShape.SQUIRCLE}>
            <DefaulticonStrokePrdIcon16 paletteIndex={5} />
        </ButtonIcon>
        <ButtonIcon shape={EButtonIconShape.SQUIRCLE}>
            <DefaulticonStrokePrdIcon20 paletteIndex={5} />
        </ButtonIcon>
        <ButtonIcon shape={EButtonIconShape.SQUIRCLE}>
            <DefaulticonStrokePrdIcon24 paletteIndex={5} />
        </ButtonIcon>
        <ButtonIcon shape={EButtonIconShape.SQUIRCLE}>
            <DefaulticonStrokePrdIcon32 paletteIndex={5} />
        </ButtonIcon>
    </div>
);
