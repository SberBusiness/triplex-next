import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChipDatePicker } from "../ChipDatePicker/ChipDatePicker";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import moment from "moment";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";

const getChipDatePicker = () => screen.getByTestId("chip-date-picker");

describe("ChipDatePicker", () => {
    const defaultProps = {
        label: "Выберите дату",
        value: "",
        onChange: vi.fn(),
        "data-testid": "chip-date-picker",
    };

    it("Should render correctly with basic props", () => {
        render(<ChipDatePicker {...defaultProps} />);

        const chipDatePicker = getChipDatePicker();
        expect(chipDatePicker).toBeInTheDocument();
        expect(chipDatePicker).toHaveClass("chipGroupItem");
        expect(chipDatePicker).toHaveTextContent("Выберите дату");
    });

    it("Should render formatted date when value is provided", () => {
        const date = moment("2024-01-15");
        const value = date.format(dateFormatYYYYMMDD);

        render(<ChipDatePicker {...defaultProps} value={value} />);

        const chipDatePicker = getChipDatePicker();
        expect(chipDatePicker).toHaveTextContent(date.format("DD.MM.YYYY"));
    });

    it("Should render displayedValue when selected and displayedValue is provided", () => {
        const date = moment("2024-01-15");
        const value = date.format(dateFormatYYYYMMDD);

        render(<ChipDatePicker {...defaultProps} value={value} displayedValue="15 января 2024" />);

        const chipDatePicker = getChipDatePicker();
        expect(chipDatePicker).toHaveTextContent("15 января 2024");
    });

    it("Should apply size prop correctly", () => {
        const { rerender } = render(<ChipDatePicker {...defaultProps} value="" size={EComponentSize.SM} />);

        let chipDatePicker = getChipDatePicker();
        expect(chipDatePicker.querySelector("span")).toHaveClass("sm");

        rerender(<ChipDatePicker {...defaultProps} value="" size={EComponentSize.MD} />);
        chipDatePicker = getChipDatePicker();
        expect(chipDatePicker.querySelector("span")).toHaveClass("md");

        rerender(<ChipDatePicker {...defaultProps} value="" size={EComponentSize.LG} />);
        chipDatePicker = getChipDatePicker();
        expect(chipDatePicker.querySelector("span")).toHaveClass("lg");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ChipDatePicker {...defaultProps} value="" ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getChipDatePicker());
    });
});
