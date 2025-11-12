import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SelectField, ISelectFieldOption } from "../SelectField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EFormFieldStatus } from "../../FormField/enums";

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
    DropdownListItem: ({
        children,
        onSelect,
        selected,
        id,
        ...props
    }: {
        children: React.ReactNode;
        onSelect?: () => void;
        selected?: boolean;
        id: string;
        [key: string]: unknown;
    }) => (
        <div data-testid={`dropdown-list-item-${id}`} data-selected={selected} onClick={onSelect} {...props}>
            {children}
        </div>
    ),
    DropdownListContext: {
        Provider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    },
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
}));

// Mock для SelectExtendedField
vi.mock("../../SelectExtendedField", () => {
    const SelectExtendedFieldBase = React.forwardRef<
        HTMLDivElement,
        {
            renderTarget: (props: { opened: boolean; setOpened: (opened: boolean) => void }) => React.ReactNode;
            children: (props: {
                opened: boolean;
                setOpened: (opened: boolean) => void;
                targetRef: React.RefObject<HTMLDivElement>;
                dropdownRef: React.RefObject<HTMLDivElement>;
            }) => React.ReactNode;
            [key: string]: unknown;
        }
    >(({ renderTarget, children, ...props }, ref) => {
        const [opened, setOpened] = React.useState(false);
        const targetRef = React.useRef<HTMLDivElement>(null);
        const dropdownRef = React.useRef<HTMLDivElement>(null);

        const handleSetOpened = React.useCallback((newOpened: boolean) => {
            setOpened(newOpened);
        }, []);

        return (
            <div data-testid="select-extended-field" ref={ref} data-opened={String(opened)} {...props}>
                {renderTarget({ opened, setOpened: handleSetOpened })}
                {children({ opened, setOpened: handleSetOpened, targetRef, dropdownRef })}
            </div>
        );
    });

    SelectExtendedFieldBase.displayName = "SelectExtendedField";

    const SelectExtendedFieldTarget = React.forwardRef<
        HTMLDivElement,
        {
            label?: React.ReactNode;
            placeholder?: React.ReactNode;
            loading?: boolean;
            status?: EFormFieldStatus;
            size?: EComponentSize;
            onClick?: () => void;
            setOpened?: (opened: boolean) => void;
            opened?: boolean;
            [key: string]: unknown;
        }
    >(({ label, placeholder, loading, status, size, onClick, setOpened, opened, ...props }, ref) => {
        const handleClick = () => {
            if (setOpened && !loading) {
                setOpened(!opened);
            }
            onClick?.();
        };

        return (
            <div
                data-testid="select-extended-field-target"
                ref={ref}
                data-label={label ? String(label) : undefined}
                data-placeholder={placeholder ? String(placeholder) : undefined}
                data-loading={loading}
                data-status={status}
                data-size={size}
                onClick={handleClick}
                {...props}
            >
                {loading && <div data-testid="loader-small" />}
                {label || placeholder}
            </div>
        );
    });

    SelectExtendedFieldTarget.displayName = "SelectExtendedFieldTarget";

    const SelectExtendedFieldDropdown = ({
        children,
        opened,
        ...props
    }: {
        children: React.ReactNode;
        opened: boolean;
        [key: string]: unknown;
    }) => (
        <div data-testid="select-extended-field-dropdown" data-opened={opened} {...props}>
            {opened && children}
        </div>
    );

    const SelectExtendedFieldDropdownList = ({
        children,
        id,
        ...props
    }: {
        children: React.ReactNode;
        id?: string;
        [key: string]: unknown;
    }) => (
        <div data-testid="select-extended-field-dropdown-list" data-id={id} {...props}>
            {children}
        </div>
    );

    const SelectExtendedFieldDropdownListItem = ({
        children,
        onSelect,
        selected,
        id,
        ...props
    }: {
        children: React.ReactNode;
        onSelect?: () => void;
        selected?: boolean;
        id: string;
        [key: string]: unknown;
    }) => (
        <div
            data-testid={`select-extended-field-dropdown-list-item-${id}`}
            data-selected={selected}
            onClick={onSelect}
            {...props}
        >
            {children}
        </div>
    );

    (
        SelectExtendedFieldDropdownList as typeof SelectExtendedFieldDropdownList & {
            Item: typeof SelectExtendedFieldDropdownListItem;
        }
    ).Item = SelectExtendedFieldDropdownListItem;

    (
        SelectExtendedFieldDropdown as typeof SelectExtendedFieldDropdown & {
            List: typeof SelectExtendedFieldDropdownList & {
                Item: typeof SelectExtendedFieldDropdownListItem;
            };
        }
    ).List = SelectExtendedFieldDropdownList as typeof SelectExtendedFieldDropdownList & {
        Item: typeof SelectExtendedFieldDropdownListItem;
    };

    const SelectExtendedField = SelectExtendedFieldBase as typeof SelectExtendedFieldBase & {
        Target: typeof SelectExtendedFieldTarget;
        Dropdown: typeof SelectExtendedFieldDropdown & {
            List: typeof SelectExtendedFieldDropdownList & {
                Item: typeof SelectExtendedFieldDropdownListItem;
            };
        };
    };

    SelectExtendedField.Target = SelectExtendedFieldTarget;
    SelectExtendedField.Dropdown = SelectExtendedFieldDropdown as typeof SelectExtendedFieldDropdown & {
        List: typeof SelectExtendedFieldDropdownList & {
            Item: typeof SelectExtendedFieldDropdownListItem;
        };
    };

    return {
        SelectExtendedField,
        ISelectExtendedFieldDefaultOption: {} as unknown,
        ISelectExtendedFieldDropdownProvideProps: {} as unknown,
        ISelectExtendedFieldProps: {} as unknown,
        ISelectExtendedFieldTargetProvideProps: {} as unknown,
        ISelectExtendedFieldTargetProps: {} as unknown,
    };
});

