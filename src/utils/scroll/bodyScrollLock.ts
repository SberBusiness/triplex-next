const lockCounts = new Map<string, number>();

/**
 * Вешает className на document.body и возвращает функцию снятия блокировки.
 * Блокировки с одним className считаются: класс снимается вместе с последней из них.
 * Повторный вызов функции снятия ничего не делает.
 */
export const lockBodyScroll = (className: string): (() => void) => {
    let locked = true;

    lockCounts.set(className, (lockCounts.get(className) ?? 0) + 1);
    document.body.classList.add(className);

    return () => {
        if (!locked) {
            return;
        }

        locked = false;

        const count = (lockCounts.get(className) ?? 1) - 1;

        if (count > 0) {
            lockCounts.set(className, count);
        } else {
            lockCounts.delete(className);
            document.body.classList.remove(className);
        }
    };
};
