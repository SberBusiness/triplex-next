import { vi } from "vitest";

/** Минимальная форма записи ResizeObserver, достаточная для FormFieldPrefix / FormFieldPostfix. */
interface IMockedResizeObserver {
    callback: (entries: Array<{ target: Element }>) => void;
    elements: Element[];
    disconnected: boolean;
}

const observers: IMockedResizeObserver[] = [];

vi.stubGlobal(
    "ResizeObserver",
    class {
        private readonly record: IMockedResizeObserver;

        constructor(callback: (entries: Array<{ target: Element }>) => void) {
            this.record = { callback, elements: [], disconnected: false };
            observers.push(this.record);
        }

        observe(element: Element): void {
            this.record.elements.push(element);
        }

        unobserve(element: Element): void {
            this.record.elements = this.record.elements.filter((item) => item !== element);
        }

        disconnect(): void {
            this.record.disconnected = true;
        }
    },
);

/** Сбрасывает список созданных наблюдателей между тестами. */
export const resetResizeObservers = (): void => {
    observers.length = 0;
};

/** Количество наблюдателей, которые ещё не были отключены. */
export const getActiveResizeObserverCount = (): number => observers.filter((observer) => !observer.disconnected).length;

/** Подменяет ширину элемента и уведомляет наблюдающие за ним ResizeObserver. */
export const resizeElement = (element: HTMLElement, width: number): void => {
    element.getBoundingClientRect = () =>
        ({
            width,
            height: 0,
            top: 0,
            left: 0,
            right: width,
            bottom: 0,
            x: 0,
            y: 0,
            toJSON: () => ({}),
        }) as DOMRect;

    observers
        .filter((observer) => !observer.disconnected && observer.elements.includes(element))
        .forEach((observer) => observer.callback([{ target: element }]));
};
