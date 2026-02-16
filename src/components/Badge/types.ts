import React from "react";
import { EComponentSize } from "../../enums";

/** Свойства компонента Badge. */
export interface IBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Размер. */
    size: EComponentSize;
}
