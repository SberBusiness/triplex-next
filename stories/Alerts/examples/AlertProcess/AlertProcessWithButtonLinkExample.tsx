import React from "react";
import {
    AlertProcess,
    Button,
    EAlertType,
    EButtonTheme,
    EComponentSize,
    EFontType,
    ETextSize,
    Gap,
    Text,
} from "@sberbusiness/triplex-next";

export const AlertProcessWithButtonLinkExample = () => (
    <div style={{ maxWidth: "750px" }}>
        <AlertProcess type={EAlertType.INFO}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                This message provides context or highlights important information to note.
            </Text>
            <Gap size={8} />
            <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                Button link text
            </Button>
        </AlertProcess>
    </div>
);
