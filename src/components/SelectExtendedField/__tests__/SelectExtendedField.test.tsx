import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SelectExtendedField, SelectExtendedFieldTarget, SelectExtendedFieldDropdown } from "../index";
import { SelectExtendedFieldDropdownDefault } from "../components/SelectExtendedFieldDropdownDefault";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { EFormFieldStatus } from "../../FormField/enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EDropdownWidth } from "../../Dropdown/desktop/enums";

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
    Dropdown: React.forwardRef<
        HTMLDivElement,
        {
            children: React.ReactNode;
            opened: boolean;
            mobileViewProps?: { children?: React.ReactNode };
            setOpened?: (opened: boolean) => void;
            targetRef?: React.RefObject<HTMLElement>;
            [key: string]: unknown;
        }
    >(({ children, opened, mobileViewProps, setOpened, targetRef, ...props }, ref) => (
        <div data-testid="dropdown" data-opened={String(opened)} ref={ref} {...props}>
            {opened && children}
            {opened && mobileViewProps?.children}
        </div>
    )),
    DropdownList: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-list">{children}</div>,
    DropdownMobileHeader: ({
        controlButtons,
        children,
    }: {
        controlButtons?: React.ReactNode;
        children: React.ReactNode;
    }) => (
        <div data-testid="dropdown-mobile-header">
            {controlButtons}
            {children}
        </div>
    ),
    DropdownMobileClose: ({ onClick }: { onClick: () => void }) => (
        <button data-testid="dropdown-mobile-close" onClick={onClick} />
    ),
    DropdownMobileBody: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dropdown-mobile-body">{children}</div>
    ),
    DropdownMobileList: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dropdown-mobile-list">{children}</div>
    ),
    DropdownMobileListItem: ({
        id,
        selected,
        className,
        onSelect,
        children,
    }: {
        id: string;
        selected?: boolean;
        className?: string;
        onSelect?: () => void;
        children: React.ReactNode;
    }) => (
        <div
            data-testid={`dropdown-mobile-list-item-${id}`}
            data-selected={String(selected)}
            className={className}
            onClick={() => onSelect?.()}
        >
            {children}
        </div>
    ),
}));

// Mock для DropdownList (desktop), чтобы удобно проверять элементы
vi.mock("../../Dropdown/desktop/DropdownList", () => {
    const DropdownListItem = ({
        id,
        selected,
        className,
        onSelect,
        children,
    }: {
        id: string;
        selected?: boolean;
        className?: string;
        onSelect?: () => void;
        children: React.ReactNode;
    }) => (
        <div
            data-testid={`dropdown-list-item-${id}`}
            data-selected={String(selected)}
            className={className}
            onClick={() => onSelect?.()}
        >
            {children}
        </div>
    );

    const DropdownList = ({
        children,
        id,
        dropdownOpened,
        size,
    }: {
        children: React.ReactNode;
        id?: string;
        dropdownOpened?: boolean;
        size?: EComponentSize;
    }) => (
        <div
            data-testid="dropdown-list-desktop"
            data-id={id}
            data-dropdown-opened={String(dropdownOpened)}
            data-size={size}
        >
            {children}
        </div>
    );

    (DropdownList as typeof DropdownList & { Item: typeof DropdownListItem }).Item = DropdownListItem;

    return { DropdownList };
});

