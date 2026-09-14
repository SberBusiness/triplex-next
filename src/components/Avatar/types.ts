import React from "react";
import { EAvatarSize, TAvatarBorderRadius } from "./enums";

/** Свойства компонента Avatar. */
export interface IAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер. Задаёт ширину и высоту квадратной области аватара. */
    size: EAvatarSize;
    /** Радиус скругления, px. */
    borderRadius: TAvatarBorderRadius;
}
