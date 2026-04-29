import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ListMasterHeader } from "../components/ListMasterHeader";

// jsdom не реализует window.scrollTo и валит ошибку при cleanup'е useEffect.
// Подменяем глобально на vi.fn() — без mockRestore, чтобы не словить откат
// до того, как Testing Library закончит unmount после теста.
const scrollToMock = vi.fn();
Object.defineProperty(window, "scrollTo", { value: scrollToMock, writable: true, configurable: true });

describe("ListMasterHeader", () => {
    beforeEach(() => {
        scrollToMock.mockClear();
        Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
    });

    it("renders children inside a div", () => {
        render(<ListMasterHeader data-testid="root">Header content</ListMasterHeader>);
        const root = screen.getByTestId("root");
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveTextContent("Header content");
    });

    it("applies sticky class by default", () => {
        render(<ListMasterHeader data-testid="root" />);
        expect(screen.getByTestId("root")).toHaveClass("sticky");
    });

    it("does not apply sticky class when sticky=false", () => {
        render(<ListMasterHeader data-testid="root" sticky={false} />);
        expect(screen.getByTestId("root")).not.toHaveClass("sticky");
    });

    it("merges custom className on the root", () => {
        render(<ListMasterHeader className="custom" data-testid="root" />);
        expect(screen.getByTestId("root")).toHaveClass("custom");
    });

    it("forwards ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ListMasterHeader ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("compensates own height via window.scrollTo on mount and rolls back on unmount", () => {
        const HEIGHT = 60;
        // jsdom returns 0 from getBoundingClientRect — стабим значение
        const getBoundingClientRectSpy = vi
            .spyOn(HTMLElement.prototype, "getBoundingClientRect")
            .mockReturnValue({ height: HEIGHT } as DOMRect);

        const { unmount } = render(<ListMasterHeader />);

        expect(scrollToMock).toHaveBeenCalledWith({ top: HEIGHT });

        // эмулируем что страницу прокрутили вниз во время жизни компонента
        Object.defineProperty(window, "scrollY", { value: HEIGHT + 100, writable: true, configurable: true });

        unmount();

        // последний вызов — откат скролла на величину высоты хедера
        expect(scrollToMock).toHaveBeenLastCalledWith({ top: 100 });

        getBoundingClientRectSpy.mockRestore();
    });

    it("clamps rollback at 0 when scrollY is less than header height", () => {
        const HEIGHT = 60;
        const getBoundingClientRectSpy = vi
            .spyOn(HTMLElement.prototype, "getBoundingClientRect")
            .mockReturnValue({ height: HEIGHT } as DOMRect);

        const { unmount } = render(<ListMasterHeader />);

        Object.defineProperty(window, "scrollY", { value: 10, writable: true, configurable: true });

        unmount();

        expect(scrollToMock).toHaveBeenLastCalledWith({ top: 0 });

        getBoundingClientRectSpy.mockRestore();
    });
});
