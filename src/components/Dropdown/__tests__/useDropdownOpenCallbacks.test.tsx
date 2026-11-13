import React, { StrictMode } from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDropdownOpenCallbacks } from "../useDropdownOpenCallbacks";

interface IHookHostProps {
    opened: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

/**
 * Компонент, вызывающий useDropdownOpenCallbacks.
 * Обёртка вместо renderHook: в release-0 (React 17) запинен @testing-library/react 12,
 * где renderHook ещё не экспортируется.
 */
const HookHost: React.FC<IHookHostProps> = ({ opened, onOpen, onClose }) => {
    useDropdownOpenCallbacks(opened, onOpen, onClose);

    return null;
};

describe("useDropdownOpenCallbacks", () => {
    it.each([true, false])("does not call callbacks on the first render (opened = %s)", (opened) => {
        const onOpen = vi.fn();
        const onClose = vi.fn();

        render(<HookHost opened={opened} onOpen={onOpen} onClose={onClose} />);

        expect(onOpen).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
    });

    it("does not call callbacks on the StrictMode remount", () => {
        const onOpen = vi.fn();
        const onClose = vi.fn();

        render(
            <StrictMode>
                <HookHost opened={true} onOpen={onOpen} onClose={onClose} />
            </StrictMode>,
        );

        expect(onOpen).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
    });

    it("calls onOpen and onClose when opened changes", () => {
        const onOpen = vi.fn();
        const onClose = vi.fn();
        const { rerender } = render(<HookHost opened={false} onOpen={onOpen} onClose={onClose} />);

        rerender(<HookHost opened={true} onOpen={onOpen} onClose={onClose} />);

        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).not.toHaveBeenCalled();

        rerender(<HookHost opened={false} onOpen={onOpen} onClose={onClose} />);

        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls the latest callbacks", () => {
        const staleOnClose = vi.fn();
        const latestOnClose = vi.fn();
        const { rerender } = render(<HookHost opened={true} onClose={staleOnClose} />);

        rerender(<HookHost opened={true} onClose={latestOnClose} />);
        rerender(<HookHost opened={false} onClose={latestOnClose} />);

        expect(staleOnClose).not.toHaveBeenCalled();
        expect(latestOnClose).toHaveBeenCalledTimes(1);
    });
});
