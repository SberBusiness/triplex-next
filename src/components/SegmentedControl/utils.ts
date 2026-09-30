import type { ReactNode } from "react";
import { ESegmentedControlType } from "./enums";

/**
 * Определяет, выбран ли сегмент.
 * При SINGLE значение сегмента сравнивается со значением контрола, при MULTIPLE ищется в массиве значений.
 * Строковое значение контрола при MULTIPLE (допустимо по типу, но изнутри компонента не достигается)
 * считается отсутствием выбора — так исключается подстрочное сравнение через String.prototype.includes.
 */
export const isSegmentSelected = (
    type: ESegmentedControlType,
    segmentValue: string,
    controlValue: string | string[],
): boolean => {
    switch (type) {
        case ESegmentedControlType.SINGLE:
            return segmentValue === controlValue;
        case ESegmentedControlType.MULTIPLE:
            return Array.isArray(controlValue) && controlValue.includes(segmentValue);
    }
};

/**
 * Возвращает значение атрибута title сегмента.
 * Приоритет у переданного title; если его нет, а содержимое сегмента — строка, она используется как title.
 */
export const getSegmentTitle = (title: string | undefined, children: ReactNode): string | undefined => {
    if (title) {
        return title;
    }

    if (typeof children === "string") {
        return children;
    }

    return undefined;
};
