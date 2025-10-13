import {
    ESegmentedControlType,
    ESegmentedControlTheme,
    ESegmentedControlSize,
} from "@sberbusiness/triplex-next/components/SegmentedControl/enums";
import { IButtonBaseProps } from "@sberbusiness/triplex-next/components/Button";

/** Значение SegmentedControl с множественным выбором. */
export type TSegmentedControlMultipleValue = string[];

/** Обработчик выбора SegmentedControl с множественным выбором. */
export type TSegmentedControlMultipleOnSelect = (value: TSegmentedControlMultipleValue) => void;

/** Значение SegmentedControl с одиночным выбором. */
export type TSegmentedControlSingleValue = string;

/** Обработчик выбора SegmentedControl с одиночным выбором. */
export type TSegmentedControlSingleOnSelect = (value: TSegmentedControlSingleValue) => void;

/** Общие свойства компонента SegmentedControl. */
export interface ISegmentedControlCommonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    /** Визуальный стиль сегментов. */
    theme: ESegmentedControlTheme;
    /** Размер сегментов. */
    size: ESegmentedControlSize;
    /** Неактивное состояние. */
    disabled?: boolean;
}

/** Свойства компонента SegmentedControl с множественным выбором. */
export interface ISegmentedControlMultipleProps extends ISegmentedControlCommonProps {
    value: TSegmentedControlMultipleValue;
    type: ESegmentedControlType.MULTIPLE;
    onSelect: TSegmentedControlMultipleOnSelect;
}

/** Свойства компонента SegmentedControl с одиночным выбором. */
export interface ISegmentedControlSingleProps extends ISegmentedControlCommonProps {
    value: TSegmentedControlSingleValue;
    type: ESegmentedControlType.SINGLE;
    onSelect: TSegmentedControlSingleOnSelect;
}

/** Свойства компонента SegmentedControlSegment. */
export interface ISegmentedControlSegmentProps extends IButtonBaseProps {
    value: string;
}
