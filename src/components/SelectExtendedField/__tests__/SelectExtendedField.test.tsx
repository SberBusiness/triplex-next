import React from "react";
import { createPortal } from "react-dom";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SelectExtendedField, SelectExtendedFieldTarget, SelectExtendedFieldDropdown } from "../index";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

describe("SelectExtendedField", () => {
    const mockRenderTarget = vi.fn();
    const mockRenderDropdown = vi.fn();
    const mockOnOpen = vi.fn();
    const mockOnClose = vi.fn();
    const mockOnKeyDown = vi.fn();

    /** Возвращает setOpened из последнего вызова renderTarget. */
    const getSetOpened = (): ((opened: boolean) => void) =>
        mockRenderTarget.mock.calls[mockRenderTarget.mock.calls.length - 1][0].setOpened;

    beforeEach(() => {
        vi.clearAllMocks();
        mockRenderTarget.mockReturnValue(<div data-testid="target">Target</div>);
        mockRenderDropdown.mockReturnValue(<div data-testid="dropdown-content">Dropdown</div>);
    });

    it("Should render with default props", () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        expect(screen.getByTestId("select-field")).toBeInTheDocument();
        expect(screen.getByTestId("target")).toBeInTheDocument();
        expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
        expect(mockRenderTarget).toHaveBeenCalledWith({
            opened: false,
            setOpened: expect.any(Function),
        });
        expect(mockRenderDropdown).toHaveBeenCalledWith({
            opened: false,
            setOpened: expect.any(Function),
            targetRef: expect.any(Object),
            dropdownRef: expect.any(Object),
        });
    });

    it("Should apply custom className", () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} className="custom-class" data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        expect(screen.getByTestId("select-field")).toHaveClass("selectExtendedField", "custom-class");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} ref={ref} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        expect(ref.current).toBe(screen.getByTestId("select-field"));
    });

    it("Should provide targetRef pointing at the root element", () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        const { targetRef } = mockRenderDropdown.mock.calls[0][0];

        expect(targetRef.current).toBe(screen.getByTestId("select-field"));
    });

    it("Should not call onOpen/onClose on mount", () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} onOpen={mockOnOpen} onClose={mockOnClose}>
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        expect(mockOnOpen).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("Should not call onOpen/onClose on remount in StrictMode", () => {
        render(
            <React.StrictMode>
                <SelectExtendedField renderTarget={mockRenderTarget} onOpen={mockOnOpen} onClose={mockOnClose}>
                    {mockRenderDropdown}
                </SelectExtendedField>
            </React.StrictMode>,
        );

        expect(mockOnOpen).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("Should handle open/close callbacks", async () => {
        render(
            <SelectExtendedField
                renderTarget={mockRenderTarget}
                onOpen={mockOnOpen}
                onClose={mockOnClose}
                data-testid="select-field"
            >
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        act(() => getSetOpened()(true));
        await waitFor(() => {
            expect(mockOnOpen).toHaveBeenCalledTimes(1);
        });
        expect(mockOnClose).not.toHaveBeenCalled();

        act(() => getSetOpened()(false));
        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
        expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    it("Should call the latest onOpen even if its identity changed after mount", async () => {
        const firstOnOpen = vi.fn();
        const secondOnOpen = vi.fn();

        const { rerender } = render(
            <SelectExtendedField renderTarget={mockRenderTarget} onOpen={firstOnOpen}>
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        rerender(
            <SelectExtendedField renderTarget={mockRenderTarget} onOpen={secondOnOpen}>
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        act(() => getSetOpened()(true));

        await waitFor(() => {
            expect(secondOnOpen).toHaveBeenCalledTimes(1);
        });
        expect(firstOnOpen).not.toHaveBeenCalled();
    });

    it("Should not call onOpen/onClose when the callback identity changes", async () => {
        const { rerender } = render(
            <SelectExtendedField renderTarget={mockRenderTarget} onOpen={mockOnOpen} onClose={() => {}}>
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        act(() => getSetOpened()(true));
        await waitFor(() => {
            expect(mockOnOpen).toHaveBeenCalledTimes(1);
        });

        rerender(
            <SelectExtendedField renderTarget={mockRenderTarget} onOpen={mockOnOpen} onClose={() => {}}>
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    it("Should call onKeyDown passed from outside", () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} onKeyDown={mockOnKeyDown} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        fireEvent.keyDown(screen.getByTestId("select-field"), { keyCode: EVENT_KEY_CODES.TAB });

        expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
        expect(mockOnKeyDown).toHaveBeenCalledWith(
            expect.objectContaining({
                keyCode: EVENT_KEY_CODES.TAB,
            }),
        );
    });

    it("Should close opened dropdown on Tab key when closeOnTab is set", async () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} closeOnTab data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        act(() => getSetOpened()(true));

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenLastCalledWith({
                opened: true,
                setOpened: expect.any(Function),
            });
        });

        fireEvent.keyDown(screen.getByTestId("select-field"), { keyCode: EVENT_KEY_CODES.TAB });

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenLastCalledWith({
                opened: false,
                setOpened: expect.any(Function),
            });
        });
    });

    it("Should close opened dropdown on Tab key reported through event.code", async () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} closeOnTab data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        act(() => getSetOpened()(true));

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenLastCalledWith({
                opened: true,
                setOpened: expect.any(Function),
            });
        });

        fireEvent.keyDown(screen.getByTestId("select-field"), { code: "Tab" });

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenLastCalledWith({
                opened: false,
                setOpened: expect.any(Function),
            });
        });
    });

    it("Should not close opened dropdown on Tab key without closeOnTab", async () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        act(() => getSetOpened()(true));

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenLastCalledWith({
                opened: true,
                setOpened: expect.any(Function),
            });
        });

        fireEvent.keyDown(screen.getByTestId("select-field"), { keyCode: EVENT_KEY_CODES.TAB });

        expect(mockRenderTarget).toHaveBeenLastCalledWith({
            opened: true,
            setOpened: expect.any(Function),
        });
    });

    it("Should close dropdown on Escape key", async () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        act(() => getSetOpened()(true));

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenLastCalledWith({
                opened: false,
                setOpened: expect.any(Function),
            });
        });
    });

    it("Should close dropdown on outside click", async () => {
        render(
            <div>
                <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                    {mockRenderDropdown}
                </SelectExtendedField>
                <div data-testid="outside-element">Outside</div>
            </div>,
        );

        act(() => getSetOpened()(true));

        fireEvent.mouseDown(screen.getByTestId("outside-element"));

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenLastCalledWith({
                opened: false,
                setOpened: expect.any(Function),
            });
        });
    });

    it("Should not close dropdown on inside click", async () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        act(() => getSetOpened()(true));

        fireEvent.mouseDown(screen.getByTestId("select-field"));

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenLastCalledWith({
                opened: true,
                setOpened: expect.any(Function),
            });
        });
    });

    it("Should not close dropdown on click inside the dropdown rendered outside the root", async () => {
        // Выпадающий блок рендерится через Portal, поэтому проверка попадания клика
        // внутрь него опирается на dropdownRef, а не на DOM-вложенность в корень.
        mockRenderDropdown.mockImplementation(({ dropdownRef }) =>
            createPortal(
                <div ref={dropdownRef} data-testid="portal-dropdown">
                    Dropdown
                </div>,
                document.body,
            ),
        );

        render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        act(() => getSetOpened()(true));

        fireEvent.mouseDown(screen.getByTestId("portal-dropdown"));

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenLastCalledWith({
                opened: true,
                setOpened: expect.any(Function),
            });
        });
    });

    it("Should not listen to document mousedown while closed", () => {
        const addEventListenerSpy = vi.spyOn(document, "addEventListener");

        render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        expect(addEventListenerSpy.mock.calls.filter(([type]) => type === "mousedown")).toHaveLength(0);

        addEventListenerSpy.mockRestore();
    });

    it("Should remove the document mousedown listener on unmount", () => {
        const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

        const { unmount } = render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        act(() => getSetOpened()(true));
        unmount();

        expect(removeEventListenerSpy.mock.calls.filter(([type]) => type === "mousedown").length).toBeGreaterThan(0);

        removeEventListenerSpy.mockRestore();
    });

    it("Should pass through HTML attributes", () => {
        render(
            <SelectExtendedField
                renderTarget={mockRenderTarget}
                data-testid="select-field"
                aria-label="Test select"
                role="combobox"
            >
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        const selectField = screen.getByTestId("select-field");

        expect(selectField).toHaveAttribute("aria-label", "Test select");
        expect(selectField).toHaveAttribute("role", "combobox");
    });

    it("Should expose Target and Dropdown static properties", () => {
        expect(SelectExtendedField.Target).toBe(SelectExtendedFieldTarget);
        expect(SelectExtendedField.Dropdown).toBe(SelectExtendedFieldDropdown);
    });
});
