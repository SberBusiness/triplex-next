import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import {
    MonthYearRange,
    IMonthYearRangeButtonProvideProps,
    IMonthYearRangePickerProvideProps,
    TMonthYearRangeValue,
} from "../MonthYearRange";
import { EMonthYearRangeShiftUnit } from "../enums";

vi.mock("@sberbusiness/icons-next", () => ({
    RangeStrokeSrvIcon16: () => <span data-testid="range-icon" />,
    CaretleftStrokeSrvIcon20: () => <span data-testid="caret-left-icon" />,
    CaretrightStrokeSrvIcon20: () => <span data-testid="caret-right-icon" />,
}));

describe("MonthYearRange", () => {
    const mockOnChange = vi.fn();

    const renderPicker = (props: IMonthYearRangePickerProvideProps) => (
        <input
            data-testid={`picker-${props.value || "empty"}`}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
        />
    );

    const renderButton = (props: IMonthYearRangeButtonProvideProps) => (
        <button
            data-testid={props.className.includes("disabled") ? "button-disabled" : "button"}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );

    const defaultProps = {
        value: ["20240101", "20240301"] as TMonthYearRangeValue,
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
        render(<MonthYearRange {...defaultProps} />);

        expect(screen.getByTestId("picker-20240101")).toBeInTheDocument();
        expect(screen.getByTestId("picker-20240301")).toBeInTheDocument();
        expect(screen.getByTestId("caret-left-icon")).toBeInTheDocument();
        expect(screen.getByTestId("caret-right-icon")).toBeInTheDocument();
        expect(screen.getByTestId("range-icon")).toBeInTheDocument();
    });

    it("hides navigation buttons when hideNavigation is true", () => {
        render(<MonthYearRange {...defaultProps} hideNavigation />);

        expect(screen.queryByTestId("caret-left-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("caret-right-icon")).not.toBeInTheDocument();
    });

    it("calls onChange when picker 'from' value changes with valid date", () => {
        render(<MonthYearRange {...defaultProps} />);

        const pickerFrom = screen.getByTestId("picker-20240101");
        fireEvent.change(pickerFrom, { target: { value: "20240201" } });

        expect(mockOnChange).toHaveBeenCalledWith(["20240201", "20240301"]);
    });

    it("clears 'to' date when 'from' date is greater than 'to' date", () => {
        render(<MonthYearRange {...defaultProps} />);

        const pickerFrom = screen.getByTestId("picker-20240101");
        fireEvent.change(pickerFrom, { target: { value: "20240401" } });

        expect(mockOnChange).toHaveBeenCalledWith(["20240401", ""]);
    });

    it("calls onChange when picker 'to' value changes with valid date", () => {
        render(<MonthYearRange {...defaultProps} />);

        const pickerTo = screen.getByTestId("picker-20240301");
        fireEvent.change(pickerTo, { target: { value: "20240401" } });

        expect(mockOnChange).toHaveBeenCalledWith(["20240101", "20240401"]);
    });

    it("shifts range back by one month by default", () => {
        render(<MonthYearRange {...defaultProps} />);

        const buttons = screen.getAllByRole("button");
        const backButton = buttons[0];
        fireEvent.click(backButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20231201", "20240201"]);
    });

    it("shifts range forward by one month by default", () => {
        render(<MonthYearRange {...defaultProps} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20240201", "20240401"]);
    });

    it("shifts range by custom shiftAmount", () => {
        render(<MonthYearRange {...defaultProps} shiftAmount={3} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20240401", "20240601"]);
    });

    it("shifts range by quarters when shiftUnit is QUARTER", () => {
        render(<MonthYearRange {...defaultProps} shiftUnit={EMonthYearRangeShiftUnit.QUARTER} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20240401", "20240601"]);
    });

    it("shifts range by years when shiftUnit is YEAR", () => {
        render(<MonthYearRange {...defaultProps} shiftUnit={EMonthYearRangeShiftUnit.YEAR} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).toHaveBeenCalledWith(["20250101", "20250301"]);
    });

    it("does not shift range when start date is empty", () => {
        render(<MonthYearRange {...defaultProps} value={["", "20240301"]} />);

        const buttons = screen.getAllByRole("button");
        const forwardButton = buttons[1];
        fireEvent.click(forwardButton);

        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("does not shift range when end date is empty", () => {
        render(<MonthYearRange {...defaultProps} value={["20240101", ""]} />);

        const buttons = screen.getAllByRole("button");
        const backButton = buttons[0];
        fireEvent.click(backButton);

        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("disables navigation buttons when dates are empty", () => {
        const renderButtonWithDisabledTest = (props: IMonthYearRangeButtonProvideProps) => (
            <button
                data-testid={props.disabled ? "button-disabled" : "button-enabled"}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.children}
            </button>
        );

        render(
            <MonthYearRange
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
        const renderButtonWithDisabledTest = (props: IMonthYearRangeButtonProvideProps) => (
            <button
                data-testid={props.disabled ? "button-disabled" : "button-enabled"}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.children}
            </button>
        );

        render(
            <MonthYearRange
                {...defaultProps}
                renderButtonBack={renderButtonWithDisabledTest}
                renderButtonForward={renderButtonWithDisabledTest}
            />,
        );

        const enabledButtons = screen.getAllByTestId("button-enabled");
        expect(enabledButtons).toHaveLength(2);
    });

    it("applies custom className", () => {
        const { container } = render(<MonthYearRange {...defaultProps} className="custom-class" />);

        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("passes additional HTML attributes to root element", () => {
        render(<MonthYearRange {...defaultProps} data-testid="month-year-range-root" aria-label="Month year range" />);

        const root = screen.getByTestId("month-year-range-root");
        expect(root).toHaveAttribute("aria-label", "Month year range");
    });

    it.each<{
        value: TMonthYearRangeValue;
        amount: number;
        unit: EMonthYearRangeShiftUnit;
        back: TMonthYearRangeValue;
        forward: TMonthYearRangeValue;
    }>([
        {
            value: ["20240131", "20240331"],
            amount: 1,
            unit: EMonthYearRangeShiftUnit.MONTH,
            back: ["20231231", "20240229"],
            forward: ["20240229", "20240430"],
        },
        {
            value: ["20240131", "20240331"],
            amount: 1,
            unit: EMonthYearRangeShiftUnit.QUARTER,
            back: ["20231031", "20231231"],
            forward: ["20240430", "20240630"],
        },
        {
            value: ["20200229", "20240331"],
            amount: 1,
            unit: EMonthYearRangeShiftUnit.YEAR,
            back: ["20190228", "20230331"],
            forward: ["20210228", "20250331"],
        },
        {
            value: ["20240131", "20240331"],
            amount: -1,
            unit: EMonthYearRangeShiftUnit.MONTH,
            back: ["20240229", "20240430"],
            forward: ["20231231", "20240229"],
        },
        {
            value: ["20240131", "20240331"],
            amount: -1,
            unit: EMonthYearRangeShiftUnit.QUARTER,
            back: ["20240430", "20240630"],
            forward: ["20231031", "20231231"],
        },
        {
            value: ["20200229", "20240331"],
            amount: -1,
            unit: EMonthYearRangeShiftUnit.YEAR,
            back: ["20210228", "20250331"],
            forward: ["20190228", "20230331"],
        },
        {
            value: ["20240131", "20240331"],
            amount: 0.5,
            unit: EMonthYearRangeShiftUnit.MONTH,
            back: ["20231231", "20240229"],
            forward: ["20240229", "20240430"],
        },
        {
            value: ["20240131", "20240331"],
            amount: 0.5,
            unit: EMonthYearRangeShiftUnit.QUARTER,
            back: ["20231130", "20240131"],
            forward: ["20240331", "20240531"],
        },
        {
            value: ["20200229", "20240331"],
            amount: 0.5,
            unit: EMonthYearRangeShiftUnit.YEAR,
            back: ["20190829", "20230930"],
            forward: ["20200829", "20240930"],
        },
        {
            value: ["20240131", "20240331"],
            amount: -0.5,
            unit: EMonthYearRangeShiftUnit.MONTH,
            back: ["20240229", "20240430"],
            forward: ["20231231", "20240229"],
        },
        {
            value: ["20240131", "20240331"],
            amount: -0.5,
            unit: EMonthYearRangeShiftUnit.QUARTER,
            back: ["20240331", "20240531"],
            forward: ["20231130", "20240131"],
        },
        {
            value: ["20200229", "20240331"],
            amount: -0.5,
            unit: EMonthYearRangeShiftUnit.YEAR,
            back: ["20200829", "20240930"],
            forward: ["20190829", "20230930"],
        },
        {
            value: ["20240131", "20240331"],
            amount: 0,
            unit: EMonthYearRangeShiftUnit.MONTH,
            back: ["20240131", "20240331"],
            forward: ["20240131", "20240331"],
        },
    ])(
        "preserves $unit arithmetic with amount $amount at date boundaries",
        ({ value, amount, unit, back, forward }) => {
            render(<MonthYearRange {...defaultProps} value={value} shiftAmount={amount} shiftUnit={unit} />);

            const buttons = screen.getAllByRole("button");
            fireEvent.click(buttons[0]);
            fireEvent.click(buttons[1]);

            expect(mockOnChange).toHaveBeenCalledTimes(2);
            expect(mockOnChange).toHaveBeenNthCalledWith(1, back);
            expect(mockOnChange).toHaveBeenNthCalledWith(2, forward);
        },
    );

    it.each([
        ["20240230", "20240331"],
        ["20240131", "20240230"],
        ["2024-01-31", "20240331"],
        ["20240131", "202403"],
    ])("does not shift invalid dates %s and %s but keeps navigation enabled", (start, end) => {
        render(<MonthYearRange {...defaultProps} value={[start, end]} />);

        const buttons = screen.getAllByRole("button");
        buttons.forEach((button) => {
            expect(button).toBeEnabled();
            fireEvent.click(button);
        });

        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it.each([
        ["", "20240301"],
        ["20240101", ""],
        ["", ""],
    ])("guards both navigation callbacks when a boundary is empty: %s and %s", (start, end) => {
        const renderButtonWithCallback = vi.fn(renderButton);

        render(
            <MonthYearRange
                {...defaultProps}
                value={[start, end]}
                renderButtonBack={renderButtonWithCallback}
                renderButtonForward={renderButtonWithCallback}
            />,
        );

        screen.getAllByRole("button").forEach((button) => expect(button).toBeDisabled());
        renderButtonWithCallback.mock.calls.forEach(([props]) => props.onClick());

        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("preserves 'to' date when 'from' date is cleared", () => {
        render(<MonthYearRange {...defaultProps} />);

        fireEvent.change(screen.getByTestId("picker-20240101"), { target: { value: "" } });

        expect(mockOnChange).toHaveBeenCalledWith(["", "20240301"]);
    });

    it("preserves 'from' date when 'to' date is cleared", () => {
        render(<MonthYearRange {...defaultProps} />);

        fireEvent.change(screen.getByTestId("picker-20240301"), { target: { value: "" } });

        expect(mockOnChange).toHaveBeenCalledWith(["20240101", ""]);
    });

    it("allows 'from' date to equal 'to' date", () => {
        render(<MonthYearRange {...defaultProps} />);

        fireEvent.change(screen.getByTestId("picker-20240101"), { target: { value: "20240301" } });

        expect(mockOnChange).toHaveBeenCalledWith(["20240301", "20240301"]);
    });

    it("allows 'to' date to equal 'from' date", () => {
        render(<MonthYearRange {...defaultProps} />);

        fireEvent.change(screen.getByTestId("picker-20240301"), { target: { value: "20240101" } });

        expect(mockOnChange).toHaveBeenCalledWith(["20240101", "20240101"]);
    });

    it("clears 'from' date when 'to' date is less than 'from' date", () => {
        render(<MonthYearRange {...defaultProps} />);

        fireEvent.change(screen.getByTestId("picker-20240301"), { target: { value: "20231201" } });

        expect(mockOnChange).toHaveBeenCalledWith(["", "20231201"]);
    });

    it("compares picker 'from' values as strings without validating date format", () => {
        render(<MonthYearRange {...defaultProps} />);

        fireEvent.change(screen.getByTestId("picker-20240101"), { target: { value: "2024-04-01" } });

        expect(mockOnChange).toHaveBeenCalledWith(["2024-04-01", "20240301"]);
    });

    it("compares picker 'to' values as strings without validating date format", () => {
        render(<MonthYearRange {...defaultProps} />);

        fireEvent.change(screen.getByTestId("picker-20240301"), { target: { value: "2024-04-01" } });

        expect(mockOnChange).toHaveBeenCalledWith(["", "2024-04-01"]);
    });

    it("forwards ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<MonthYearRange {...defaultProps} ref={ref} data-testid="month-year-range-root" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("month-year-range-root"));
    });
});
