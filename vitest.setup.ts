import "@testing-library/jest-dom/vitest";

// Basic matchMedia polyfill for jsdom environment used in unit tests.
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
