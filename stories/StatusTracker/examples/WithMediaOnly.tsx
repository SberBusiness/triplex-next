import React from "react";
import { StatusTracker, EStatusTrackerType, EStatusTrackerVerticalAlign } from "@sberbusiness/triplex-next";
import { WaitStsIcon84 } from "@sberbusiness/icons-next";

export const WithMediaOnly = () => (
    <div style={{ maxWidth: 372, padding: 24, background: "#E9EDF1" }}>
        <StatusTracker type={EStatusTrackerType.WARNING} verticalAlign={EStatusTrackerVerticalAlign.MIDDLE}>
            <StatusTracker.Media>
                <WaitStsIcon84 />
            </StatusTracker.Media>
        </StatusTracker>
    </div>
);