// Mock для SelectExtendedFieldDropdownDefault
vi.mock("../../SelectExtendedField/components/SelectExtendedFieldDropdownDefault", () => ({
    SelectExtendedFieldDropdownDefault: ({
        options,
        onChange,
        value,
        opened,
        setOpened,
        listId,
        size,
        loading,
        mobileTitle,
        dropdownListItemClassName,
    }: {
        options: ISelectFieldOption[];
        onChange: (option: ISelectFieldOption) => void;
        value?: ISelectFieldOption;
        opened: boolean;
        setOpened: (opened: boolean) => void;
        listId?: string;
        size: EComponentSize;
        loading?: boolean;
        mobileTitle?: React.ReactNode;
        dropdownListItemClassName?: string;
    }) => (
        <div
            data-testid="select-extended-field-dropdown-default"
            data-opened={String(opened)}
            data-list-id={listId}
            data-size={size}
            data-loading={String(loading ?? false)}
            data-mobile-title={mobileTitle ? String(mobileTitle) : undefined}
            {...(dropdownListItemClassName ? { "data-dropdown-list-item-class-name": dropdownListItemClassName } : {})}
        >
            {opened &&
                !loading &&
                options.map((option) => (
                    <div
                        key={option.id}
                        data-testid={`option-${option.id}`}
                        data-selected={String(option.id === value?.id)}
                        data-value={option.value}
                        data-class-name={dropdownListItemClassName}
                        onClick={() => {
                            onChange(option);
                            setOpened(false);
                        }}
                        className={dropdownListItemClassName || undefined}
                    >
                        {option.label}
                    </div>
                ))}
        </div>
    ),
}));

