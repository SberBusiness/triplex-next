import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import moment from "moment";
import { ChipMonthYearPicker } from "../ChipMonthYearPicker/ChipMonthYearPicker";
import { EChipType } from "../enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";

const getChipMonthYearPicker = () => screen.getByTestId("chip-month-year-picker");
const getChip = () => within(getChipMonthYearPicker()).getAllByRole("button")[0];
const getClearButton = () => screen.getByRole("button", { name: "Очистить" });

describe("ChipMonthYearPicker", () => {
    const value = moment("2024-01-15").format(dateFormatYYYYMMDD);
    const defaultProps = {
        label: "Выберите месяц",
        value: "",
        onChange: vi.fn(),
        clearButtonProps: { "aria-label": "Очистить" },
        "data-testid": "chip-month-year-picker",
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should render correctly with basic props", () => {
        render(<ChipMonthYearPicker {...defaultProps} />);

        const chipMonthYearPicker = getChipMonthYearPicker();
        expect(chipMonthYearPicker).toBeInTheDocument();
        expect(chipMonthYearPicker).toHaveClass("chipGroupItem");
        expect(chipMonthYearPicker).toHaveTextContent("Выберите месяц");
    });

    it("Should merge custom className with base class", () => {
        render(<ChipMonthYearPicker {...defaultProps} className="custom-class" />);

        expect(getChipMonthYearPicker()).toHaveClass("chipGroupItem", "custom-class");
    });

    it("Should render formatted month when value is provided", () => {
        render(<ChipMonthYearPicker {...defaultProps} value={value} />);

        expect(getChipMonthYearPicker()).toHaveTextContent("Jan 2024");
    });

    it("Should render label when value is out of limitRange", () => {
        render(
            <ChipMonthYearPicker
                {...defaultProps}
                value={value}
                limitRange={{ dateFrom: moment("2025-01-01"), dateTo: moment("2025-12-31") }}
            />,
        );

        expect(getChipMonthYearPicker()).toHaveTextContent("Выберите месяц");
    });

    it("Should support custom format", () => {
        render(<ChipMonthYearPicker {...defaultProps} value="01/2024" format="MM/YYYY" />);

        expect(getChipMonthYearPicker()).toHaveTextContent("Jan 2024");
    });

    it("Should render displayedValue when selected and displayedValue is provided", () => {
        render(<ChipMonthYearPicker {...defaultProps} value={value} displayedValue="Январь 2024" />);

        expect(getChipMonthYearPicker()).toHaveTextContent("Январь 2024");
    });

    it("Should render label instead of displayedValue when value is empty", () => {
        render(<ChipMonthYearPicker {...defaultProps} displayedValue="Январь 2024" />);

        expect(getChipMonthYearPicker()).toHaveTextContent("Выберите месяц");
        expect(getChipMonthYearPicker()).not.toHaveTextContent("Январь 2024");
    });

    it("Should open dropdown on chip click", async () => {
        render(<ChipMonthYearPicker {...defaultProps} />);

        expect(getChip()).toHaveAttribute("aria-expanded", "false");

        await userEvent.click(getChip());

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(getChip()).toHaveAttribute("aria-expanded", "true");
    });

    it("Should open dropdown on Enter press", async () => {
        render(<ChipMonthYearPicker {...defaultProps} />);

        getChip().focus();
        await userEvent.keyboard("{Enter}");

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(getChip()).toHaveAttribute("aria-expanded", "true");
    });

    it("Should open dropdown on Space press", async () => {
        render(<ChipMonthYearPicker {...defaultProps} />);

        getChip().focus();
        await userEvent.keyboard(" ");

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(getChip()).toHaveAttribute("aria-expanded", "true");
    });

    it("Should call onChange with selected month in given format", async () => {
        const onChange = vi.fn();

        render(<ChipMonthYearPicker {...defaultProps} value="01/2024" format="MM/YYYY" onChange={onChange} />);

        await userEvent.click(getChip());
        await userEvent.click(screen.getByText("Feb"));

        expect(onChange).toHaveBeenCalledWith("02/2024");
    });

    it("Should call onChange with empty value on clear button click", async () => {
        const onChange = vi.fn();

        render(<ChipMonthYearPicker {...defaultProps} value={value} onChange={onChange} />);

        await userEvent.click(getClearButton());

        expect(onChange).toHaveBeenCalledWith("");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("Should call onChange with empty value on clear button Enter press", async () => {
        const onChange = vi.fn();

        render(<ChipMonthYearPicker {...defaultProps} value={value} onChange={onChange} />);

        getClearButton().focus();
        await userEvent.keyboard("{Enter}");

        expect(onChange).toHaveBeenCalledWith("");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("Should not open dropdown when disabled", async () => {
        render(<ChipMonthYearPicker {...defaultProps} disabled />);

        await userEvent.click(getChip());

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        expect(getChip()).toHaveAttribute("aria-expanded", "false");
    });

    it("Should apply type prop correctly", () => {
        const { rerender } = render(<ChipMonthYearPicker {...defaultProps} type={EChipType.TYPE_1} />);

        expect(getChip()).toHaveClass("type1");

        rerender(<ChipMonthYearPicker {...defaultProps} type={EChipType.TYPE_2} />);
        expect(getChip()).toHaveClass("type2");
    });

    it("Should apply size prop correctly", () => {
        const { rerender } = render(<ChipMonthYearPicker {...defaultProps} size={EComponentSize.SM} />);

        expect(getChip()).toHaveClass("sm");

        rerender(<ChipMonthYearPicker {...defaultProps} size={EComponentSize.MD} />);
        expect(getChip()).toHaveClass("md");

        rerender(<ChipMonthYearPicker {...defaultProps} size={EComponentSize.LG} />);
        expect(getChip()).toHaveClass("lg");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ChipMonthYearPicker {...defaultProps} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getChipMonthYearPicker());
    });
});
