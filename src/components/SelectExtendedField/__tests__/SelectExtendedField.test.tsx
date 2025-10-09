import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SelectExtendedField, SelectExtendedFieldTarget, SelectExtendedFieldDropdown } from "../index";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

// Mock для KeyDownListener
vi.mock("../../KeyDownListener", () => ({
    KeyDownListener: ({
        children,
        onMatch,
        eventKeyCode,
    }: {
        children: React.ReactNode;
        onMatch: () => void;
        eventKeyCode: number;
    }) => {
        const handleKeyDown = React.useCallback(
            (event: KeyboardEvent) => {
                if (event.keyCode === eventKeyCode) {
                    onMatch();
                }
            },
            [eventKeyCode, onMatch],
        );

        React.useEffect(() => {
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }, [handleKeyDown]);

        return <div data-testid="keydown-listener">{children}</div>;
    },
}));

// Mock для Dropdown
vi.mock("../../Dropdown", () => ({
    Dropdown: ({
        children,
        opened,
        ...props
    }: {
        children: React.ReactNode;
        opened: boolean;
        [key: string]: unknown;
    }) => (
        <div data-testid="dropdown" data-opened={opened} {...props}>
            {opened && children}
        </div>
    ),
    DropdownList: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-list">{children}</div>,
}));

// Mock для FormField
vi.mock("../../FormField", () => ({
    FormField: ({
        children,
        onClick,
        onKeyDown,
        ...props
    }: {
        children: React.ReactNode;
        onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
        onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
        [key: string]: unknown;
    }) => (
        <div data-testid="form-field" onClick={onClick} onKeyDown={onKeyDown} {...props}>
            {children}
        </div>
    ),
    FormFieldLabel: ({ children, floating }: { children: React.ReactNode; floating: boolean }) => (
        <label data-testid="form-field-label" data-floating={floating}>
            {children}
        </label>
    ),
    FormFieldPostfix: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="form-field-postfix">{children}</div>
    ),
}));

// Mock для FormFieldTarget
vi.mock("../../FormField/components/FormFieldTarget", () => ({
    FormFieldTarget: React.forwardRef<HTMLDivElement, { children: React.ReactNode; [key: string]: unknown }>(
        ({ children, ...props }, ref) => (
            <div data-testid="form-field-target" ref={ref} {...props}>
                {children}
            </div>
        ),
    ),
}));

// Mock для Loader
vi.mock("../../Loader", () => ({
    LoaderSmall: ({ size, theme }: { size: string; theme: string }) => (
        <div data-testid="loader-small" data-size={size} data-theme={theme}>
            Loading...
        </div>
    ),
    ELoaderSmallSize: { LG: "lg" },
    ELoaderSmallTheme: { BRAND: "brand" },
}));

// Mock для иконки
vi.mock("@sberbusiness/icons-next/CaretdownStrokeSrvIcon24", () => ({
    default: ({ className }: { className?: string }) => (
        <div data-testid="caret-icon" className={className}>
            Caret Icon
        </div>
    ),
}));

