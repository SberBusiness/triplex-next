import React from "react";
import { AlertProcess, EAlertType, EFontType, ETextSize, Gap, Link, Text } from "@sberbusiness/triplex-next";

export const WithLinkExample = () => (
    <div style={{ maxWidth: "750px" }}>
        <AlertProcess type={EAlertType.INFO}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                This message provides context or highlights important information to note.
            </Text>
            <Gap size={8} />
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                <Link href="#" onClick={(event) => event.preventDefault()}>
                    Link text
                </Link>
            </Text>
        </AlertProcess>
    </div>
);
