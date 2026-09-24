import React from "react";
import { Step, EStepStatus } from "@sberbusiness/triplex-next";

const STATUSES = Object.values(EStepStatus);

export const Statuses = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {STATUSES.map((status, index) => (
            <div key={status}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{status.toUpperCase()}</div>
                <Step step={index + 1} status={status} />
            </div>
        ))}
    </div>
);
