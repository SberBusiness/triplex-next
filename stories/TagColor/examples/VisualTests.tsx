import React from "react";
import { TagColor, EComponentSize, ETagColorStatus } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);
const STATUSES = Object.values(ETagColorStatus);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SIZES.map((size) => (
            <div key={size} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                {STATUSES.map((status) => (
                    <TagColor key={status} size={size} status={status}>
                        {`${size.toUpperCase()} ${status}`}
                    </TagColor>
                ))}
            </div>
        ))}
        {/* Пустой тег и обрезка длинного текста — краевые случаи содержимого. */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <TagColor size={EComponentSize.MD} />
            <div style={{ maxWidth: 240 }}>
                <TagColor size={EComponentSize.LG} status={ETagColorStatus.WARNING}>
                    Very long tag text that should be truncated with ellipsis
                </TagColor>
            </div>
        </div>
    </div>
);
