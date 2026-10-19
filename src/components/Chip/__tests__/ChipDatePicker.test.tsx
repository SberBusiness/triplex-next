import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ChipDatePicker } from "../ChipDatePicker/ChipDatePicker";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import moment from "moment";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";
import { EChipType } from "../enums";

const getChipDatePicker = () => screen.getByTestId("chip-date-picker");
const getChip = (name: string | RegExp = "Выберите дату") => within(getChipDatePicker()).getByRole("button", { name });

const setMobileView = () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    }));
};

describe("ChipDatePicker", () => {
    const defaultProps = {
        label: "Выберите дату",
        value: "",
        onChange: vi.fn(),
        "data-testid": "chip-date-picker",
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

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

    it("Should synchronize selected value when controlled props change", () => {
        const { rerender } = render(<ChipDatePicker {...defaultProps} value="20240115" />);

        expect(getChip("15.01.2024")).toHaveClass("selected");

        rerender(<ChipDatePicker {...defaultProps} value="20240220" />);
        expect(getChip("20.02.2024")).toHaveClass("selected");

        rerender(<ChipDatePicker {...defaultProps} />);
        expect(getChip()).not.toHaveClass("selected");
        expect(defaultProps.onChange).not.toHaveBeenCalled();
    });

    it.each(["invalid", "20240230"])("Should show label for invalid value %s", (value) => {
        render(<ChipDatePicker {...defaultProps} value={value} displayedValue="Выбрано" />);

        expect(getChip()).not.toHaveClass("selected");
        expect(screen.queryByText("Выбрано")).not.toBeInTheDocument();
    });

    it("Should synchronize availability when limitRange and disabledDays change", () => {
        const value = "20240115";
        const { rerender } = render(<ChipDatePicker {...defaultProps} value={value} />);

        rerender(<ChipDatePicker {...defaultProps} value={value} disabledDays={[value]} />);
        expect(getChip()).not.toHaveClass("selected");

        rerender(
            <ChipDatePicker
                {...defaultProps}
                value={value}
                limitRange={{ dateFrom: moment("2024-02-01"), dateTo: moment("2024-02-29") }}
            />,
        );
        expect(getChip()).not.toHaveClass("selected");

        rerender(<ChipDatePicker {...defaultProps} value={value} />);
        expect(getChip("15.01.2024")).toHaveClass("selected");
    });

    it("Should use format for controlled values and preserve numeric displayedValue", () => {
        render(<ChipDatePicker {...defaultProps} value="15/01/2024" format="DD/MM/YYYY" displayedValue={0} />);

        expect(getChip("0")).toHaveClass("selected");
    });

    it("Should pass type, disabled and root attributes to their corresponding elements", () => {
        render(
            <ChipDatePicker
                {...defaultProps}
                type={EChipType.TYPE_2}
                disabled
                className="custom-class"
                id="date-filter"
            />,
        );

        expect(getChip()).toHaveClass("type2", "disabled");
        expect(getChip()).toHaveAttribute("tabindex", "-1");
        expect(getChipDatePicker()).toHaveClass("custom-class");
        expect(getChipDatePicker()).toHaveAttribute("id", "date-filter");
    });

    it("Should notify open and close callbacks without committing an unchanged date", async () => {
        const onDropdownOpen = vi.fn();
        const onDropdownClose = vi.fn();
        render(
            <ChipDatePicker
                {...defaultProps}
                value="20240115"
                onDropdownOpen={onDropdownOpen}
                onDropdownClose={onDropdownClose}
            />,
        );

        await userEvent.click(getChip("15.01.2024"));
        expect(getChip("15.01.2024")).toHaveAttribute("aria-expanded", "true");
        expect(onDropdownOpen).toHaveBeenCalledExactlyOnceWith();

        await userEvent.click(getChip("15.01.2024"));
        expect(getChip("15.01.2024")).toHaveAttribute("aria-expanded", "false");
        expect(onDropdownClose).toHaveBeenCalledExactlyOnceWith();
        expect(defaultProps.onChange).not.toHaveBeenCalled();
    });

    it("Should commit a calendar selection in the requested format only once", async () => {
        const onChange = vi.fn();
        const { rerender } = render(
            <ChipDatePicker {...defaultProps} value="15/01/2024" format="DD/MM/YYYY" onChange={onChange} />,
        );

        await userEvent.click(getChip("15.01.2024"));
        await userEvent.click(within(screen.getByRole("grid")).getByText("20"));

        expect(onChange).toHaveBeenCalledExactlyOnceWith("20/01/2024");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

        rerender(<ChipDatePicker {...defaultProps} value="20/01/2024" format="DD/MM/YYYY" onChange={onChange} />);
        expect(getChip("20.01.2024")).toHaveClass("selected");
    });

    it("Should clear with an empty value without opening the calendar", async () => {
        const onChange = vi.fn();
        const { rerender } = render(<ChipDatePicker {...defaultProps} value="20240115" onChange={onChange} />);

        await userEvent.click(within(getChip("15.01.2024")).getByRole("button"));

        expect(onChange).toHaveBeenCalledExactlyOnceWith("");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

        rerender(<ChipDatePicker {...defaultProps} value="" onChange={onChange} />);
        expect(getChip()).not.toHaveClass("selected");
    });

    it("Should preserve the selected chip while mobile input is edited and commit on close", async () => {
        setMobileView();
        const onChange = vi.fn();
        const { rerender } = render(<ChipDatePicker {...defaultProps} value="20240115" onChange={onChange} />);

        await userEvent.click(getChip("15.01.2024"));
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "20.02.2024" } });

        expect(getChip("15.01.2024")).toHaveClass("selected");
        expect(onChange).not.toHaveBeenCalled();

        fireEvent.keyDown(screen.getByRole("textbox"), { code: "Escape" });
        expect(onChange).toHaveBeenCalledExactlyOnceWith("20240220");

        rerender(<ChipDatePicker {...defaultProps} value="20240220" onChange={onChange} />);
        expect(getChip("20.02.2024")).toHaveClass("selected");
    });

    it.each(["31.02.2024", "12."])(
        "Should restore the controlled date after unavailable mobile input %s",
        async (input) => {
            setMobileView();
            const onChange = vi.fn();
            render(<ChipDatePicker {...defaultProps} value="20240115" onChange={onChange} />);

            await userEvent.click(getChip("15.01.2024"));
            fireEvent.change(screen.getByRole("textbox"), { target: { value: input } });
            fireEvent.keyDown(screen.getByRole("textbox"), { code: "Escape" });

            expect(onChange).not.toHaveBeenCalled();
            expect(getChip("15.01.2024")).toHaveClass("selected");
        },
    );

    it("Should clear a mobile input only when the dropdown closes", async () => {
        setMobileView();
        const onChange = vi.fn();
        render(<ChipDatePicker {...defaultProps} value="20240115" onChange={onChange} />);

        await userEvent.click(getChip("15.01.2024"));
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });
        expect(onChange).not.toHaveBeenCalled();

        fireEvent.keyDown(screen.getByRole("textbox"), { code: "Escape" });
        expect(onChange).toHaveBeenCalledExactlyOnceWith("");
    });

    it.each([
        { name: "disabled day", props: { disabledDays: ["20240220"] } },
        {
            name: "date outside limitRange",
            props: { limitRange: { dateFrom: moment("2024-01-01"), dateTo: moment("2024-01-31") } },
        },
    ])("Should reject mobile input for $name", async ({ props }) => {
        setMobileView();
        const onChange = vi.fn();
        render(<ChipDatePicker {...defaultProps} value="20240115" onChange={onChange} {...props} />);

        await userEvent.click(getChip("15.01.2024"));
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "20.02.2024" } });
        fireEvent.keyDown(screen.getByRole("textbox"), { code: "Escape" });

        expect(onChange).not.toHaveBeenCalled();
        expect(getChip("15.01.2024")).toHaveClass("selected");
    });

    it("Should commit the calendar selection instead of a pending mobile input", async () => {
        setMobileView();
        const onChange = vi.fn();
        render(<ChipDatePicker {...defaultProps} value="20240115" onChange={onChange} />);

        await userEvent.click(getChip("15.01.2024"));
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "20.02.2024" } });
        await userEvent.click(within(screen.getByRole("grid")).getByText("21"));

        expect(onChange).toHaveBeenCalledExactlyOnceWith("20240221");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
});
