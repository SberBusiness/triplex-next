import React from "react";
import { Island, EIslandType } from "@sberbusiness/triplex-next";

export const TypesExample = () => (
    <div
        style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
    >
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>TYPE_1</div>
            <Island type={EIslandType.TYPE_1}>
                <Island.Header>Header content</Island.Header>
                <Island.Body>Body content</Island.Body>
                <Island.Footer>Footer content</Island.Footer>
            </Island>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>TYPE_2</div>
            <Island type={EIslandType.TYPE_2}>
                <Island.Header>Header content</Island.Header>
                <Island.Body>Body content</Island.Body>
                <Island.Footer>Footer content</Island.Footer>
            </Island>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>TYPE_3</div>
            <Island type={EIslandType.TYPE_3}>
                <Island.Header>Header content</Island.Header>
                <Island.Body>Body content</Island.Body>
                <Island.Footer>Footer content</Island.Footer>
            </Island>
        </div>
    </div>
);
