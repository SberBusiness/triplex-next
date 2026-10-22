import React from "react";
import { SmartSpot, ESmartSpotType } from "@sberbusiness/triplex-next";

export const Default = () => (
    <div style={{ width: 520, height: 300, borderRadius: 16, overflow: "hidden" }}>
        <SmartSpot type={ESmartSpotType.SUCCESS} />
    </div>
);
