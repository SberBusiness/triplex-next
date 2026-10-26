import React from "react";
import { SmartSpot, ESmartSpotType } from "@sberbusiness/triplex-next";

const TYPES = Object.values(ESmartSpotType);

export const Types = () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {TYPES.map((type) => (
            <div key={type}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{type.toUpperCase()}</div>
                <div style={{ width: 240, height: 240, borderRadius: 16, overflow: "hidden" }}>
                    <SmartSpot type={type} />
                </div>
            </div>
        ))}
    </div>
);
