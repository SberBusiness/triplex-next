import React from "react";
import { Skeleton, ESkeletonType } from "@sberbusiness/triplex-next";

export const TypesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>TYPE_1</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", padding: "24px", background: "#EEF0F4" }}>
                <Skeleton type={ESkeletonType.TYPE_1} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.TYPE_1} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.TYPE_1} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.TYPE_1} style={{ height: "80px", width: "calc(50% - 12px)" }} />
            </div>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>TYPE_2</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", padding: "24px" }}>
                <Skeleton type={ESkeletonType.TYPE_2} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.TYPE_2} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.TYPE_2} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.TYPE_2} style={{ height: "80px", width: "calc(50% - 12px)" }} />
            </div>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>TYPE_3</div>
            <div
                className="skeleton-type3-background"
                style={{ display: "flex", flexWrap: "wrap", gap: "24px", padding: "24px" }}
            >
                <Skeleton type={ESkeletonType.TYPE_3} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.TYPE_3} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.TYPE_3} style={{ height: "80px", width: "calc(50% - 12px)" }} />
                <Skeleton type={ESkeletonType.TYPE_3} style={{ height: "80px", width: "calc(50% - 12px)" }} />
            </div>
        </div>
    </div>
);
