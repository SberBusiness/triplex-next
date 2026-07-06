import React from "react";
import { Blob } from "../../../src/components/Blob";

/**
 * Blob как декоративный фон: располагается под контентом через position и
 * не перехватывает клики (pointer-events: none).
 */
export const Example = () => (
    <div
        style={{
            position: "relative",
            width: 500,
            height: 500,
            overflow: "hidden",
            borderRadius: 24,
            background: "#0b0f19",
        }}
    >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <Blob />
        </div>
        <div
            style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                textAlign: "center",
                color: "#ffffff",
            }}
        >
            <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>Triplex</h2>
            <p style={{ margin: 0, fontSize: 16, opacity: 0.8 }}>Анимированный фон на основе Blob</p>
        </div>
    </div>
);
