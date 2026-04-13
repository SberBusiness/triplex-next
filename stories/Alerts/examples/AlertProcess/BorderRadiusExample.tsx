import React from "react";
import {
    AlertProcess,
    EAlertProcessBorderRadius,
    EAlertType,
    EFontType,
    ETextSize,
    Text,
} from "@sberbusiness/triplex-next";

const BORDER_RADIUSES = Object.values(EAlertProcessBorderRadius);

export const BorderRadiusExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "750px" }}>
        {BORDER_RADIUSES.map((borderRadius) => (
            <div key={borderRadius}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>
                    {borderRadius.toUpperCase()}
                </div>
                <AlertProcess type={EAlertType.INFO} borderRadius={borderRadius}>
                    <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                        This message provides context or highlights important information to note.
                    </Text>
                </AlertProcess>
            </div>
        ))}
    </div>
);
