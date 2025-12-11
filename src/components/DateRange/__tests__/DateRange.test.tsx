import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { DateRange, IDateRangeButtonProvideProps, IDateRangePickerProvideProps, TDateRangeValue } from "../DateRange";
import { EDateRangeShiftUnit } from "../enums";

vi.mock("@sberbusiness/icons-next", () => ({
    MinusStrokeSrvIcon20: () => <span data-testid="minus-icon" />,
    CaretleftStrokeSrvIcon20: () => <span data-testid="caret-left-icon" />,
    CaretrightStrokeSrvIcon20: () => <span data-testid="caret-right-icon" />,
}));

describe("DateRange", () => {
    const mockOnChange = vi.fn();

    const renderPicker = (props: IDateRangePickerProvideProps) => (
        <input
            data-testid={`picker-${props.value || "empty"}`}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
        />
    );

    const renderButton = (props: IDateRangeButtonProvideProps) => (
        <button
            data-testid={props.className.includes("disabled") ? "button-disabled" : "button"}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );

    const defaultProps = {
        value: ["20240101", "20240131"] as TDateRangeValue,
        onChange: mockOnChange,
        renderPickerFrom: renderPicker,
        renderPickerTo: renderPicker,
        renderButtonBack: renderButton,
        renderButtonForward: renderButton,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders with default props", () => {
        render(<DateRange {...defaultProps} />);

        expect(screen.getByTestId("picker-20240101")).toBeInTheDocument();
        expect(screen.getByTestId("picker-20240131")).toBeInTheDocument();
        expect(screen.getByTestId("minus-icon")).toBeInTheDocument();
    });

    it("renders navigation buttons when hideNavigation is false", () => {
        render(<DateRange {...defaultProps} />);

        expect(screen.getByTestId("caret-left-icon")).toBeInTheDocument();
        expect(screen.getByTestId("caret-right-icon")).toBeInTheDocument();
    });

    it("hides navigation buttons when hideNavigation is true", () => {
        render(<DateRange {...defaultProps} hideNavigation />);

        expect(screen.queryByTestId("caret-left-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("caret-right-icon")).not.toBeInTheDocument();
    });

    it("calls onChange when picker 'from' value changes with valid date", () => {
        render(<DateRange {...defaultProps} />);

        const pickerFrom = screen.getByTestId("picker-20240101");
        fireEvent.change(pickerFrom, { target: { value: "20240115" } });

        expect(mockOnChange).toHaveBeenCalledWith(["20240115", "20240131"]);
    });

    it("clears 'to' date when 'from' date is greater than 'to' date", () => {
        render(<DateRange {...defaultProps} />);

        const pickerFrom = screen.getByTestId("picker-20240101");
        fireEvent.change(pickerFrom, { target: { value: "20240215" } });

        expect(mockOnChange).toHaveBeenCalledWith(["20240215", ""]);
    });

    it("calls onChange when picker 'to' value changes with valid date", () => {
        render(<DateRange {...defaultProps} />);

        const pickerTo = screen.getByTestId("picker-20240131");
        fireEvent.change(pickerTo, { target: { value: "20240215" } });

        expect(mockOnChange).toHaveBeenCalledWith(["20240101", "20240215"]);
    });

    it("clears 'from' date when 'to' date is less than 'from' date", () => {
        render(<DateRange {...defaultProps} />);

        const pickerTo = screen.getByTestId("picker-20240131");
        fireEvent.change(pickerTo, { target: { value: "20231215" } });

        expect(mockOnChange).toHaveBeenCalledWith(["", "20231215"]);
    });

    it("shifts range back by one month by default", () => {
        render(<DateRange {...defaultProps} />);

        const buttons = screen.getAllByRole("button");
        const backButton = buttons[0];
        fireEvent.click(backButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20231201", "20231231"]);
    });

    it("shifts range forward by one month by default", () => {
        render(<DateRange {...defaultProps} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20240201", "20240229"]);
    });

    it("shifts range by custom shiftAmount", () => {
        render(<DateRange {...defaultProps} shiftAmount={3} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20240401", "20240430"]);
    });

    it("shifts range by days when shiftUnit is DAY", () => {
        render(<DateRange {...defaultProps} shiftUnit={EDateRangeShiftUnit.DAY} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20240102", "20240201"]);
    });

    it("shifts range by weeks when shiftUnit is WEEK", () => {
        render(<DateRange {...defaultProps} shiftUnit={EDateRangeShiftUnit.WEEK} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20240108", "20240207"]);
    });

    it("shifts range by quarters when shiftUnit is QUARTER", () => {
        render(<DateRange {...defaultProps} shiftUnit={EDateRangeShiftUnit.QUARTER} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20240401", "20240430"]);
    });

    it("shifts range by years when shiftUnit is YEAR", () => {
        render(<DateRange {...defaultProps} shiftUnit={EDateRangeShiftUnit.YEAR} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20250101", "20250131"]);
    });

    it("does not shift range when start date is empty", () => {
        render(<DateRange {...defaultProps} value={["", "20240131"]} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("does not shift range when end date is empty", () => {
        render(<DateRange {...defaultProps} value={["20240101", ""]} />);

        const buttons = screen.getAllByRole("button");
        const backButton = buttons[0];
        fireEvent.click(backButton);

        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("disables navigation buttons when dates are empty", () => {
        const renderButtonWithDisabledTest = (props: IDateRangeButtonProvideProps) => (
            <button
                data-testid={props.disabled ? "button-disabled" : "button-enabled"}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.children}
            </button>
        );

        render(
            <DateRange
                {...defaultProps}
                value={["", ""]}
                renderButtonBack={renderButtonWithDisabledTest}
                renderButtonForward={renderButtonWithDisabledTest}
            />,
        );

        const disabledButtons = screen.getAllByTestId("button-disabled");
        expect(disabledButtons).toHaveLength(2);
    });

    it("enables navigation buttons when both dates are filled", () => {
        const renderButtonWithDisabledTest = (props: IDateRangeButtonProvideProps) => (
            <button
                data-testid={props.disabled ? "button-disabled" : "button-enabled"}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.children}
            </button>
        );

        render(
            <DateRange
                {...defaultProps}
                renderButtonBack={renderButtonWithDisabledTest}
                renderButtonForward={renderButtonWithDisabledTest}
            />,
        );

        const enabledButtons = screen.getAllByTestId("button-enabled");
        expect(enabledButtons).toHaveLength(2);
    });

    it("applies custom className", () => {
        const { container } = render(<DateRange {...defaultProps} className="custom-class" />);

        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("passes additional HTML attributes to root element", () => {
        render(<DateRange {...defaultProps} data-testid="date-range-root" aria-label="Date range" />);

        const root = screen.getByTestId("date-range-root");
        expect(root).toHaveAttribute("aria-label", "Date range");
    });
});
