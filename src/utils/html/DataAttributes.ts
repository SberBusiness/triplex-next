/**
 * Тип, для передачи data-атрибутов через props.
 * Например {'test-id': 'value'} добавит элементу атрибут data-test-id="value".
 */
export type TDataHTMLAttributes = Record<string, string>;

/**
 * Возвращает объект с HTML data-атрибутами.
 */
export const getDataHTMLAttributes = (dataAttributes: TDataHTMLAttributes): Record<string, string> =>
    Object.keys(dataAttributes).reduce(
        (accumulator, currentValue) => ({
            ...accumulator,
            [`data-${currentValue}`]: dataAttributes[currentValue],
        }),
        {},
    );
