/** Маска. Каждый элемент массива должен быть либо строкой, либо регулярным выражением. Каждая строка — это фиксированный символ в маске, а каждое регулярное выражение — это заполнитель, который принимает пользовательский ввод.
 * Подробнее можно ознакомиться https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask.
 * */
export type TFormFieldMaskedInputMask = Array<string | RegExp>;
