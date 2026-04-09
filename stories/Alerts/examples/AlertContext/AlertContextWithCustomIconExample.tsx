import React from "react";
import { AlertContext, EAlertType } from "@sberbusiness/triplex-next";
import { WaitStrokeStsIcon16 } from "@sberbusiness/icons-next";

export const WithCustomIconExample = () => (
    <div style={{ maxWidth: "750px" }}>
        <AlertContext type={EAlertType.INFO} renderIcon={<WaitStrokeStsIcon16 paletteIndex={4} />}>
            This message provides context or highlights important information to note.
        </AlertContext>
    </div>
);
