import userEvent from "@testing-library/user-event";

let originalOffsetHeight: PropertyDescriptor | undefined;
let originalOffsetWidth: PropertyDescriptor | undefined;
let originalGetClientRects: PropertyDescriptor | undefined;

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

export const setupTestUser = () => {
    return userEvent.setup();
};
