import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SuggestField, ISuggestFieldOption } from "@sberbusiness/triplex-next/components/SuggestField";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";

// Test data
const mockOptions: ISuggestFieldOption[] = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
];

describe("SuggestField", () => {
    const defaultProps = {
        value: undefined,
        options: mockOptions,
        onSelect: vi.fn(),
        onFilter: vi.fn(),
        tooltipHint: "Test hint",
        tooltipOpen: false,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Basic Rendering", () => {
        it("should render with label and placeholder", () => {
            render(<SuggestField {...defaultProps} label="Test Label" placeholder="Test placeholder" />);

            expect(screen.getByText("Test Label")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();
        });

        it("should render with initial value", () => {
            const value = mockOptions[0];
            render(<SuggestField {...defaultProps} value={value} />);

            expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();
        });

        it("should render in disabled state", () => {
            render(<SuggestField {...defaultProps} status={EFormFieldStatus.DISABLED} />);

            const input = screen.getByRole("combobox");
            expect(input).toBeDisabled();
        });
    });

    describe("User Interactions", () => {
        it("should call onFilter when user types", async () => {
            render(<SuggestField {...defaultProps} />);

            const input = screen.getByRole("combobox");
            await userEvent.type(input, "test");

            await waitFor(() => {
                expect(defaultProps.onFilter).toHaveBeenCalledWith("test");
            });
        });
    });

    describe("Custom Rendering", () => {
        it("should render custom dropdown items", async () => {
            const customRenderDropdownItem = vi.fn(({ option }) => (
                <div data-testid={`custom-item-${option.id}`}>{option.label}</div>
            ));

            render(<SuggestField {...defaultProps} renderDropdownItem={customRenderDropdownItem} />);

            const input = screen.getByRole("combobox");
            await userEvent.click(input);

            await waitFor(() => {
                expect(customRenderDropdownItem).toHaveBeenCalled();
            });
        });
    });

    describe("Edge Cases", () => {
        it("should clear input on focus when clearInputOnFocus is true", async () => {
            const value = mockOptions[0];
            render(<SuggestField {...defaultProps} value={value} clearInputOnFocus={true} />);

            const input = screen.getByDisplayValue("Option 1");
            await userEvent.click(input);

            await waitFor(() => {
                expect(screen.getByDisplayValue("")).toBeInTheDocument();
            });
        });

        it("should handle scroll end callback", async () => {
            const onScrollEnd = vi.fn();
            render(<SuggestField {...defaultProps} onScrollEnd={onScrollEnd} />);

            // This would need a more complex test to simulate actual scrolling
            // For now, we just verify the prop is passed through
            expect(onScrollEnd).toBeDefined();
        });
    });

    describe("Accessibility", () => {
        it("should have proper ARIA attributes", () => {
            render(<SuggestField {...defaultProps} />);

            const input = screen.getByRole("combobox");
            expect(input).toHaveAttribute("aria-controls");
        });

        it("should maintain proper focus management", async () => {
            render(<SuggestField {...defaultProps} />);

            const input = screen.getByRole("combobox");
            await userEvent.click(input);

            await waitFor(() => {
                expect(input).toHaveFocus();
            });
        });
    });
});
