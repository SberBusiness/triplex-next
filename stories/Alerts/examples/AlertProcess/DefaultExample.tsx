import React from "react";
import { AlertProcess, EAlertType, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div style={{ maxWidth: "750px" }}>
        <AlertProcess type={EAlertType.INFO}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                This message provides context or highlights important information to note.
            </Text>
        </AlertProcess>
    </div>
);
