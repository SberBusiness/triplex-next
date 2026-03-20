// Проверяет наличие значения.
export const isFilled = (value: string | readonly string[] | number | undefined) => {
    if (value === undefined) {
        return false;
    } else if (typeof value === "number") {
        return true;
    } else {
        return value.length !== 0;
    }
};
