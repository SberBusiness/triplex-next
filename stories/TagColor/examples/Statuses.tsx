import React from "react";
import { TagColor, EComponentSize, ETagColorStatus } from "@sberbusiness/triplex-next";

const STATUSES = Object.values(ETagColorStatus);

export const Statuses = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {STATUSES.map((status) => (
            <div key={status}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{status.toUpperCase()}</div>
                <TagColor size={EComponentSize.MD} status={status}>
                    Tag text
                </TagColor>
            </div>
        ))}
    </div>
);
