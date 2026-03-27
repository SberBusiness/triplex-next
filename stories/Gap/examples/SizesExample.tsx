import React from "react";
import { Gap, TGapSize } from "@sberbusiness/triplex-next";

const SIZES: TGapSize[] = [4, 8, 12, 16, 24, 32, 64, 128];

const blockStyle: React.CSSProperties = {
    padding: "16px",
    textAlign: "center",
    backgroundColor: "rgb(255, 217, 160)",
};

interface ISizeItemProps {
    size: TGapSize;
}

const SizeItem = ({ size }: ISizeItemProps) => (
    <div>
        <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size}px</div>
        <div style={blockStyle}>Above</div>
        <Gap size={size} />
        <div style={blockStyle}>Below</div>
    </div>
);

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "300px" }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
