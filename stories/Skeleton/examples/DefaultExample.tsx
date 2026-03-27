import React from "react";
import { Skeleton } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", padding: "24px" }}>
        <Skeleton style={{ height: "80px", width: "calc(50% - 12px)" }} />
        <Skeleton style={{ height: "80px", width: "calc(50% - 12px)" }} />
        <Skeleton style={{ height: "80px", width: "calc(50% - 12px)" }} />
        <Skeleton style={{ height: "80px", width: "calc(50% - 12px)" }} />
    </div>
);
