import React from "react";
import { Caption, ECaptionSize, EFontType, EFontWeightCaption } from "@sberbusiness/triplex-next";

export interface PlaygroundArgs {
    size: ECaptionSize;
    weight: EFontWeightCaption;
    type: EFontType;
    tag: string;
    underline: boolean;
    strikethrough: boolean;
}

export const Playground = (args: PlaygroundArgs) => <Caption {...args}>Интерактивная подпись с controls</Caption>;
