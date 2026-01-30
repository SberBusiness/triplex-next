import React from "react";
import { EAvatarSize } from "./enums";

/** Свойства компонента Avatar. */
export interface IAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер. */
    size: EAvatarSize;
}
