import React from "react";
import { MarkerStatus, EMarkerStatus, EComponentSize } from "@sberbusiness/triplex-next";

const STATUSES = Object.values(EMarkerStatus);
const SIZES = [EComponentSize.MD, EComponentSize.LG] as const;

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "32px", flexWrap: "wrap" }}>
                    {STATUSES.map((status) => (
                        <MarkerStatus key={status} status={status} size={size} description="Description">
                            Status text
                        </MarkerStatus>
                    ))}
                </div>
            </div>
        ))}
    </div>
);
