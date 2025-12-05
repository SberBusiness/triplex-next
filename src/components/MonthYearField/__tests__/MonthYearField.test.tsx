import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MonthYearField } from "../MonthYearField";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";
import { EFormFieldStatus } from "../../FormField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

vi.mock("@sberbusiness/icons-next", () => ({
    CalendarStrokeSrvIcon16: () => <span data-testid="calendar-icon" />,
    CalendarStrokeSrvIcon20: () => <span data-testid="calendar-icon" />,
    CrossStrokeSrvIcon16: () => <span data-testid="cross-icon" />,
}));

describe("MonthYearField", () => {
    const defaultProps = {
        value: "19700101",
        placeholder: "Select month",
        onChange: vi.fn(),
        format: dateFormatYYYYMMDD,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders input with correct value and placeholder", () => {
        render(<MonthYearField {...defaultProps} />);

        const input = screen.getByPlaceholderText("Select month");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue("Jan 1970");
    });

    it("renders empty input when value is empty", () => {
        render(<MonthYearField {...defaultProps} value="" />);

        const input = screen.getByPlaceholderText("Select month");
        expect(input).toHaveValue("");
    });

    it("calls onChange with empty string when clear button is clicked", async () => {
        render(<MonthYearField {...defaultProps} />);

        const crossIcon = screen.getByTestId("cross-icon");
        const clearButton = crossIcon.closest("button");

        if (clearButton) {
            fireEvent.click(clearButton);
            expect(defaultProps.onChange).toHaveBeenCalledWith("");
        }
    });

    it("disables input when status is disabled", () => {
        render(<MonthYearField {...defaultProps} status={EFormFieldStatus.DISABLED} />);

        const input = screen.getByPlaceholderText("Select month");
        expect(input).toBeDisabled();
    });

    it("updates displayed value when value prop changes", () => {
        const { rerender } = render(<MonthYearField {...defaultProps} />);

        expect(screen.getByDisplayValue("Jan 1970")).toBeInTheDocument();

        rerender(<MonthYearField {...defaultProps} value="19700201" />);

        expect(screen.getByDisplayValue("Feb 1970")).toBeInTheDocument();
    });

    it("handles different date formats", () => {
        const { rerender } = render(<MonthYearField {...defaultProps} value="01/1970" format="MM/YYYY" />);

        expect(screen.getByDisplayValue("Jan 1970")).toBeInTheDocument();

        rerender(<MonthYearField {...defaultProps} value="1970.01" format="YYYY.MM" />);

        expect(screen.getByDisplayValue("Jan 1970")).toBeInTheDocument();
    });

    it("opens calendar dropdown when calendar button is clicked", async () => {
        render(<MonthYearField {...defaultProps} />);

        const calendarIcon = screen.getByTestId("calendar-icon");
        const calendarButton = calendarIcon.closest("button");

        if (calendarButton) {
            fireEvent.click(calendarButton);

            await waitFor(() => {
                const dialog = screen.getByRole("dialog");
                expect(dialog).toBeInTheDocument();
            });
        }
    });

    it("applies custom className", () => {
        const { container } = render(<MonthYearField {...defaultProps} className="custom-class" />);

        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("accepts custom target props", () => {
        render(
            <MonthYearField
                {...defaultProps}
                targetProps={{
                    inputProps: {
                        "data-testid": "custom-input",
                    },
                }}
            />,
        );

        expect(screen.getByTestId("custom-input")).toBeInTheDocument();
    });

    it("renders with different sizes", () => {
        const { rerender } = render(<MonthYearField {...defaultProps} size={EComponentSize.SM} />);

        const input = screen.getByPlaceholderText("Select month");
        expect(input).toBeInTheDocument();

        rerender(<MonthYearField {...defaultProps} size={EComponentSize.LG} />);

        expect(screen.getByPlaceholderText("Select month")).toBeInTheDocument();
    });
});
