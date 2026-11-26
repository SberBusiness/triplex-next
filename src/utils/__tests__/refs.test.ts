import { createRef } from "react";
import { mergeRefs } from "../refs";

describe("mergeRefs", () => {
    it("detaches each ref according to the result of its own attachment", () => {
        const element = document.createElement("div");
        const objectRef = createRef<HTMLDivElement>();
        const cleanup = vi.fn();
        const withCleanup = vi.fn<React.RefCallback<HTMLDivElement>>(() => cleanup);
        const withoutCleanup = vi.fn();
        const merged = mergeRefs<HTMLDivElement>(withCleanup, objectRef, withoutCleanup, null);

        const detach = merged(element);
        expect(objectRef.current).toBe(element);
        expect(withCleanup).toHaveBeenCalledExactlyOnceWith(element);
        expect(withoutCleanup).toHaveBeenCalledExactlyOnceWith(element);

        expect(detach).toBeTypeOf("function");
        detach?.();
        expect(cleanup).toHaveBeenCalledTimes(1);
        expect(withCleanup).toHaveBeenCalledTimes(1);
        expect(objectRef.current).toBeNull();
        expect(withoutCleanup.mock.calls).toEqual([[element], [null]]);
    });

    it("keeps the null detach convention when none of the refs returns cleanup", () => {
        const element = document.createElement("div");
        const callback = vi.fn();
        const objectRef = createRef<HTMLDivElement>();
        const merged = mergeRefs<HTMLDivElement>(objectRef, callback);

        expect(merged(element)).toBeUndefined();
        merged(null);

        expect(callback.mock.calls).toEqual([[element], [null]]);
        expect(objectRef.current).toBeNull();
    });

    it("keeps cleanups independent when the same callback is attached to two nodes", () => {
        const cleanupFirst = vi.fn();
        const cleanupSecond = vi.fn();
        const callback = vi.fn().mockReturnValueOnce(cleanupFirst).mockReturnValueOnce(cleanupSecond);
        const merged = mergeRefs<HTMLDivElement>(callback);
        const detachFirst = merged(document.createElement("div"));
        const detachSecond = merged(document.createElement("div"));

        detachSecond?.();
        expect(cleanupSecond).toHaveBeenCalledTimes(1);
        expect(cleanupFirst).not.toHaveBeenCalled();
        detachFirst?.();
        expect(cleanupFirst).toHaveBeenCalledTimes(1);
    });
});
