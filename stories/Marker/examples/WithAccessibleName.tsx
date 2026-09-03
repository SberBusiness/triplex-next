import React from "react";
import { Marker, EMarkerStatus, EComponentSize } from "@sberbusiness/triplex-next";

export const WithAccessibleName = () => (
    <Marker status={EMarkerStatus.ERROR} size={EComponentSize.MD} role="img" aria-label="Ошибка" />
);
