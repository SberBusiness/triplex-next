import React from "react";
import { EComponentSize } from "../../enums";

/** Свойства компонента Badge. */
export interface IBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "prefix" | "postfix"> {
    /** Размер бейджа: SM (высота 16px) / MD (20px) / LG (24px). Обязательный, значения по умолчанию нет. */
    size: EComponentSize;
    /** Содержимое бейджа. Оборачивается во внутренний элемент с горизонтальными отступами по размеру. */
    children?: React.ReactNode;
    /** Контент перед основным содержимым, обычно иконка. Не рендерится, если значение falsy. */
    prefix?: React.ReactNode;
    /** Контент после основного содержимого, обычно иконка. Не рендерится, если значение falsy. */
    postfix?: React.ReactNode;
}

/** Свойства компонента BadgeDot. */
export interface IBadgeDotProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    /** Размер точки: SM (6px) / MD (8px) / LG (10px). Обязательный, значения по умолчанию нет. */
    size: EComponentSize;
    /** Точка не имеет содержимого. */
    children?: never;
}

/** Свойства компонента BadgeContent — внутренней обёртки содержимого Badge. */
export interface IBadgeContentProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Размер, определяющий горизонтальные отступы содержимого. Приходит из Badge. */
    size: EComponentSize;
    /** Флаг, определяющий, нужно ли удалить левый отступ. Выставляется, когда у Badge есть prefix. */
    noPaddingLeft?: boolean;
    /** Флаг, определяющий, нужно ли удалить правый отступ. Выставляется, когда у Badge есть postfix. */
    noPaddingRight?: boolean;
}
