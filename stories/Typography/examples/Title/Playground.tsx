import React from "react";
import { Title, ETitleSize, EFontType, EFontWeightTitle } from "@sberbusiness/triplex-next";

export interface PlaygroundArgs {
    size: ETitleSize;
    weight: EFontWeightTitle;
    type: EFontType;
    tag: string;
    underline: boolean;
    strikethrough: boolean;
}

export const Playground = (args: PlaygroundArgs) => <Title {...args}>Интерактивный заголовок с controls</Title>;
