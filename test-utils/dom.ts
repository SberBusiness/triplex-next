import { vi } from "vitest";

let resizeObserverCallback: (() => void) | null = null;
vi.stubGlobal(
    "ResizeObserver",
    class {
        constructor(cb: () => void) {
            resizeObserverCallback = cb;
        }
        observe() {}
        unobserve() {}
        disconnect() {
            resizeObserverCallback = null;
        }
    },
);

/** Получить текущий зарегистрированный колбэк ResizeObserver. */
export function getResizeCallback(): (() => void) | null {
    return resizeObserverCallback;
}

/** Сбросить состояние колбэка между тестами. */
export function resetResizeCallback(): void {
    resizeObserverCallback = null;
}

/** Динамическая подмена размеров элементов для JSDOM среды. */
export function mockElementSize(
    element: HTMLElement,
    metrics: { width?: number; height?: number; clientWidth?: number; clientHeight?: number },
): void {
    if (metrics.width !== undefined || metrics.height !== undefined) {
        element.getBoundingClientRect = () => ({
            width: metrics.width ?? 0,
            height: metrics.height ?? 0,
            top: 0,
            left: 0,
            right: metrics.width ?? 0,
            bottom: metrics.height ?? 0,
            x: 0,
            y: 0,
            toJSON: () => {},
        });
    }
    if (metrics.clientWidth !== undefined) {
        Object.defineProperty(element, "clientWidth", { value: metrics.clientWidth, configurable: true });
    }
    if (metrics.clientHeight !== undefined) {
        Object.defineProperty(element, "clientHeight", { value: metrics.clientHeight, configurable: true });
    }
}

/** Хелпер для создания фейкового Touch-объекта. */
export function createTouch(target: HTMLElement, clientX: number): Touch {
    return {
        identifier: Date.now(),
        target,
        clientX,
        clientY: 0,
        pageX: clientX,
        pageY: 0,
        screenX: clientX,
        screenY: 0,
        force: 0,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
    };
}

/** Превращает массив Touch в псевдо-TouchList для JSDOM событий. */
export function createTouchList(touches: Touch[]): TouchList & Touch[] {
    const touchList = Object.create(Object.prototype);

    Object.defineProperty(touchList, "length", {
        value: touches.length,
        configurable: true,
    });

    Object.defineProperty(touchList, "item", {
        value: (index: number) => touches.at(index) || null,
        configurable: true,
    });

    Object.defineProperty(touchList, Symbol.iterator, {
        value: () => touches.values(),
        configurable: true,
    });

    touches.forEach((touch, index) => {
        Object.defineProperty(touchList, index, {
            value: touch,
            enumerable: true,
            configurable: true,
        });
    });

    return touchList;
}
