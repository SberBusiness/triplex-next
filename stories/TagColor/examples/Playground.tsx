import React from "react";
import { TagColor, EComponentSize, ETagColorStatus } from "@sberbusiness/triplex-next";

/** Аргументы стори Playground. */
export interface IPlaygroundArgs {
    /** Содержимое тега. */
    children: string;
    /** Размер. */
    size: EComponentSize;
    /** Статус. */
    status: ETagColorStatus;
}

export const Playground = ({ children, size, status }: IPlaygroundArgs) => (
    <TagColor size={size} status={status}>
        {children}
    </TagColor>
);
