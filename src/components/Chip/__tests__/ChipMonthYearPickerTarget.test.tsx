import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ChipMonthYearPickerTarget, IChipMonthYearPickerTargetProps } from "../ChipMonthYearPicker";
import { DatePickerExtendedContext } from "../../DatePickerExtended/DatePickerExtendedContext";

const getTarget = () => screen.getByRole("button", { name: "Отчётный месяц" });
const getClearButton = () => within(getTarget()).getByRole("button", { name: "Очистить месяц" });

const renderTarget = (
    props: Partial<IChipMonthYearPickerTargetProps> = {},
    dropdownOpen = false,
    ref?: React.Ref<HTMLSpanElement>,
) => {
    const setDropdownOpen = vi.fn();

    render(
        <DatePickerExtendedContext.Provider value={{ dropdownOpen, setDropdownOpen, mouseUsedRef: { current: false } }}>
            <ChipMonthYearPickerTarget
                aria-label="Отчётный месяц"
                onClear={() => {}}
                clearButtonProps={{ "aria-label": "Очистить месяц" }}
                {...props}
                ref={ref}
            >
                Январь 2024
            </ChipMonthYearPickerTarget>
        </DatePickerExtendedContext.Provider>,
    );

    return setDropdownOpen;
};

describe("ChipMonthYearPickerTarget", () => {
    it("forwards ref, className and HTML attributes to the target span", () => {
        const ref = React.createRef<HTMLSpanElement>();
        renderTarget({ className: "custom-target", title: "Период отчёта", "data-period": "month" }, false, ref);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(getTarget());
        expect(getTarget()).toHaveClass("chip", "custom-target");
        expect(getTarget()).toHaveAttribute("title", "Период отчёта");
        expect(getTarget()).toHaveAttribute("data-period", "month");
        expect(getTarget()).toHaveAttribute("tabindex", "0");
    });

    it("uses selected independently from children to show the clear button", () => {
        renderTarget({ selected: true });

        expect(getTarget()).toHaveTextContent("Январь 2024");
        expect(getTarget()).toHaveClass("selected");
        expect(getClearButton()).toBeInTheDocument();
    });

    it.each([false, true])("click toggles context from %s and forwards the mouse event", (dropdownOpen) => {
        const onClick = vi.fn();
        const setDropdownOpen = renderTarget({ onClick }, dropdownOpen);

        fireEvent.click(getTarget());

        expect(setDropdownOpen).toHaveBeenCalledWith(!dropdownOpen);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click", target: getTarget() }));
        expect(setDropdownOpen.mock.invocationCallOrder[0]).toBeLessThan(onClick.mock.invocationCallOrder[0]);
    });

    it.each(["Enter", "Space"])("%s prevents default, toggles context and forwards the keyboard event", (code) => {
        const onKeyDown = vi.fn();
        const setDropdownOpen = renderTarget({ onKeyDown });

        expect(fireEvent.keyDown(getTarget(), { code })).toBe(false);

        expect(setDropdownOpen).toHaveBeenCalledWith(true);
        expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ code, defaultPrevented: true }));
        expect(setDropdownOpen.mock.invocationCallOrder[0]).toBeLessThan(onKeyDown.mock.invocationCallOrder[0]);
    });

    it("forwards other keys without changing context", () => {
        const onKeyDown = vi.fn();
        const setDropdownOpen = renderTarget({ onKeyDown });

        fireEvent.keyDown(getTarget(), { code: "ArrowDown" });

        expect(setDropdownOpen).not.toHaveBeenCalled();
        expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ code: "ArrowDown" }));
    });

    it("ignores a dispatched click when disabled and disables the native clear button", () => {
        const onClick = vi.fn();
        const onClear = vi.fn();
        const setDropdownOpen = renderTarget({ selected: true, disabled: true, onClick, onClear });

        fireEvent.click(getTarget());
        fireEvent.click(getClearButton());

        expect(getTarget()).toHaveAttribute("tabindex", "-1");
        expect(getClearButton()).toBeDisabled();
        expect(setDropdownOpen).not.toHaveBeenCalled();
        expect(onClick).not.toHaveBeenCalled();
        expect(onClear).not.toHaveBeenCalled();
    });

    it.each(["Enter", "Space", "ArrowDown"])("disabled target forwards %s without switching context", (code) => {
        const onKeyDown = vi.fn();
        const setDropdownOpen = renderTarget({ disabled: true, onKeyDown });

        fireEvent.keyDown(getTarget(), { code });

        expect(setDropdownOpen).not.toHaveBeenCalled();
        expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ code }));
    });

    it("clear click calls onClear without arguments and does not reach the target", async () => {
        const onClear = vi.fn();
        const onClick = vi.fn();
        const setDropdownOpen = renderTarget({ selected: true, onClear, onClick });

        await userEvent.click(getClearButton());

        expect(onClear).toHaveBeenCalledExactlyOnceWith();
        expect(onClick).not.toHaveBeenCalled();
        expect(setDropdownOpen).not.toHaveBeenCalled();
    });

    it.each(["{Enter}", " "])("clear button activation by %s does not reach the target", async (key) => {
        const onClear = vi.fn();
        const onClick = vi.fn();
        const onKeyDown = vi.fn();
        const setDropdownOpen = renderTarget({ selected: true, onClear, onClick, onKeyDown });

        getClearButton().focus();
        await userEvent.keyboard(key);

        expect(onClear).toHaveBeenCalledExactlyOnceWith();
        expect(onClick).not.toHaveBeenCalled();
        expect(onKeyDown).not.toHaveBeenCalled();
        expect(setDropdownOpen).not.toHaveBeenCalled();
    });

    it("forwards clearButtonProps attributes and unrelated handlers to the clear button", async () => {
        const onFocus = vi.fn();
        renderTarget({
            selected: true,
            clearButtonProps: { "aria-label": "Очистить месяц", title: "Сбросить период", onFocus },
        });

        await userEvent.tab();
        await userEvent.tab();

        expect(getClearButton()).toHaveFocus();
        expect(getClearButton()).toHaveAttribute("title", "Сбросить период");
        expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ type: "focus" }));
    });

    it("preserves explicit postfix and aria-expanded overrides", () => {
        renderTarget({ selected: true, postfix: <span>Свой постфикс</span>, "aria-expanded": true });

        expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        expect(getTarget()).toHaveTextContent("Свой постфикс");
        expect(within(getTarget()).queryByRole("button")).not.toBeInTheDocument();
    });
});
