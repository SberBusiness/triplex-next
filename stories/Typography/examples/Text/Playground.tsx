import React from "react";
import { Text, ETextSize, ELineType, EFontType, EFontWeightText } from "@sberbusiness/triplex-next";

export interface PlaygroundArgs {
    size: ETextSize;
    weight: EFontWeightText;
    line: ELineType;
    type: EFontType;
    tag: string;
    underline: boolean;
    strikethrough: boolean;
}

export const Playground = (args: PlaygroundArgs) => <Text {...args}>Интерактивный текст с controls</Text>;
