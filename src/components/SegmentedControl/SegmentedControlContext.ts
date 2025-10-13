import React from "react";
import { ESegmentedControlType } from "@sberbusiness/triplex-next/components/SegmentedControl/enums";
import {
    TSegmentedControlMultipleValue,
    TSegmentedControlSingleValue,
} from "@sberbusiness/triplex-next/components/SegmentedControl/types";

/** Тип контекста компонента SegmentedControl. */
export interface ISegmentedControlContextType {
    type: ESegmentedControlType;
    value: TSegmentedControlSingleValue | TSegmentedControlMultipleValue;
    disabled: boolean;
    onSegmentSelect: (props: { selected: boolean; value: string }) => void;
}

/** Контекст компонента SegmentedControl. */
export const SegmentedControlContext = React.createContext<ISegmentedControlContextType>({
    type: ESegmentedControlType.SINGLE,
    value: "",
    disabled: false,
    onSegmentSelect: () => {},
});
