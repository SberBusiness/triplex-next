import React from "react";
import { AlertContext, EAlertType } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div style={{ maxWidth: "750px" }}>
        <AlertContext type={EAlertType.INFO}>
            This message provides context or highlights important information to note.
        </AlertContext>
    </div>
);
