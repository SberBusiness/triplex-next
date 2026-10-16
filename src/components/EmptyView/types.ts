import React from "react";
import { EEmptyViewSize } from "./enums";

/** Свойства компонента EmptyView. */
export interface IEmptyViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** Размер компонента: SM — текст B3, MD — текст B2. */
    size: EEmptyViewSize;
    /** Иконка пустого состояния. Размер иконки задаёт потребитель. */
    icon?: React.ReactNode;
    /** Заголовок H3 с начертанием MEDIUM для обоих размеров. */
    title?: React.ReactNode;
    /** Описание. Вторичный цвет при наличии заголовка, иначе основной. */
    description?: React.ReactNode;
    /** Дополнительная подпись вторичным цветом. */
    caption?: React.ReactNode;
    /** Кнопки действий с отступом 16px для SM и 24px для MD. */
    buttons?: React.ReactNode;
}
