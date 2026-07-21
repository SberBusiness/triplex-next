import React from "react";
import { CodeText } from "@sberbusiness/triplex-next";

export const Decorations = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <CodeText>const x = 42;</CodeText>
        <CodeText underline>const x = 42; // с подчеркиванием</CodeText>
        <CodeText strikethrough>const x = 42; // с зачеркиванием</CodeText>
        <CodeText underline strikethrough>
            const x = 42; // с подчеркиванием и зачеркиванием
        </CodeText>
    </div>
);
