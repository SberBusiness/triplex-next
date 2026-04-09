import React from "react";
import { AlertContext, EAlertType } from "@sberbusiness/triplex-next";

const TYPES = Object.values(EAlertType).filter((type) => type !== EAlertType.FEATURE);

export const TypesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "750px" }}>
        {TYPES.map((type) => (
            <div key={type}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{type.toUpperCase()}</div>
                <AlertContext type={type}>
                    This message provides context or highlights important information to note.
                </AlertContext>
            </div>
        ))}
    </div>
);
