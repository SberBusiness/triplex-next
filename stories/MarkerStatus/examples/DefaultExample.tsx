import React from "react";
import { MarkerStatus, EMarkerStatus, EComponentSize } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.MD} description="Description">
        Status text
    </MarkerStatus>
);
