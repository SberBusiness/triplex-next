import React from "react";
import { DesignTokensCore, SmartSpot, type ISmartSpotProps } from "@sberbusiness/triplex-next";

export const PLAYGROUND_COLORS = {
    "ColorSuccess.50": DesignTokensCore.ColorSuccess[50].value,
    "ColorWarning.50": DesignTokensCore.ColorWarning[50].value,
    "ColorError.70": DesignTokensCore.ColorError[70].value,
    "ColorSystem.90": DesignTokensCore.ColorSystem[90].value,
};

export type PlaygroundArgs = Pick<ISmartSpotProps, "animation" | "blur" | "distance" | "duration" | "shape"> & {
    color: keyof typeof PLAYGROUND_COLORS;
};

export const Playground = ({ color, ...args }: PlaygroundArgs) => (
    <div
        style={{
            display: "grid",
            placeItems: "center",
            width: 520,
            maxWidth: "100%",
            height: 300,
            borderRadius: 16,
            overflow: "hidden",
        }}
    >
        <SmartSpot {...args} style={{ backgroundColor: PLAYGROUND_COLORS[color] }} />
    </div>
);
