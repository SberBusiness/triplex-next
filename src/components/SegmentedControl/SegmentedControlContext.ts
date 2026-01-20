import React from "react";
import { ESegmentedControlType } from "./enums";

/** Тип контекста компонента SegmentedControl. */
export interface ISegmentedControlContextType {
    type: ESegmentedControlType;
    value: string | string[];
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
