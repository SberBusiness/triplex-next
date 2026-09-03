import React from "react";
import { Marker, EMarkerStatus, EComponentSize } from "@sberbusiness/triplex-next";

/** Аргументы стори Playground. */
export interface IPlaygroundArgs {
    /** Статус, задающий цвет точки. */
    status: EMarkerStatus;
    /** Размер. */
    size: EComponentSize;
}

export const Playground = ({ status, size }: IPlaygroundArgs) => <Marker status={status} size={size} aria-hidden />;
