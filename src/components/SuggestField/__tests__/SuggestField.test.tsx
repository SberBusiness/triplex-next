import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SuggestField } from "@sberbusiness/triplex-next/components/SuggestField/SuggestField";
import {
    ISuggestFieldOption,
    ISuggestFieldTargetProps,
    ISuggestFieldInputProvideProps,
} from "@sberbusiness/triplex-next/components/SuggestField/types";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

describe("SuggestField", () => {
    const user = userEvent.setup();

    const options: ISuggestFieldOption[] = [
        { id: "1", label: "Option 1" },
        { id: "2", label: "Option 2" },
        { id: "3", label: "Option 3" },
    ];

    const defaultProps = {
        value: undefined,
        options: options,
        size: EComponentSize.MD,
        status: EFormFieldStatus.DEFAULT,
        label: "Test Label",
        placeholder: "Test placeholder",
        tooltipHint: "Test tooltip",
        tooltipOpen: false,
        onSelect: vi.fn(),
        onFilter: vi.fn(),
        "data-testid": "suggest-field",
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render with basic props", () => {
        render(<SuggestField {...defaultProps} />);

        expect(screen.getByTestId("suggest-field")).toBeInTheDocument();
        expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();
    });

    it("should display selected value", () => {
        const selectedValue = options[0];
        render(<SuggestField {...defaultProps} value={selectedValue} />);

        expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();
    });

    it("should call onFilter when user types", async () => {
        render(<SuggestField {...defaultProps} />);

        const input = screen.getByRole("combobox");
        await user.type(input, "test");

        expect(defaultProps.onFilter).toHaveBeenCalledWith("test");
    });

    it("should handle disabled state", () => {
        render(<SuggestField {...defaultProps} status={EFormFieldStatus.DISABLED} />);

        const input = screen.getByRole("combobox");
        expect(input).toBeDisabled();
    });

    it("should call onTargetInputFocus and onTargetInputBlur", async () => {
        const onTargetInputFocus = vi.fn();
        const onTargetInputBlur = vi.fn();

        render(
            <SuggestField
                {...defaultProps}
                onTargetInputFocus={onTargetInputFocus}
                onTargetInputBlur={onTargetInputBlur}
            />,
        );

        const input = screen.getByRole("combobox");

        await user.click(input);
        expect(onTargetInputFocus).toHaveBeenCalled();

        await user.tab();
        expect(onTargetInputBlur).toHaveBeenCalled();
    });

    it("should handle clearInputOnFocus prop", async () => {
        const selectedValue = options[0];
        render(<SuggestField {...defaultProps} value={selectedValue} clearInputOnFocus={true} />);

        const input = screen.getByRole("combobox");
        await user.click(input);

        expect(input).toHaveValue("");
    });

    it("should display tooltip when tooltipOpen is true", async () => {
        render(<SuggestField {...defaultProps} tooltipOpen={true} />);

        const input = screen.getByRole("combobox");
        await user.click(input);

        await waitFor(() => {
            expect(screen.getByText("Test tooltip")).toBeInTheDocument();
        });
    });

    it("should support custom renderTarget", () => {
        const CustomTarget = (props: ISuggestFieldTargetProps) => (
            <div data-testid="custom-target">
                <input
                    data-testid="custom-input"
                    value={props.inputValue}
                    onChange={props.onInputChange}
                    placeholder={props.placeholder}
                />
            </div>
        );

        render(<SuggestField {...defaultProps} renderTarget={CustomTarget} />);

        expect(screen.getByTestId("custom-target")).toBeInTheDocument();
        expect(screen.getByTestId("custom-input")).toBeInTheDocument();
    });

    it("should support custom renderTargetInput", () => {
        const CustomInput = (props: ISuggestFieldInputProvideProps) => (
            <input
                data-testid="custom-target-input"
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        );

        render(<SuggestField {...defaultProps} renderTargetInput={CustomInput} />);

        expect(screen.getByTestId("custom-target-input")).toBeInTheDocument();
    });

    it("should show loading indicator when loading is true", () => {
        render(<SuggestField {...defaultProps} loading={true} />);

        expect(screen.getByLabelText("loading")).toBeInTheDocument();
    });

    it("should update input value when selected value changes", () => {
        const { rerender } = render(<SuggestField {...defaultProps} />);

        const newValue = options[1];
        rerender(<SuggestField {...defaultProps} value={newValue} />);

        expect(screen.getByDisplayValue("Option 2")).toBeInTheDocument();
    });

    it("should maintain input focus after clearing with clearInputOnFocus", async () => {
        const selectedValue = options[0];
        render(<SuggestField {...defaultProps} value={selectedValue} clearInputOnFocus={true} />);

        const input = screen.getByRole("combobox");
        await user.click(input);

        expect(input).toHaveFocus();
        expect(input).toHaveValue("");
    });
});
