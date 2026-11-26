import React, { createRef, useLayoutEffect } from "react";
import { render } from "@testing-library/react";
import { useMergedElementRef } from "../useMergedElementRef";

describe("useMergedElementRef", () => {
    it("keeps the ref stable until the forwarded ref changes, then cleans up the old attachment", () => {
        const element = document.createElement("div");
        const localRef = createRef<HTMLDivElement>();
        const cleanup = vi.fn();
        const callback = vi.fn(() => cleanup);
        const refs = vi.fn<(ref: ReturnType<typeof useMergedElementRef<HTMLDivElement>>) => void>();

        function Probe({ forwarded }: { forwarded: React.RefCallback<HTMLDivElement> }) {
            const merged = useMergedElementRef(localRef, forwarded);
            useLayoutEffect(() => {
                refs(merged);
            });
            return null;
        }

        const { rerender } = render(<Probe forwarded={callback} />);
        const firstRef = refs.mock.calls[0][0];
        const detach = firstRef(element);
        rerender(<Probe forwarded={callback} />);
        expect(refs.mock.calls[1][0]).toBe(firstRef);
        expect(localRef.current).toBe(element);
        expect(cleanup).not.toHaveBeenCalled();

        const nextCallback = vi.fn();
        rerender(<Probe forwarded={nextCallback} />);
        const nextRef = refs.mock.calls[2][0];
        expect(nextRef).not.toBe(firstRef);
        detach?.();
        expect(cleanup).toHaveBeenCalledTimes(1);
        expect(localRef.current).toBeNull();

        nextRef(element);
        nextRef(null);
        expect(nextCallback.mock.calls).toEqual([[element], [null]]);
    });
});
