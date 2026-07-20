import React from "react";
import { CodeText, EFontType } from "@sberbusiness/triplex-next";

export interface PlaygroundArgs {
    type: EFontType;
    tag: string;
    underline: boolean;
    strikethrough: boolean;
}

export const Playground = (args: PlaygroundArgs) => (
    <CodeText {...args}>const greeting = &quot;Hello, World!&quot;;</CodeText>
);
