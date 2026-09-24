import React from "react";
import { Step, EComponentSize, EStepPosition, EStepStatus } from "@sberbusiness/triplex-next";

/** Аргументы стори Playground. */
export interface IPlaygroundArgs {
    /** Номер шага. */
    step: number;
    /** Статус шага. */
    status: EStepStatus;
    /** Размер. */
    size: EComponentSize;
    /** Позиция шага относительно других. */
    position: EStepPosition;
    /** Текст подсказки. Пустая строка — подсказки нет. */
    children: string;
}

export const Playground = ({ step, status, size, position, children }: IPlaygroundArgs) => (
    <Step step={step} status={status} size={size} position={position}>
        {children}
    </Step>
);