// Mock для FormField
vi.mock("../../FormField", () => ({
    FormField: ({
        children,
        onClick,
        onKeyDown,
        active,
        ...props
    }: {
        children: React.ReactNode;
        onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
        onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
        active?: boolean;
        [key: string]: unknown;
    }) => (
        <div data-testid="form-field" data-active={String(active)} onClick={onClick} onKeyDown={onKeyDown} {...props}>
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
    FormFieldPrefix: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="form-field-prefix">{children}</div>
    ),
    FormFieldClear: ({ onClick }: { onClick: () => void }) => (
        <button data-testid="form-field-clear" onClick={onClick} />
    ),
    EFormFieldStatus: { DEFAULT: "default", DISABLED: "disabled", ERROR: "error", WARNING: "warning" },
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
vi.mock("@sberbusiness/icons-next", () => ({
    CaretdownStrokeSrvIcon16: ({ className }: { className?: string }) => (
        <div data-testid="caret-icon-16" className={className}>
            Caret Icon 16
        </div>
    ),
    CaretdownStrokeSrvIcon20: ({ className }: { className?: string }) => (
        <div data-testid="caret-icon-20" className={className}>
            Caret Icon 20
        </div>
    ),
    CaretdownStrokeSrvIcon24: ({ className }: { className?: string }) => (
        <div data-testid="caret-icon-24" className={className}>
            Caret Icon 24
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

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} ref={ref} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
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
        act(() => setOpened(true));
        await waitFor(() => {
            expect(mockOnOpen).toHaveBeenCalledTimes(1);
        });

        // Закрываем dropdown
        act(() => setOpened(false));
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

    it("Should close opened dropdown on Tab key when closeOnTab is set", async () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} closeOnTab={true} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        const setOpened = mockRenderTarget.mock.calls[0][0].setOpened;
        act(() => setOpened(true));

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

    it("Should not close opened dropdown on Tab key without closeOnTab", async () => {
        render(
            <SelectExtendedField renderTarget={mockRenderTarget} data-testid="select-field">
                {mockRenderDropdown}
            </SelectExtendedField>,
        );

        const setOpened = mockRenderTarget.mock.calls[0][0].setOpened;
        act(() => setOpened(true));

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

        // Открываем dropdown
        const setOpened = mockRenderTarget.mock.calls[0][0].setOpened;
        act(() => setOpened(true));

        // Нажимаем Escape
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

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
        act(() => setOpened(true));

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
        act(() => setOpened(true));

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
        expect(screen.getByTestId("caret-icon-20")).toBeInTheDocument();
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
                status={EFormFieldStatus.DISABLED}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        expect(formField).toHaveClass("disabled");
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

    it("Should not respond to clicks when loading", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                loading={true}
                onClick={mockOnClick}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        fireEvent.click(formField);

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("Should not respond to clicks when disabled", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                status={EFormFieldStatus.DISABLED}
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

    it("Should not respond to keyboard events when loading", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                loading={true}
                onKeyDown={mockOnKeyDown}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        fireEvent.keyDown(formField, { keyCode: EVENT_KEY_CODES.SPACE });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).not.toHaveBeenCalled();
    });

    it("Should not respond to keyboard events when disabled", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                status={EFormFieldStatus.DISABLED}
                onKeyDown={mockOnKeyDown}
                data-testid="target"
            />,
        );

        const formField = screen.getByTestId("target");
        fireEvent.keyDown(formField, { keyCode: EVENT_KEY_CODES.SPACE });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).not.toHaveBeenCalled();
    });

    it("Should not open dropdown on unrelated key", () => {
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
        fireEvent.keyDown(formField, { keyCode: 65 });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
    });

    it("Should apply correct ARIA attributes", () => {
        const { rerender } = render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={true}
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        let formField = screen.getByTestId("target");
        expect(formField).toHaveAttribute("aria-expanded", "true");
        expect(formField).toHaveAttribute("aria-haspopup", "listbox");

        rerender(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        formField = screen.getByTestId("target");
        expect(formField).toHaveAttribute("aria-expanded", "false");
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

    it("Should apply placeholder class when placeholder is set without label", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                placeholder="Выберите значение"
                opened={false}
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        const target = screen.getByTestId("form-field-target");
        expect(target).toHaveClass("placeholder");
        expect(target).not.toHaveClass("label");
    });

    it("Should render caret icon according to size", () => {
        const { rerender } = render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                size={EComponentSize.SM}
                data-testid="target"
            />,
        );

        expect(screen.getByTestId("caret-icon-16")).toBeInTheDocument();

        rerender(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                size={EComponentSize.MD}
                data-testid="target"
            />,
        );

        expect(screen.getByTestId("caret-icon-20")).toBeInTheDocument();

        rerender(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                size={EComponentSize.LG}
                data-testid="target"
            />,
        );

        expect(screen.getByTestId("caret-icon-24")).toBeInTheDocument();
    });

    it("Should render clear button and call onClear", () => {
        const mockOnClear = vi.fn();
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                onClear={mockOnClear}
                data-testid="target"
            />,
        );

        fireEvent.click(screen.getByTestId("form-field-clear"));

        expect(mockOnClear).toHaveBeenCalledTimes(1);
    });

    it("Should render prefix and postfix", () => {
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Test Field"
                opened={false}
                setOpened={mockSetOpened}
                prefix={<span data-testid="custom-prefix" />}
                postfix={<span data-testid="custom-postfix" />}
                data-testid="target"
            />,
        );

        expect(screen.getByTestId("form-field-prefix")).toBeInTheDocument();
        expect(screen.getByTestId("custom-prefix")).toBeInTheDocument();
        expect(screen.getByTestId("custom-postfix")).toBeInTheDocument();
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

describe("SelectExtendedFieldDropdownDefault", () => {
    const mockOptions = [
        { id: "1", value: "option1", label: "Первая опция" },
        { id: "2", value: "option2", label: "Вторая опция" },
        { id: "3", value: "option3", label: "Третья опция" },
    ];

    const mockTargetRef = React.createRef<HTMLDivElement>();
    const mockDropdownRef = React.createRef<HTMLDivElement>();

    const mockOnChange = vi.fn();
    const mockSetOpened = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should render desktop and mobile options when opened and not loading", () => {
        render(
            <SelectExtendedFieldDropdownDefault
                options={mockOptions}
                onChange={mockOnChange}
                value={mockOptions[1]}
                opened={true}
                setOpened={mockSetOpened}
                listId="list-1"
                size={EComponentSize.MD}
                width={EDropdownWidth.TARGET}
                loading={false}
                mobileTitle="Mobile title"
                dropdownListItemClassName="custom-item-class"
                targetRef={mockTargetRef}
                dropdownRef={mockDropdownRef}
            />,
        );

        expect(screen.getByTestId("dropdown")).toHaveAttribute("data-opened", "true");

        // Desktop list items
        expect(screen.getByTestId("dropdown-list-item-1")).toHaveTextContent("Первая опция");
        expect(screen.getByTestId("dropdown-list-item-2")).toHaveAttribute("data-selected", "true");
        expect(screen.getByTestId("dropdown-list-item-2")).toHaveClass("custom-item-class");

        // Mobile list items
        expect(screen.getByTestId("dropdown-mobile-list-item-1")).toHaveTextContent("Первая опция");
        expect(screen.getByTestId("dropdown-mobile-list-item-2")).toHaveAttribute("data-selected", "true");
        expect(screen.getByTestId("dropdown-mobile-list-item-2")).toHaveClass("custom-item-class");

        // Mobile title
        expect(screen.getByText("Mobile title")).toBeInTheDocument();
    });

    it("Should hide options when loading is true", () => {
        render(
            <SelectExtendedFieldDropdownDefault
                options={mockOptions}
                onChange={mockOnChange}
                value={mockOptions[1]}
                opened={true}
                setOpened={mockSetOpened}
                listId="list-1"
                size={EComponentSize.MD}
                width={EDropdownWidth.TARGET}
                loading={true}
                mobileTitle="Mobile title"
                dropdownListItemClassName="custom-item-class"
                targetRef={mockTargetRef}
                dropdownRef={mockDropdownRef}
            />,
        );

        expect(screen.getByTestId("dropdown")).toHaveAttribute("data-opened", "false");
        expect(screen.queryByTestId("dropdown-list-item-1")).not.toBeInTheDocument();
        expect(screen.queryByTestId("dropdown-mobile-list-item-1")).not.toBeInTheDocument();
        expect(screen.queryByText("Mobile title")).not.toBeInTheDocument();
    });

    it("Should call onChange and close when desktop item selected", () => {
        render(
            <SelectExtendedFieldDropdownDefault
                options={mockOptions}
                onChange={mockOnChange}
                opened={true}
                setOpened={mockSetOpened}
                listId="list-1"
                size={EComponentSize.MD}
                width={EDropdownWidth.TARGET}
                loading={false}
                targetRef={mockTargetRef}
                dropdownRef={mockDropdownRef}
            />,
        );

        fireEvent.click(screen.getByTestId("dropdown-list-item-2"));

        expect(mockOnChange).toHaveBeenCalledWith(mockOptions[1]);
        expect(mockSetOpened).toHaveBeenCalledWith(false);
    });

    it("Should call onChange and close when mobile item selected", () => {
        render(
            <SelectExtendedFieldDropdownDefault
                options={mockOptions}
                onChange={mockOnChange}
                opened={true}
                setOpened={mockSetOpened}
                listId="list-1"
                size={EComponentSize.MD}
                width={EDropdownWidth.TARGET}
                loading={false}
                mobileTitle="Mobile title"
                targetRef={mockTargetRef}
                dropdownRef={mockDropdownRef}
            />,
        );

        fireEvent.click(screen.getByTestId("dropdown-mobile-list-item-2"));

        expect(mockOnChange).toHaveBeenCalledWith(mockOptions[1]);
        expect(mockSetOpened).toHaveBeenCalledWith(false);
    });

    it("Should close on mobile close button click", () => {
        render(
            <SelectExtendedFieldDropdownDefault
                options={mockOptions}
                onChange={mockOnChange}
                opened={true}
                setOpened={mockSetOpened}
                listId="list-1"
                size={EComponentSize.MD}
                width={EDropdownWidth.TARGET}
                loading={false}
                mobileTitle="Mobile title"
                targetRef={mockTargetRef}
                dropdownRef={mockDropdownRef}
            />,
        );

        fireEvent.click(screen.getByTestId("dropdown-mobile-close"));

        expect(mockSetOpened).toHaveBeenCalledWith(false);
        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("Should pass dropdownProps to Dropdown", () => {
        const dropdownProps = {
            className: "custom-dropdown-class",
            "data-custom": "dropdown-value",
        };

        render(
            <SelectExtendedFieldDropdownDefault
                options={mockOptions}
                onChange={mockOnChange}
                opened={true}
                setOpened={mockSetOpened}
                listId="list-1"
                size={EComponentSize.MD}
                width={EDropdownWidth.TARGET}
                loading={false}
                dropdownProps={dropdownProps}
                targetRef={mockTargetRef}
                dropdownRef={mockDropdownRef}
            />,
        );

        const dropdown = screen.getByTestId("dropdown");
        expect(dropdown).toHaveAttribute("data-custom", "dropdown-value");
        expect(dropdown).toHaveClass("custom-dropdown-class");
    });
});
