import React from "react";
import { ESegmentedControlType } from "./enums";

/** Тип контекста компонента SegmentedControl. */
export interface ISegmentedControlContextType {
    /** Тип выбора элементов. */
    type: ESegmentedControlType;
    /** Значение SegmentedControl: строка при SINGLE, массив строк при MULTIPLE. */
    value: string | string[];
    /** Неактивное состояние всего контрола. */
    disabled: boolean;
    /** Колбэк-функция нажатия на сегмент. selected — состояние, в которое сегмент переходит. */
    onSegmentSelect: (props: { selected: boolean; value: string }) => void;
}

/** Контекст компонента SegmentedControl. */
export const SegmentedControlContext = React.createContext<ISegmentedControlContextType>({
    type: ESegmentedControlType.SINGLE,
    value: "",
    disabled: false,
    onSegmentSelect: () => {},
});
