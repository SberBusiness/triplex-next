import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства компонента TagGroup. */
export interface ITagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое группы, обычно набор Tag. */
    children?: React.ReactNode;
    /** Размер. Задаёт только отступ между тегами, размер самих тегов не меняет. */
    size: EComponentSize;
}
