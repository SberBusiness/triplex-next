import { MaskedInputProps } from "react-text-mask";

/** Тип маски для маскированного ввода. */
export type TMaskedInputMask = Array<string | RegExp>;

/** Свойства компонента MaskedInput. */
export interface IMaskedInputProps extends Omit<MaskedInputProps, "guide" | "mask"> {
    /** Текущее значение поля ввода. */
    value: string;
    /**
     * Маска. Каждый элемент массива должен быть либо строкой, либо регулярным выражением. Каждая строка — это
     * фиксированный символ в маске, а каждое регулярное выражение — это заполнитель, который принимает пользовательский
     * ввод.
     * Подробнее можно ознакомиться: https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask.
     */
    mask: TMaskedInputMask;
    /** Плейсхолдер, отображаемый при вводе. Например: дд.мм.гггг, при вводе будет отображаться как 22.1м.гггг. */
    placeholderMask?: string;
}
