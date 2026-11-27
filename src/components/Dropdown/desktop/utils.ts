/** Отступ между краем списка и элементом при автоматической прокрутке, px. */
const SCROLL_OFFSET = 4;

/** Прокручивает контейнер списка к началу. */
export const scrollListToTop = (container: HTMLElement | null): void => {
    if (container) {
        container.scrollTop = 0;
    }
};

/**
 * Прокручивает контейнер списка так, чтобы элемент целиком попал в видимую область.
 * Если элемент уже видим полностью, прокрутка не выполняется.
 */
export const scrollListToItem = (container: HTMLElement | null, item: HTMLElement | null): void => {
    if (!container || !item) {
        return;
    }

    const { top: containerTop, bottom: containerBottom } = container.getBoundingClientRect();
    const { top: itemTop, bottom: itemBottom } = item.getBoundingClientRect();

    if (containerTop > itemTop) {
        container.scrollTop = container.scrollTop - containerTop + itemTop - SCROLL_OFFSET;
    } else if (itemBottom > containerBottom) {
        container.scrollTop = container.scrollTop + itemBottom - containerBottom + SCROLL_OFFSET;
    }
};
