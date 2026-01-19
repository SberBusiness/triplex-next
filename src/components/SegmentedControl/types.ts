import {
    ESegmentedControlType,
    ESegmentedControlTheme,
    ESegmentedControlSize,
} from "@sberbusiness/triplex-next/components/SegmentedControl/enums";
import { IButtonBaseProps } from "@sberbusiness/triplex-next/components/Button";

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
    /** Значение. */
    value: string[];
    /** Тип выбора элементов. */
    type: ESegmentedControlType.MULTIPLE;
    /** Колбэк-функция выбора элемента. */
    onSelect: (value: string[]) => void;
}

/** Свойства компонента SegmentedControl с одиночным выбором. */
export interface ISegmentedControlSingleProps extends ISegmentedControlCommonProps {
    /** Значение. */
    value: string;
    /** Тип выбора элементов. */
    type: ESegmentedControlType.SINGLE;
    /** Колбэк-функция выбора элемента. */
    onSelect: (value: string) => void;
}

/** Свойства компонента SegmentedControl. */
export type TSegmentedControlProps = ISegmentedControlSingleProps | ISegmentedControlMultipleProps;

/** Свойства компонента SegmentedControlSegment. */
export interface ISegmentedControlSegmentProps extends IButtonBaseProps {
    value: string;
}
