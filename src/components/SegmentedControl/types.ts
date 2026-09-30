import React from "react";
import { IButtonBaseProps } from "../Button/ButtonBase";
import { ESegmentedControlSize, ESegmentedControlTheme, ESegmentedControlType } from "./enums";

/** Общие свойства компонента SegmentedControl. */
export interface ISegmentedControlCommonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    /** Визуальный стиль сегментов. */
    theme: ESegmentedControlTheme;
    /** Размер сегментов. */
    size: ESegmentedControlSize;
    /** Неактивное состояние. Блокирует все сегменты. По умолчанию false. */
    disabled?: boolean;
}

/** Свойства компонента SegmentedControl с множественным выбором. */
export interface ISegmentedControlMultipleProps extends ISegmentedControlCommonProps {
    /** Значения выбранных сегментов. */
    value: string[];
    /** Тип выбора элементов. */
    type: ESegmentedControlType.MULTIPLE;
    /** Колбэк-функция выбора элемента. Получает новый набор выбранных значений. */
    onSelect: (value: string[]) => void;
}

/** Свойства компонента SegmentedControl с одиночным выбором. */
export interface ISegmentedControlSingleProps extends ISegmentedControlCommonProps {
    /** Значение выбранного сегмента. */
    value: string;
    /** Тип выбора элементов. */
    type: ESegmentedControlType.SINGLE;
    /** Колбэк-функция выбора элемента. Получает значение нажатого сегмента. */
    onSelect: (value: string) => void;
}

/** Свойства компонента SegmentedControl. */
export type TSegmentedControlProps = ISegmentedControlSingleProps | ISegmentedControlMultipleProps;

/** Свойства компонента SegmentedControlSegment. */
export interface ISegmentedControlSegmentProps extends IButtonBaseProps {
    /** Значение сегмента. Сравнивается со значением SegmentedControl, чтобы определить выбранное состояние. */
    value: string;
}
