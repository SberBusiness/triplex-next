import { EFontType } from "./enums";

/** Свойства компонента типографики. */
export interface ITypographyProps {
    /** Название тэга. */
    tag?: string;
    /** Тип (цвет шрифта) */
    type?: EFontType;
    /** Наличие подчёркивания. */
    underline?: boolean;
    /** Наличие зачёркивания. */
    strikethrough?: boolean;
}
