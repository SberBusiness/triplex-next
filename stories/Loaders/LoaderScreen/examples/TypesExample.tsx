import React from "react";
import { LoaderScreen, EComponentSize } from "@sberbusiness/triplex-next";

export const TypesExample = () => (
    <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>small</div>
            <div style={{ position: "relative", height: "200px", width: "300px" }}>
                <LoaderScreen type="small" size={EComponentSize.MD} />
            </div>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>middle</div>
            <div style={{ position: "relative", height: "200px", width: "300px" }}>
                <LoaderScreen type="middle" />
            </div>
        </div>
    </div>
);
