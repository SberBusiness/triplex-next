import React from "react";
import { EEmptyViewSize } from "./enums";

/** Свойства компонента EmptyView. */
export interface IEmptyViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** Размер компонента. */
    size: EEmptyViewSize;
    /** Иконка. */
    icon?: React.ReactNode;
    /** Заголовок. */
    title?: React.ReactNode;
    /** Описание. */
    description?: React.ReactNode;
    /** Подпись. */
    caption?: React.ReactNode;
    /** Кнопки. */
    buttons?: React.ReactNode;
}
