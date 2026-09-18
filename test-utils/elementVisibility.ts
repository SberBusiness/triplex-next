/**
 * Подмена метрик HTMLElement для JSDOM.
 *
 * В JSDOM у элементов нет layout: offsetWidth / offsetHeight всегда 0, а getClientRects возвращает
 * пустой список. Код, который решает, видим ли элемент (например, поиск фокусируемых элементов
 * в FocusTrapExtended), считает в такой среде все элементы невидимыми. Эти хелперы делают любой
 * элемент «видимым» на время теста.
 */

let originalOffsetHeight: PropertyDescriptor | undefined;
let originalOffsetWidth: PropertyDescriptor | undefined;
let originalGetClientRects: PropertyDescriptor | undefined;

/** Делает все элементы видимыми: фиксированные размеры и непустой getClientRects. */
export const setupDOMElementMocks = (): void => {
    originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight");
    originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetWidth");
    originalGetClientRects = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "getClientRects");

    Object.defineProperties(HTMLElement.prototype, {
        offsetHeight: {
            get: () => 50,
            configurable: true,
        },
        offsetWidth: {
            get: () => 200,
            configurable: true,
        },
        getClientRects: {
            value: () => [{ width: 200, height: 50, top: 0, left: 0, bottom: 50, right: 200 }],
            configurable: true,
        },
    });
};

/** Возвращает HTMLElement.prototype в исходное состояние. Вызывать в afterAll. */
export const restoreDOMElementMocks = (): void => {
    if (originalOffsetHeight) {
        Object.defineProperty(HTMLElement.prototype, "offsetHeight", originalOffsetHeight);
    } else {
        Reflect.deleteProperty(HTMLElement.prototype, "offsetHeight");
    }

    if (originalOffsetWidth) {
        Object.defineProperty(HTMLElement.prototype, "offsetWidth", originalOffsetWidth);
    } else {
        Reflect.deleteProperty(HTMLElement.prototype, "offsetWidth");
    }

    if (originalGetClientRects) {
        Object.defineProperty(HTMLElement.prototype, "getClientRects", originalGetClientRects);
    } else {
        Reflect.deleteProperty(HTMLElement.prototype, "getClientRects");
    }
};
