import React from "react";
import { AlertProcess, EAlertType, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";

const TYPES = Object.values(EAlertType);

export const TypesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "750px" }}>
        {TYPES.map((type) => (
            <div key={type}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{type.toUpperCase()}</div>
                <AlertProcess type={type}>
                    <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                        This message provides context or highlights important information to note.
                    </Text>
                </AlertProcess>
            </div>
        ))}
    </div>
);
