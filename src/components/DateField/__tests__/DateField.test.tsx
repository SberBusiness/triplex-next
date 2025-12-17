import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { DateField } from "../DateField";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";
import { EFormFieldStatus } from "../../FormField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

vi.mock("@sberbusiness/icons-next", () => ({
    CalendarStrokeSrvIcon16: () => <span data-testid="calendar-icon" />,
    CalendarStrokeSrvIcon20: () => <span data-testid="calendar-icon" />,
    CrossStrokeSrvIcon16: () => <span data-testid="cross-icon" />,
    CaretleftStrokeSrvIcon24: () => <span data-testid="caret-left-icon-24" />,
    CaretrightStrokeSrvIcon24: () => <span data-testid="caret-right-icon-24" />,
}));

describe("DateField", () => {
    const defaultProps = {
        value: "19700101",
        placeholderMask: "dd.mm.yyyy",
        invalidDateHint: "",
        onChange: vi.fn(),
        format: dateFormatYYYYMMDD,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders input with correct value", () => {
        render(<DateField {...defaultProps} />);

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue("01.01.1970");
    });

    it("renders empty input when value is empty", () => {
        render(<DateField {...defaultProps} value="" />);

        const input = screen.getByRole("textbox");
        expect(input).toHaveValue("");
    });

    it("calls onChange with empty string when clear button is clicked", async () => {
        render(<DateField {...defaultProps} />);

        const crossIcon = screen.getByTestId("cross-icon");
        const clearButton = crossIcon.closest("button");

        if (clearButton) {
            fireEvent.click(clearButton);
            expect(defaultProps.onChange).toHaveBeenCalledWith("");
        }
    });

    it("disables input when status is disabled", () => {
        render(<DateField {...defaultProps} status={EFormFieldStatus.DISABLED} />);

        const input = screen.getByRole("textbox");
        expect(input).toBeDisabled();
    });

    it("updates displayed value when value prop changes", () => {
        const { rerender } = render(<DateField {...defaultProps} />);

        expect(screen.getByDisplayValue("01.01.1970")).toBeInTheDocument();

        rerender(<DateField {...defaultProps} value="19700201" />);

        expect(screen.getByDisplayValue("01.02.1970")).toBeInTheDocument();
    });

    it("handles different date formats", () => {
        const { rerender } = render(<DateField {...defaultProps} value="01/1970" format="MM/YYYY" />);

        expect(screen.getByDisplayValue("01.01.1970")).toBeInTheDocument();

        rerender(<DateField {...defaultProps} value="1970.01" format="YYYY.MM" />);

        expect(screen.getByDisplayValue("01.01.1970")).toBeInTheDocument();
    });

    it("opens calendar dropdown when calendar button is clicked", async () => {
        render(<DateField {...defaultProps} />);

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
        const { container } = render(<DateField {...defaultProps} className="custom-class" />);

        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("accepts custom target props", () => {
        render(
            <DateField
                {...defaultProps}
                targetProps={{
                    maskedInputProps: {
                        "data-testid": "custom-input",
                    },
                }}
            />,
        );

        expect(screen.getByTestId("custom-input")).toBeInTheDocument();
    });

    it("renders with different sizes", () => {
        const { rerender } = render(<DateField {...defaultProps} size={EComponentSize.SM} />);
        let input;

        input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();

        rerender(<DateField {...defaultProps} size={EComponentSize.LG} />);

        input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
    });
});
