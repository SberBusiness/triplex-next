import React from "react";
import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Dropdown } from "../Dropdown";

/** Подменяет matchMedia, чтобы MobileView отрендерил десктопную ветку. */
const setDesktopView = () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
        (query: string) =>
            ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: () => {},
                removeEventListener: () => {},
                addListener: () => {},
                removeListener: () => {},
                dispatchEvent: () => false,
            }) as unknown as MediaQueryList,
    );
};

interface IDropdownWithTargetProps extends Partial<React.ComponentProps<typeof Dropdown>> {}

const DropdownWithTarget = ({ children, ...props }: IDropdownWithTargetProps) => {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <div ref={targetRef} data-testid="target" />
            <Dropdown opened setOpened={() => {}} targetRef={targetRef} {...props}>
                {children ?? <span>Dropdown content</span>}
            </Dropdown>
        </>
    );
};

describe("Dropdown — StrictMode", () => {
    beforeEach(() => {
        setDesktopView();
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    // React 18 StrictMode (dev) монтирует эффекты дважды: create → destroy → create.
    // Эффект onOpen/onClose должен сравнивать предыдущее значение opened, а не флаг
    // "уже смонтирован" — иначе на втором прогоне колбэк вызывается на пустом месте.
    it("не вызывает onClose на маунте закрытого dropdown", () => {
        const onOpen = vi.fn();
        const onClose = vi.fn();

        render(
            <React.StrictMode>
                <DropdownWithTarget opened={false} onOpen={onOpen} onClose={onClose} />
            </React.StrictMode>,
        );

        expect(onClose).not.toHaveBeenCalled();
        expect(onOpen).not.toHaveBeenCalled();
    });

    it("не вызывает onOpen на маунте открытого dropdown", () => {
        const onOpen = vi.fn();
        const onClose = vi.fn();

        render(
            <React.StrictMode>
                <DropdownWithTarget onOpen={onOpen} onClose={onClose} />
            </React.StrictMode>,
        );

        expect(onOpen).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
    });

    it("вызывает колбэк ровно один раз на смену opened", () => {
        const onOpen = vi.fn();
        const onClose = vi.fn();

        const { rerender } = render(
            <React.StrictMode>
                <DropdownWithTarget opened={false} onOpen={onOpen} onClose={onClose} />
            </React.StrictMode>,
        );

        rerender(
            <React.StrictMode>
                <DropdownWithTarget opened onOpen={onOpen} onClose={onClose} />
            </React.StrictMode>,
        );

        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).not.toHaveBeenCalled();
    });
});
