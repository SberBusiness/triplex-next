import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SelectField, ISelectFieldOption } from "../SelectField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EFormFieldStatus } from "../../FormField/enums";
import { EDropdownWidth } from "../../Dropdown";

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
    >(({ renderTarget, children, closeOnTab, ...props }, ref) => {
        const [opened, setOpened] = React.useState(false);
        const targetRef = React.useRef<HTMLDivElement>(null);
        const dropdownRef = React.useRef<HTMLDivElement>(null);

        const handleSetOpened = React.useCallback((newOpened: boolean) => {
            setOpened(newOpened);
        }, []);

        return (
            <div ref={ref} data-opened={String(opened)} data-close-on-tab={String(closeOnTab)} {...props}>
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
            fieldLabel?: React.ReactNode;
            onClick?: () => void;
            setOpened?: (opened: boolean) => void;
            opened?: boolean;
            [key: string]: unknown;
        }
    >(({ label, placeholder, loading, status, size, onClick, setOpened, opened, fieldLabel, ...props }, ref) => {
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
                data-field-label={fieldLabel ? String(fieldLabel) : undefined}
                onClick={handleClick}
                {...props}
            >
                {label || placeholder}
            </div>
        );
    });

    SelectExtendedFieldTarget.displayName = "SelectExtendedFieldTarget";

    const SelectExtendedField = SelectExtendedFieldBase as typeof SelectExtendedFieldBase & {
        Target: typeof SelectExtendedFieldTarget;
    };

    SelectExtendedField.Target = SelectExtendedFieldTarget;

    // Интерфейсы не экспортируются: type-only импорты стираются при компиляции.
    return { SelectExtendedField };
});

vi.mock("../../SelectExtendedField/components/SelectExtendedFieldDropdownDefault", () => ({
    SelectExtendedFieldDropdownDefault: ({
        opened,
        listId,
        size,
        width,
        loading,
        mobileTitle,
        dropdownListItemClassName,
        dropdownProps,
    }: {
        opened: boolean;
        listId?: string;
        size: EComponentSize;
        width?: EDropdownWidth;
        loading?: boolean;
        mobileTitle?: React.ReactNode;
        dropdownListItemClassName?: string;
        dropdownProps?: Record<string, unknown>;
    }) => (
        <div
            data-testid="select-extended-field-dropdown-default"
            {...dropdownProps}
            data-opened={String(opened)}
            data-list-id={listId}
            data-size={size}
            data-width={width}
            data-loading={String(loading ?? false)}
            data-mobile-title={mobileTitle ? String(mobileTitle) : undefined}
            data-dropdown-list-item-class-name={dropdownListItemClassName || undefined}
        />
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

    it("Should apply custom className", () => {
        render(<SelectField {...defaultProps} className="custom-class" data-testid="select-field" />);

        expect(screen.getByTestId("select-field")).toHaveClass("custom-class");
    });

    it("Should pass closeOnTab to SelectExtendedField", () => {
        render(<SelectField {...defaultProps} data-testid="select-field" />);

        expect(screen.getByTestId("select-field")).toHaveAttribute("data-close-on-tab", "true");
    });

    it("Should pass size to target", () => {
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

    it("Should pass status to target", () => {
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

    it("Should set combobox aria attributes linked to dropdown list id", async () => {
        render(<SelectField {...defaultProps} data-testid="select-field" />);

        const target = screen.getByTestId("select-extended-field-target");
        expect(target).toHaveAttribute("role", "combobox");
        expect(target).not.toHaveAttribute("aria-activedescendant");

        fireEvent.click(target);

        await waitFor(() => {
            const dropdown = screen.getByTestId("select-extended-field-dropdown-default");
            const listId = dropdown.getAttribute("data-list-id");

            expect(listId).toBeTruthy();
            expect(target).toHaveAttribute("aria-controls", listId);
        });
    });

    it("Should pass mobileTitle to dropdown", async () => {
        render(<SelectField {...defaultProps} mobileTitle="Выберите опцию" data-testid="select-field" />);

        fireEvent.click(screen.getByTestId("select-extended-field-target"));

        await waitFor(() => {
            expect(screen.getByTestId("select-extended-field-dropdown-default")).toHaveAttribute(
                "data-mobile-title",
                "Выберите опцию",
            );
        });
    });

    it("Should pass dropdownListItemClassName to dropdown items", async () => {
        render(
            <SelectField {...defaultProps} dropdownListItemClassName="custom-item-class" data-testid="select-field" />,
        );

        fireEvent.click(screen.getByTestId("select-extended-field-target"));

        await waitFor(() => {
            expect(screen.getByTestId("select-extended-field-dropdown-default")).toHaveAttribute(
                "data-dropdown-list-item-class-name",
                "custom-item-class",
            );
        });
    });

    it("Should pass dropdownProps to dropdown", async () => {
        const dropdownProps = {
            className: "custom-dropdown-class",
            "data-custom": "dropdown-value",
        };

        render(<SelectField {...defaultProps} dropdownProps={dropdownProps} data-testid="select-field" />);

        fireEvent.click(screen.getByTestId("select-extended-field-target"));

        await waitFor(() => {
            const dropdown = screen.getByTestId("select-extended-field-dropdown-default");
            expect(dropdown).toHaveAttribute("data-custom", "dropdown-value");
            expect(dropdown).toHaveClass("custom-dropdown-class");
        });
    });

    it("Should pass width TARGET to dropdown", async () => {
        render(<SelectField {...defaultProps} data-testid="select-field" />);

        fireEvent.click(screen.getByTestId("select-extended-field-target"));

        await waitFor(() => {
            expect(screen.getByTestId("select-extended-field-dropdown-default")).toHaveAttribute(
                "data-width",
                EDropdownWidth.TARGET,
            );
        });
    });

    it("Should pass loading to dropdown", async () => {
        render(<SelectField {...defaultProps} loading data-testid="select-field" />);

        fireEvent.click(screen.getByTestId("select-extended-field-target"));

        await waitFor(() => {
            const dropdown = screen.getByTestId("select-extended-field-dropdown-default");
            expect(dropdown).toHaveAttribute("data-loading", "true");
            expect(dropdown).toHaveAttribute("data-opened", "false");
        });
    });
});
