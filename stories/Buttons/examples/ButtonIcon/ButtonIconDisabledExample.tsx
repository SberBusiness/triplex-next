import React from "react";
import { DefaulticonStrokePrdIcon32 } from "@sberbusiness/icons-next";
import { ButtonIcon, EButtonIconShape } from "@sberbusiness/triplex-next";

export const ButtonIconDisabledExample = () => (
    <ButtonIcon shape={EButtonIconShape.SQUIRCLE} disabled>
        <DefaulticonStrokePrdIcon32 paletteIndex={5} />
    </ButtonIcon>
);
