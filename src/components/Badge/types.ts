import React from "react";
import { EComponentSize } from "../../enums";

/** Свойства компонента Badge. */
export interface IBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "prefix" | "postfix"> {
    size: EComponentSize;
    prefix?: React.ReactNode;
    postfix?: React.ReactNode;
}

/** Свойства компонента BadgeDot. */
export interface IBadgeDotProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    size: EComponentSize;
    children?: never;
}

/** Свойства компонента BadgeContent. */
export interface IBadgeContentProps extends React.HTMLAttributes<HTMLSpanElement> {
    size: EComponentSize;
    /** Флаг, определяющий, нужно ли удалить левый отступ. */
    noPaddingLeft?: boolean;
    /** Флаг, определяющий, нужно ли удалить правый отступ. */
    noPaddingRight?: boolean;
}
