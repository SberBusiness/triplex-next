import React from "react";
import { SmartSpot, ESmartSpotAnimation, ESmartSpotType } from "@sberbusiness/triplex-next";

const ANIMATIONS = Object.values(ESmartSpotAnimation);

export const Animations = () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {ANIMATIONS.map((animation) => (
            <div key={animation}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>
                    {animation.toUpperCase()}
                </div>
                <div style={{ width: 240, height: 240, borderRadius: 16, overflow: "hidden" }}>
                    <SmartSpot type={ESmartSpotType.WARNING} animation={animation} />
                </div>
            </div>
        ))}
    </div>
);
