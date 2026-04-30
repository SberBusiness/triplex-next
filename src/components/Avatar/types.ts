import React from "react";
import { EAvatarSize, TAvatarBorderRadius } from "./enums";

/** Свойства компонента Avatar. */
export interface IAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер. */
    size: EAvatarSize;
    /** Радиус скругления. */
    borderRadius?: TAvatarBorderRadius;
}
