import React from "react";
import { Island, EIslandType, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);

export const SizesExample = () => (
    <div
        style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
    >
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
                <Island type={EIslandType.TYPE_1} size={size}>
                    <Island.Header>Header content</Island.Header>
                    <Island.Body>Body content</Island.Body>
                    <Island.Footer>Footer content</Island.Footer>
                </Island>
            </div>
        ))}
    </div>
);
