/**
 * Тип, для передачи aria-атрибутов через props.
 * Например {'label': 'value'} добавляет элементу атрибут aria-label="value".
 */
export type TAriaHTMLAttributes = Record<string, string>;

/**
 * Возвращает объект с HTML aria-атрибутом.
 */
export const getAriaHTMLAttributes = (ariaAttributes: TAriaHTMLAttributes): Record<string, string> =>
    Object.keys(ariaAttributes).reduce(
        (accumulator, currentValue) => ({
            ...accumulator,
            [`aria-${currentValue}`]: ariaAttributes[currentValue],
        }),
        {},
    );
