import React from "react";
import { DefaulticonStrokePrdIcon32 } from "@sberbusiness/icons-next";
import { ButtonIcon, EButtonIconShape } from "@sberbusiness/triplex-next";

export const ButtonIconDefaultExample = () => (
    <ButtonIcon shape={EButtonIconShape.SQUIRCLE}>
        <DefaulticonStrokePrdIcon32 paletteIndex={5} />
    </ButtonIcon>
);
