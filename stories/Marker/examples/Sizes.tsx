import React from "react";
import { Marker, EMarkerStatus, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);

export const Sizes = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <Marker status={EMarkerStatus.SUCCESS} size={size} aria-hidden />
            </div>
        ))}
    </div>
);
