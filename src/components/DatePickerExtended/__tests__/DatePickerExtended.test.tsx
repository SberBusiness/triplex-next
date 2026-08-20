import React, { useContext } from "react";
import moment from "moment";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DatePickerExtended, IDatePickerExtendedProps } from "../DatePickerExtended";
import { DatePickerExtendedContext } from "../DatePickerExtendedContext";
import { ECalendarPickType } from "../../Calendar/enums";
import { dateFormatYYYYMMDD } from "../../../consts/DateConst";

const PICKED_DATE = "19700115";

/** Подменяет matchMedia, чтобы MobileView отрендерил мобильную или десктопную ветку. */
const setMobileView = (matches: boolean) => {
    vi.spyOn(window, "matchMedia").mockImplementation(
        (query: string) =>
            ({
                matches,
                media: query,
                onchange: null,
                addEventListener: () => {},
                removeEventListener: () => {},
                addListener: () => {},
                removeListener: () => {},
                dispatchEvent: () => false,
            }) as unknown as MediaQueryList,
    );
};

/** Целевой элемент: открывает и закрывает календарь через контекст — так же, как DateField и ChipDatePicker. */
const Target = () => {
    const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);

    return (
        <button type="button" aria-expanded={dropdownOpen} onClick={() => setDropdownOpen(!dropdownOpen)}>
            Target
        </button>
    );
};

const defaultProps = {
    pickedDate: PICKED_DATE,
    renderTarget: () => <Target />,
    renderDropdownHeaderTarget: () => <div data-testid="dropdown-header-target">Header target</div>,
    "data-testid": "date-picker",
};

type TRenderProps = Partial<IDatePickerExtendedProps> & { ref?: React.Ref<HTMLDivElement> };

const renderDatePicker = (props: TRenderProps = {}) =>
    render(<DatePickerExtended {...defaultProps} onDateChange={vi.fn()} {...props} />);

const getTarget = () => screen.getByRole("button", { name: "Target" });

const openDropdown = () => fireEvent.click(getTarget());

describe("DatePickerExtended", () => {
    beforeEach(() => {
        setMobileView(false);
        // Футер календаря зависит от текущей даты — фиксируем её, чтобы прогон не мигал на границе суток.
        vi.useFakeTimers({ shouldAdvanceTime: true });
        vi.setSystemTime(new Date(1970, 0, 20));
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("renders the target and keeps the calendar closed initially", () => {
        renderDatePicker();

        expect(getTarget()).toBeInTheDocument();
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });

    it("opens the calendar in a modal dialog from the target", () => {
        renderDatePicker();

        openDropdown();

        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("calls onDropdownOpen and onDropdownClose on state change", () => {
        const onDropdownOpen = vi.fn();
        const onDropdownClose = vi.fn();
        renderDatePicker({ onDropdownOpen, onDropdownClose });

        openDropdown();
        expect(onDropdownOpen).toHaveBeenCalledTimes(1);
        expect(onDropdownClose).not.toHaveBeenCalled();

        fireEvent.click(getTarget());
        expect(onDropdownClose).toHaveBeenCalledTimes(1);
    });

    it("closes the calendar on Escape", () => {
        renderDatePicker();
        openDropdown();

        fireEvent.keyDown(screen.getByTestId("date-picker"), { code: "Escape" });

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes the calendar on Escape pressed inside the calendar", () => {
        renderDatePicker();
        openDropdown();

        // Календарь рендерится в Portal, но остаётся в React-дереве компонента — событие доходит до корневого элемента.
        fireEvent.keyDown(screen.getByRole("grid"), { code: "Escape" });

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes the calendar on mousedown outside of the component", () => {
        renderDatePicker();
        openDropdown();

        fireEvent.mouseDown(document.body);

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("keeps the calendar open on mousedown inside the dropdown", () => {
        renderDatePicker();
        openDropdown();

        fireEvent.mouseDown(screen.getByRole("grid"));

        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("calls onDateChange with the picked date and closes the calendar", () => {
        const onDateChange = vi.fn();
        renderDatePicker({ onDateChange });
        openDropdown();

        fireEvent.click(screen.getByText("20"));

        expect(onDateChange).toHaveBeenCalledTimes(1);
        expect(onDateChange.mock.calls[0][0].format(dateFormatYYYYMMDD)).toBe("19700120");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("calls consumer onKeyDown and onMouseDown handlers with the original event", () => {
        const onKeyDown = vi.fn();
        const onMouseDown = vi.fn();
        renderDatePicker({ onKeyDown, onMouseDown });

        const root = screen.getByTestId("date-picker");
        fireEvent.keyDown(root, { code: "Escape" });
        fireEvent.mouseDown(root);

        // currentTarget синтетического события React обнуляется после обработки, поэтому проверяется target.
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyDown.mock.calls[0][0].type).toBe("keydown");
        expect(onKeyDown.mock.calls[0][0].code).toBe("Escape");
        expect(onKeyDown.mock.calls[0][0].target).toBe(root);
        expect(onMouseDown).toHaveBeenCalledTimes(1);
        expect(onMouseDown.mock.calls[0][0].type).toBe("mousedown");
        expect(onMouseDown.mock.calls[0][0].target).toBe(root);
    });

    it("passes pickType to the calendar", () => {
        const onDateChange = vi.fn();
        renderDatePicker({ pickType: ECalendarPickType.MONTH_YEAR, onDateChange });
        openDropdown();

        fireEvent.click(screen.getByText("Mar"));

        expect(onDateChange).toHaveBeenCalledTimes(1);
        expect(onDateChange.mock.calls[0][0].format("YYYYMM")).toBe("197003");
    });

    it("passes disabledDays to the calendar", () => {
        renderDatePicker({ disabledDays: ["19700120"] });
        openDropdown();

        expect(screen.getByText("20").closest("td")).toHaveClass("disabled");
        expect(screen.getByText("21").closest("td")).not.toHaveClass("disabled");
    });

    it("passes footer button props of the calendar", () => {
        renderDatePicker({
            pickedDate: moment().format(dateFormatYYYYMMDD),
            yesterdayButtonProps: { "data-testid": "calendar-yesterday", children: "Yesterday" },
            todayButtonProps: { "data-testid": "calendar-today", children: "Today" },
            tomorrowButtonProps: { "data-testid": "calendar-tomorrow", children: "Tomorrow" },
        });
        openDropdown();

        expect(screen.getByTestId("calendar-yesterday")).toBeInTheDocument();
        expect(screen.getByTestId("calendar-today")).toBeInTheDocument();
        expect(screen.getByTestId("calendar-tomorrow")).toBeInTheDocument();
    });

    it("does not leak calendar props to the root element", () => {
        renderDatePicker({
            adaptiveMode: true,
            yesterdayButtonProps: { children: "Yesterday" },
            tomorrowButtonProps: { children: "Tomorrow" },
        });

        const root = screen.getByTestId("date-picker");
        expect(root).not.toHaveAttribute("yesterdaybuttonprops");
        expect(root).not.toHaveAttribute("tomorrowbuttonprops");
    });

    it("renders the mobile dropdown header target in mobile view", () => {
        setMobileView(true);
        renderDatePicker();

        openDropdown();

        expect(screen.getByTestId("dropdown-header-target")).toBeInTheDocument();
    });

    it("passes className and spreads rest props to the root element", () => {
        renderDatePicker({ className: "custom-class", id: "date-picker-id" });

        const root = screen.getByTestId("date-picker");
        expect(root).toHaveClass("custom-class");
        expect(root).toHaveAttribute("id", "date-picker-id");
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        renderDatePicker({ ref });

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("date-picker"));
    });
});
