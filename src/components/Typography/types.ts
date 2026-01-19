import { EFontType } from "./enums";

/** Свойства компонента типографики. */
export interface ITypographyProps {
    /** Тип (цвет шрифта) */
    type?: EFontType;
    /** Наличие подчёркивания. */
    underline?: boolean;
    /** Наличие зачёркивания. */
    strikethrough?: boolean;
}
