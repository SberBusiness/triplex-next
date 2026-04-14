import React from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import { AlertProcess, EAlertType, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";

export const WithCustomIconExample = () => (
    <div style={{ maxWidth: "750px" }}>
        <AlertProcess type={EAlertType.INFO} renderIcon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                This message provides context or highlights important information to note.
            </Text>
        </AlertProcess>
    </div>
);