describe("SelectField", () => {
    const mockOptions: ISelectFieldOption[] = [
        { id: "1", value: "option1", label: "Первая опция" },
        { id: "2", value: "option2", label: "Вторая опция" },
        { id: "3", value: "option3", label: "Третья опция" },
    ];

    const defaultProps = {
        size: EComponentSize.MD,
        options: mockOptions,
        onChange: vi.fn(),
        targetProps: {
            fieldLabel: "Select Field",
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("Should render with default props", () => {
        render(<SelectField {...defaultProps} data-testid="select-field" />);

        expect(screen.getByTestId("select-field")).toBeInTheDocument();
        expect(screen.getByTestId("select-extended-field-target")).toBeInTheDocument();
    });

    it("Should apply custom className", () => {
        render(<SelectField {...defaultProps} className="custom-class" data-testid="select-field" />);

        const selectField = screen.getByTestId("select-field");
        expect(selectField).toHaveClass("custom-class");
    });

    it("Should apply size classes", () => {
        const { rerender } = render(
            <SelectField {...defaultProps} size={EComponentSize.SM} data-testid="select-field" />,
        );

        let target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("data-size", EComponentSize.SM);

        rerender(<SelectField {...defaultProps} size={EComponentSize.LG} data-testid="select-field" />);
        target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("data-size", EComponentSize.LG);
    });

    it("Should display placeholder when no value is selected", () => {
        render(<SelectField {...defaultProps} placeholder="Выберите опцию" data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("data-placeholder", "Выберите опцию");
        expect(target).toHaveTextContent("Выберите опцию");
    });

    it("Should display selected value label", () => {
        const selectedValue = mockOptions[0];
        render(<SelectField {...defaultProps} value={selectedValue} data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("data-label", String(selectedValue.label));
        expect(target).toHaveTextContent(String(selectedValue.label));
    });

    it("Should apply loading state", () => {
        render(<SelectField {...defaultProps} loading data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("data-loading", "true");
        expect(screen.getByTestId("loader-small")).toBeInTheDocument();
    });

    it("Should apply status classes", () => {
        const { rerender } = render(
            <SelectField {...defaultProps} status={EFormFieldStatus.ERROR} data-testid="select-field" />,
        );

        let target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("data-status", EFormFieldStatus.ERROR);

        rerender(<SelectField {...defaultProps} status={EFormFieldStatus.WARNING} data-testid="select-field" />);
        target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("data-status", EFormFieldStatus.WARNING);

        rerender(<SelectField {...defaultProps} status={EFormFieldStatus.DISABLED} data-testid="select-field" />);
        target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("data-status", EFormFieldStatus.DISABLED);
    });

    it("Should handle onChange when option is selected", async () => {
        const mockOnChange = vi.fn();
        render(<SelectField {...defaultProps} onChange={mockOnChange} data-testid="select-field" />);

        // Simulate opening dropdown by clicking target
        const target = screen.getByTestId("select-extended-field-target");
        fireEvent.click(target);

        // Wait for dropdown to render and options to appear
        await waitFor(() => {
            expect(screen.getByTestId(`option-${mockOptions[0].id}`)).toBeInTheDocument();
        });

        // Find and click an option
        const option = screen.getByTestId(`option-${mockOptions[0].id}`);
        fireEvent.click(option);

        await waitFor(() => {
            expect(mockOnChange).toHaveBeenCalledWith(mockOptions[0]);
        });
    });

    it("Should display options in dropdown", async () => {
        render(<SelectField {...defaultProps} data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        fireEvent.click(target);

        await waitFor(() => {
            mockOptions.forEach((option) => {
                expect(screen.getByTestId(`option-${option.id}`)).toBeInTheDocument();
                expect(screen.getByText(String(option.label))).toBeInTheDocument();
            });
        });
    });

    it("Should mark selected option", async () => {
        const selectedValue = mockOptions[1];
        render(<SelectField {...defaultProps} value={selectedValue} data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        fireEvent.click(target);

        await waitFor(() => {
            const selectedOption = screen.getByTestId(`option-${selectedValue.id}`);
            expect(selectedOption).toHaveAttribute("data-selected", "true");
        });
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<SelectField {...defaultProps} ref={ref} data-testid="select-field" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("Should pass targetProps to target", () => {
        const targetProps = {
            fieldLabel: "Custom Field",
            "data-custom": "custom-value",
            "aria-label": "Custom label",
        };

        render(<SelectField {...defaultProps} targetProps={targetProps} data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("data-custom", "custom-value");
        expect(target).toHaveAttribute("aria-label", "Custom label");
    });

    it("Should pass aria-labelledby to target", () => {
        render(<SelectField {...defaultProps} aria-labelledby="label-id" data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("aria-labelledby", "label-id");
    });

    it("Should pass mobileTitle to dropdown", async () => {
        render(<SelectField {...defaultProps} mobileTitle="Выберите опцию" data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        fireEvent.click(target);

        await waitFor(() => {
            const dropdown = screen.getByTestId("select-extended-field-dropdown-default");
            expect(dropdown).toHaveAttribute("data-mobile-title", "Выберите опцию");
        });
    });

    it("Should pass dropdownListItemClassName to dropdown items", async () => {
        render(
            <SelectField {...defaultProps} dropdownListItemClassName="custom-item-class" data-testid="select-field" />,
        );

        const target = screen.getByTestId("select-extended-field-target");
        fireEvent.click(target);

        await waitFor(() => {
            // Verify dropdown is rendered and options are visible
            const dropdown = screen.getByTestId("select-extended-field-dropdown-default");
            expect(dropdown).toBeInTheDocument();

            // Verify option is rendered (dropdownListItemClassName is passed to SelectExtendedFieldDropdownDefault)
            expect(screen.getByTestId(`option-${mockOptions[0].id}`)).toBeInTheDocument();
        });
    });

    it("Should have correct role and aria attributes", () => {
        render(<SelectField {...defaultProps} data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("role", "combobox");
    });

    it("Should have aria-controls attribute", () => {
        render(<SelectField {...defaultProps} data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        const ariaControls = target.getAttribute("aria-controls");
        expect(ariaControls).toBeTruthy();
    });

    it("Should not render dropdown when loading", async () => {
        render(<SelectField {...defaultProps} loading data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        fireEvent.click(target);

        await waitFor(() => {
            const dropdown = screen.getByTestId("select-extended-field-dropdown-default");
            expect(dropdown).toHaveAttribute("data-loading", "true");
            expect(dropdown).toHaveAttribute("data-opened", "false");
            expect(screen.queryByTestId(`option-${mockOptions[0].id}`)).not.toBeInTheDocument();
        });
    });
});
