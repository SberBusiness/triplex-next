import "@testing-library/jest-dom/vitest";

// Polyfill matchMedia for jsdom environment.
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).matchMedia = (query: string) => {
        return {
            matches: false,
            media: query,
            onchange: null,
            addEventListener: () => {},
            removeEventListener: () => {},
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
        } as unknown as MediaQueryList;
    };
}

// Polyfill ResizeObserver for jsdom environment.
if (typeof window !== "undefined" && typeof window.ResizeObserver !== "function") {
    window.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
}
