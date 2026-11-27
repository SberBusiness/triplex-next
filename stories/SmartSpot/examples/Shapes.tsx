import React from "react";
import { SmartSpot, ESmartSpotShape } from "@sberbusiness/triplex-next";

const SHAPES = Object.values(ESmartSpotShape);

export const Shapes = () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {SHAPES.map((shape) => (
            <div key={shape}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{shape.toUpperCase()}</div>
                <div
                    style={{
                        display: "grid",
                        placeItems: "center",
                        width: 240,
                        height: 240,
                        borderRadius: 16,
                        overflow: "hidden",
                    }}
                >
                    <SmartSpot shape={shape} blur={8} />
                </div>
            </div>
        ))}
    </div>
);
