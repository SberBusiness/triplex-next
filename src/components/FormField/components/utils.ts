/**
 * Проверяет наличие значения в элементе ввода.
 *
 * Число считается заполненным всегда (включая 0), строка и массив строк — по длине.
 *
 * @param value Значение элемента ввода.
 * @returns true, если значение непустое.
 */
export const isFilled = (value: string | readonly string[] | number | undefined): boolean => {
    if (value === undefined) {
        return false;
    } else if (typeof value === "number") {
        return true;
    } else {
        return value.length !== 0;
    }
};
