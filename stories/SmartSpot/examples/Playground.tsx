import React from "react";
import { SmartSpot, type ISmartSpotProps } from "@sberbusiness/triplex-next";

export type PlaygroundArgs = Pick<ISmartSpotProps, "type" | "animation" | "blur" | "distance" | "duration" | "shape">;

export const Playground = (args: PlaygroundArgs) => (
    // SmartSpot заполняет родителя: размер и скругление задаёт обёртка.
    <div style={{ width: 520, height: 300, borderRadius: 16, overflow: "hidden" }}>
        <SmartSpot {...args} />
    </div>
);
