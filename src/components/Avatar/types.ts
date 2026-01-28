import React from "react";
import { EAvatarSize } from "./enums";
import { DataAttributes } from "../../types/CoreTypes";

/** Свойства компонента Avatar. */
export interface IAvatarProps extends React.HTMLAttributes<HTMLDivElement>, DataAttributes {
    /** Размер. */
    size: EAvatarSize;
}
