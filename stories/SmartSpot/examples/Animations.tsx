import React from "react";
import { DesignTokensCore, SmartSpot, ESmartSpotAnimation } from "@sberbusiness/triplex-next";

const ANIMATIONS = Object.values(ESmartSpotAnimation);

export const Animations = () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {ANIMATIONS.map((animation) => (
            <div key={animation}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>
                    {animation.toUpperCase()}
                </div>
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
                    <SmartSpot
                        animation={animation}
                        blur={20}
                        style={{ backgroundColor: DesignTokensCore.ColorWarning[50].value }}
                    />
                </div>
            </div>
        ))}
    </div>
);