describe("SelectExtendedField", () => {
    const mockRenderTarget = vi.fn();
    const mockRenderDropdown = vi.fn();
    const mockOnOpen = vi.fn();
    const mockOnClose = vi.fn();
    const mockOnKeyDown = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockRenderTarget.mockReturnValue(<div data-testid="target">Target</div>);
        mockRenderDropdown.mockReturnValue(<div data-testid="dropdown-content">Dropdown</div>);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("Should render with default props", () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        expect(screen.getByTestId("select-field")).toBeInTheDocument();
        expect(screen.getByTestId("keydown-listener")).toBeInTheDocument();
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

        const selectField = screen.getByTestId("select-field");
        expect(selectField).toHaveClass("custom-class");
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

        // Получаем функцию setOpened из первого вызова
        const setOpened = mockRenderTarget.mock.calls[0][0].setOpened;

        // Открываем dropdown
        setOpened(true);
        await waitFor(() => {
            expect(mockOnOpen).toHaveBeenCalledTimes(1);
        });

        // Закрываем dropdown
        setOpened(false);
        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });

    it("Should handle keyboard events", () => {
        render(
            <SelectExtendedField
                renderTarget={mockRenderTarget}
                onKeyDown={mockOnKeyDown}
                closeOnTab={true}
                data-testid="select-field"
            >
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        const selectField = screen.getByTestId("select-field");

        fireEvent.keyDown(selectField, { keyCode: EVENT_KEY_CODES.TAB });
        expect(mockOnKeyDown).toHaveBeenCalledWith(
            expect.objectContaining({
                keyCode: EVENT_KEY_CODES.TAB,
            }),
        );
    });

    it("Should close dropdown on Escape key", async () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        // Открываем dropdown
        const setOpened = mockRenderTarget.mock.calls[0][0].setOpened;
        setOpened(true);

        // Нажимаем Escape
        const escapeEvent = new KeyboardEvent("keydown", { keyCode: EVENT_KEY_CODES.ESCAPE });
        document.dispatchEvent(escapeEvent);

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenCalledWith({
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

        // Открываем dropdown
        const setOpened = mockRenderTarget.mock.calls[0][0].setOpened;
        setOpened(true);

        // Кликаем вне компонента
        const outsideElement = screen.getByTestId("outside-element");
        fireEvent.mouseDown(outsideElement);

        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenCalledWith({
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

        // Открываем dropdown
        const setOpened = mockRenderTarget.mock.calls[0][0].setOpened;
        setOpened(true);

        // Кликаем внутри компонента
        const selectField = screen.getByTestId("select-field");
        fireEvent.mouseDown(selectField);

        // Dropdown должен остаться открытым
        await waitFor(() => {
            expect(mockRenderTarget).toHaveBeenCalledWith({
                opened: true,
                setOpened: expect.any(Function),
            });
        });
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
});

describe("SelectExtendedFieldTarget", () => {
    const mockSetOpened = vi.fn();
    const mockOnClick = vi.fn();
    const mockOnKeyDown = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should render with required props", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        expect(screen.getByTestId("target")).toBeInTheDocument();
        expect(screen.getByTestId("form-field-label")).toHaveTextContent("Test Field");
        expect(screen.getByTestId("form-field-target")).toBeInTheDocument();
        expect(screen.getByTestId("form-field-postfix")).toBeInTheDocument();
        expect(screen.getByTestId("caret-icon")).toBeInTheDocument();
    });

    it("Should display label when provided", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                label="Selected Value"
                opened={false}
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        const target = screen.getByTestId("form-field-target");
        expect(target).toHaveTextContent("Selected Value");
        expect(target).toHaveClass("label");
    });

    it("Should display placeholder when no label", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                placeholder="Select option"
                opened={false}
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        const target = screen.getByTestId("form-field-target");
        expect(target).toHaveTextContent("Select option");
        expect(target).toHaveClass("placeholder");
    });

    it("Should apply opened state class", () => {
        const { rerender } = render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        let formField = screen.getByTestId("target");
        expect(formField).not.toHaveClass("selectOpened");

        rerender(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={true}
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        formField = screen.getByTestId("target");
        expect(formField).toHaveClass("selectOpened");
    });

    it("Should apply loading state", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                loading={true}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        expect(formField).toHaveClass("loading");
        expect(screen.getByTestId("loader-small")).toBeInTheDocument();
        expect(screen.queryByTestId("caret-icon")).not.toBeInTheDocument();
    });

    it("Should apply disabled state", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                disabled={true}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        expect(formField).toHaveClass("disabled");
        expect(formField).toHaveAttribute("tabindex", "-1");
    });

    it("Should handle click events", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                onClick={mockOnClick}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        fireEvent.click(formField);

        expect(mockSetOpened).toHaveBeenCalledWith(true);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("Should not respond to clicks when loading and disabled", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                loading={true}
                disabled={true}
                onClick={mockOnClick}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        fireEvent.click(formField);

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("Should handle keyboard events", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                onKeyDown={mockOnKeyDown}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");

        // Test Space key
        fireEvent.keyDown(formField, { keyCode: EVENT_KEY_CODES.SPACE });
        expect(mockSetOpened).toHaveBeenCalledWith(true);
        expect(mockOnKeyDown).toHaveBeenCalledTimes(1);

        // Test Enter key
        mockSetOpened.mockClear();
        fireEvent.keyDown(formField, { keyCode: EVENT_KEY_CODES.ENTER });
        expect(mockSetOpened).toHaveBeenCalledWith(true);

        // Test Arrow Down key
        mockSetOpened.mockClear();
        fireEvent.keyDown(formField, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });
        expect(mockSetOpened).toHaveBeenCalledWith(true);

        // Test Arrow Up key
        mockSetOpened.mockClear();
        fireEvent.keyDown(formField, { keyCode: EVENT_KEY_CODES.ARROW_UP });
        expect(mockSetOpened).toHaveBeenCalledWith(true);
    });

    it("Should not respond to keyboard events when loading and disabled", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                loading={true}
                disabled={true}
                onKeyDown={mockOnKeyDown}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        fireEvent.keyDown(formField, { keyCode: EVENT_KEY_CODES.SPACE });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).not.toHaveBeenCalled();
    });

    it("Should apply correct ARIA attributes", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={true}
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        expect(formField).toHaveAttribute("aria-expanded", "true");
        expect(formField).toHaveAttribute("aria-haspopup", "listbox");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                ref={ref}
                data-testid="target"
            />,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("Should apply custom className", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                className="custom-target-class"
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        expect(formField).toHaveClass("custom-target-class");
    });
});

