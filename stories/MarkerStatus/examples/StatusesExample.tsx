import React from "react";
import { MarkerStatus, EMarkerStatus, EComponentSize } from "@sberbusiness/triplex-next";

const STATUSES = Object.values(EMarkerStatus);

export const StatusesExample = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "32px", flexWrap: "wrap" }}>
        {STATUSES.map((status) => (
            <div key={status}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{status.toUpperCase()}</div>
                <MarkerStatus status={status} size={EComponentSize.MD} description="Description">
                    Status text
                </MarkerStatus>
            </div>
        ))}
    </div>
);
