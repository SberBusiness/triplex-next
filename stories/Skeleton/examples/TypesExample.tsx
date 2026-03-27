import React from "react";
import { Skeleton, ESkeletonType } from "@sberbusiness/triplex-next";

export const TypesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>DARK</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", padding: "24px" }}>
                <Skeleton type={ESkeletonType.DARK} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.DARK} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.DARK} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.DARK} style={{ height: "80px", width: "calc(50% - 12px)" }} />
            </div>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LIGHT</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", padding: "24px", background: "#EEF0F4" }}>
                <Skeleton type={ESkeletonType.LIGHT} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.LIGHT} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.LIGHT} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.LIGHT} style={{ height: "80px", width: "calc(50% - 12px)" }} />
            </div>
        </div>
    </div>
);
