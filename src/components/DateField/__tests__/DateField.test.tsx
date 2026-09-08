import React from "react";
import moment from "moment";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { DateField } from "../DateField";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";
import { EComponentSize } from "../../../enums";
import { EFormFieldStatus } from "../../FormField/enums";

vi.mock("@sberbusiness/icons-next", () => ({
    CalendarStrokeSrvIcon16: () => <span data-testid="calendar-icon" />,
    CalendarStrokeSrvIcon20: () => <span data-testid="calendar-icon" />,
    CalendarStrokeSrvIcon24: () => <span data-testid="calendar-icon" />,
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

    it("calls onClear when clear button is clicked", async () => {
        const handleClear = vi.fn();
        render(<DateField {...defaultProps} onClear={handleClear} />);

        const crossIcon = screen.getByTestId("cross-icon");
        const clearButton = crossIcon.closest("button");

        if (clearButton === null) {
            throw new Error("Clear button not found");
        }

        fireEvent.click(clearButton);
        expect(handleClear).toHaveBeenCalledTimes(1);
        expect(handleClear).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
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

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        const { container } = render(<DateField {...defaultProps} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(container.firstChild);
    });

    describe("input editing", () => {
        it("does not call onChange while the date is being typed", () => {
            const handleChange = vi.fn();
            render(<DateField {...defaultProps} value="" onChange={handleChange} />);

            fireEvent.change(screen.getByRole("textbox"), { target: { value: "15.06.1970" } });

            expect(handleChange).not.toHaveBeenCalled();
        });

        it("calls onChange with the date in the format prop on blur", () => {
            const handleChange = vi.fn();
            render(<DateField {...defaultProps} value="" onChange={handleChange} />);
            const input = screen.getByRole("textbox");

            fireEvent.change(input, { target: { value: "15.06.1970" } });
            fireEvent.blur(input);

            expect(handleChange).toHaveBeenCalledWith("19700615");
        });

        it("calls onChange with a value in a custom format", () => {
            const handleChange = vi.fn();
            render(<DateField {...defaultProps} value="" format="DD/MM/YYYY" onChange={handleChange} />);
            const input = screen.getByRole("textbox");

            fireEvent.change(input, { target: { value: "15.06.1970" } });
            fireEvent.blur(input);

            expect(handleChange).toHaveBeenCalledWith("15/06/1970");
        });

        it("calls onChange with an empty string when a filled field is cleared", () => {
            const handleChange = vi.fn();
            render(<DateField {...defaultProps} onChange={handleChange} />);
            const input = screen.getByRole("textbox");

            fireEvent.change(input, { target: { value: "" } });
            fireEvent.blur(input);

            expect(handleChange).toHaveBeenCalledWith("");
        });

        it("does not call onChange when the typed date equals the current value", () => {
            const handleChange = vi.fn();
            render(<DateField {...defaultProps} onChange={handleChange} />);
            const input = screen.getByRole("textbox");

            fireEvent.change(input, { target: { value: "01.01.1970" } });
            fireEvent.blur(input);

            expect(handleChange).not.toHaveBeenCalled();
        });

        it("restores the last valid value when an incomplete date is left in the field", () => {
            const handleChange = vi.fn();
            render(<DateField {...defaultProps} onChange={handleChange} />);
            const input = screen.getByRole("textbox");

            fireEvent.change(input, { target: { value: "15.06" } });
            fireEvent.blur(input);

            expect(handleChange).not.toHaveBeenCalled();
            expect(input).toHaveValue("01.01.1970");
        });

        it("does not call onChange for a date outside limitRange", () => {
            const handleChange = vi.fn();
            render(
                <DateField
                    {...defaultProps}
                    value=""
                    onChange={handleChange}
                    limitRange={{
                        dateFrom: moment("19700101", dateFormatYYYYMMDD),
                        dateTo: moment("19701231", dateFormatYYYYMMDD),
                    }}
                />,
            );
            const input = screen.getByRole("textbox");

            fireEvent.change(input, { target: { value: "15.06.1980" } });
            expect(input).toHaveValue("15.06.1980");

            fireEvent.blur(input);

            expect(handleChange).not.toHaveBeenCalled();
        });

        it("does not call onChange for a date listed in disabledDays", () => {
            const handleChange = vi.fn();
            render(<DateField {...defaultProps} value="" onChange={handleChange} disabledDays={["19700615"]} />);
            const input = screen.getByRole("textbox");

            fireEvent.change(input, { target: { value: "15.06.1970" } });
            expect(input).toHaveValue("15.06.1970");

            fireEvent.blur(input);

            expect(handleChange).not.toHaveBeenCalled();
        });

        it("shows invalidDateHint when a complete but unavailable date is typed", async () => {
            render(
                <DateField {...defaultProps} value="" invalidDateHint="Дата недоступна" disabledDays={["19700615"]} />,
            );

            fireEvent.change(screen.getByRole("textbox"), { target: { value: "15.06.1970" } });

            expect(await screen.findByText("Дата недоступна")).toBeInTheDocument();
        });

        it("hides invalidDateHint when the typed date becomes incomplete", async () => {
            render(
                <DateField {...defaultProps} value="" invalidDateHint="Дата недоступна" disabledDays={["19700615"]} />,
            );
            const input = screen.getByRole("textbox");

            fireEvent.change(input, { target: { value: "15.06.1970" } });
            expect(await screen.findByText("Дата недоступна")).toBeInTheDocument();

            fireEvent.change(input, { target: { value: "15.06" } });

            await waitFor(() => expect(screen.queryByText("Дата недоступна")).not.toBeInTheDocument());
        });
    });

    describe("keyboard", () => {
        it("opens the dropdown on Enter", async () => {
            render(<DateField {...defaultProps} />);

            fireEvent.keyDown(screen.getByRole("textbox"), { code: "Enter" });

            expect(await screen.findByRole("dialog")).toBeInTheDocument();
        });

        it("opens the dropdown on Space and prevents the default input", async () => {
            render(<DateField {...defaultProps} />);
            const input = screen.getByRole("textbox");

            const notPrevented = fireEvent.keyDown(input, { code: "Space" });

            expect(notPrevented).toBe(false);
            expect(await screen.findByRole("dialog")).toBeInTheDocument();
        });

        it("closes an opened dropdown on Enter", async () => {
            render(<DateField {...defaultProps} />);
            const input = screen.getByRole("textbox");

            fireEvent.keyDown(input, { code: "Enter" });
            expect(await screen.findByRole("dialog")).toBeInTheDocument();

            fireEvent.keyDown(input, { code: "Enter" });

            await waitFor(() => {
                expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
            });
        });
    });

    describe("dropdown callbacks", () => {
        it("calls onDropdownOpen when the calendar is opened", async () => {
            const handleDropdownOpen = vi.fn();
            render(<DateField {...defaultProps} onDropdownOpen={handleDropdownOpen} />);

            fireEvent.keyDown(screen.getByRole("textbox"), { code: "Enter" });

            await waitFor(() => {
                expect(handleDropdownOpen).toHaveBeenCalledTimes(1);
            });
        });

        it("calls onDropdownClose when the calendar is closed", async () => {
            const handleDropdownClose = vi.fn();
            render(<DateField {...defaultProps} onDropdownClose={handleDropdownClose} />);
            const input = screen.getByRole("textbox");

            fireEvent.keyDown(input, { code: "Enter" });
            expect(await screen.findByRole("dialog")).toBeInTheDocument();

            fireEvent.keyDown(input, { code: "Enter" });

            await waitFor(() => {
                expect(handleDropdownClose).toHaveBeenCalledTimes(1);
            });
        });
    });
});
