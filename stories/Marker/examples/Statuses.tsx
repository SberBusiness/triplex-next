import React from "react";
import { Marker, EMarkerStatus, EComponentSize } from "@sberbusiness/triplex-next";

const STATUSES = Object.values(EMarkerStatus);

export const Statuses = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
        {STATUSES.map((status) => (
            <div key={status}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{status.toUpperCase()}</div>
                <Marker status={status} size={EComponentSize.MD} aria-hidden />
            </div>
        ))}
    </div>
);