describe("SelectExtendedFieldDropdown", () => {
    const mockTargetRef = React.createRef<HTMLDivElement>();
    const mockDropdownRef = React.createRef<HTMLDivElement>();
    const mockSetOpened = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should render with required props", () => {
        render(
            <SelectExtendedFieldDropdown
                forwardedRef={mockDropdownRef}
                targetRef={mockTargetRef}
                opened={false}
                setOpened={mockSetOpened}
            >
                <div data-testid="dropdown-content">Dropdown content</div>
            </SelectExtendedFieldDropdown>,
        );

        expect(screen.getByTestId("dropdown")).toBeInTheDocument();
        expect(screen.getByTestId("dropdown")).toHaveAttribute("data-opened", "false");
    });

    it("Should render children when opened", () => {
        render(
            <SelectExtendedFieldDropdown
                forwardedRef={mockDropdownRef}
                targetRef={mockTargetRef}
                opened={true}
                setOpened={mockSetOpened}
            >
                <div data-testid="dropdown-content">Dropdown content</div>
            </SelectExtendedFieldDropdown>,
        );

        expect(screen.getByTestId("dropdown")).toHaveAttribute("data-opened", "true");
        expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
    });

    it("Should not render children when closed", () => {
        render(
            <SelectExtendedFieldDropdown
                forwardedRef={mockDropdownRef}
                targetRef={mockTargetRef}
                opened={false}
                setOpened={mockSetOpened}
            >
                <div data-testid="dropdown-content">Dropdown content</div>
            </SelectExtendedFieldDropdown>,
        );

        expect(screen.getByTestId("dropdown")).toHaveAttribute("data-opened", "false");
        expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();
    });

    it("Should pass through additional props", () => {
        render(
            <SelectExtendedFieldDropdown
                forwardedRef={mockDropdownRef}
                targetRef={mockTargetRef}
                opened={false}
                setOpened={mockSetOpened}
                className="custom-dropdown-class"
                data-testid="custom-dropdown"
            >
                <div>Content</div>
            </SelectExtendedFieldDropdown>,
        );

        const dropdown = screen.getByTestId("custom-dropdown");
        expect(dropdown).toHaveClass("custom-dropdown-class");
    });

    it("Should have List static property", () => {
        expect(SelectExtendedFieldDropdown.List).toBeDefined();
    });
});
