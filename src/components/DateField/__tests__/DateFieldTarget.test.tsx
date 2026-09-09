import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach, type Mock } from "vitest";
import { DateFieldTarget } from "../DateFieldTarget";
import { DateFieldContext } from "../DateFieldContext";
import { DatePickerExtendedContext } from "../../DatePickerExtended/DatePickerExtendedContext";
import { FormFieldMaskedInput } from "../../FormField/components/FormFieldMaskedInput";
import { useMobileView } from "../../MobileView/useMobileView";
import { IDateFieldTargetProps } from "../types";
import { EComponentSize } from "../../../enums";
import { EFormFieldStatus } from "../../FormField/enums";

vi.mock("@sberbusiness/icons-next", () => ({
    CalendarStrokeSrvIcon16: () => <span data-testid="calendar-icon" />,
    CalendarStrokeSrvIcon20: () => <span data-testid="calendar-icon" />,
    CalendarStrokeSrvIcon24: () => <span data-testid="calendar-icon" />,
    CrossStrokeSrvIcon16: () => <span data-testid="cross-icon" />,
}));

vi.mock("../../MobileView/useMobileView", () => ({
    useMobileView: vi.fn(() => false),
}));

/** Свойства поля ввода с маской, обязательные для рендера DateFieldTarget. */
const requiredMaskedInputProps = {
    value: "",
    mask: FormFieldMaskedInput.presets.masks.date,
    placeholderMask: FormFieldMaskedInput.presets.placeholderMasks.date,
};

/** Опции рендера: свойства компонента и значения обоих контекстов. */
interface IRenderOptions extends Partial<Omit<IDateFieldTargetProps, "maskedInputProps">> {
    /** Свойства поля ввода с маской, дополняющие обязательные. */
    maskedInputProps?: Partial<IDateFieldTargetProps["maskedInputProps"]>;
    /** Значение dropdownOpen в DatePickerExtendedContext. */
    dropdownOpen?: boolean;
    /** Ссылка на корневой элемент. */
    targetRef?: React.Ref<HTMLDivElement>;
}

describe("DateFieldTarget", () => {
    const setDropdownOpen = vi.fn();
    const triggerChangeFromInput = vi.fn();
    const onChange = vi.fn();
    const useMobileViewMock = useMobileView as Mock;
    let inputFocusedRef: React.MutableRefObject<boolean | null>;

    const renderTarget = ({ maskedInputProps, dropdownOpen = false, targetRef, ...props }: IRenderOptions = {}) =>
        render(
            <DatePickerExtendedContext.Provider
                value={{ dropdownOpen, setDropdownOpen, mouseUsedRef: { current: false } }}
            >
                <DateFieldContext.Provider value={{ inputFocusedRef, onChange, triggerChangeFromInput }}>
                    <DateFieldTarget
                        maskedInputProps={{ ...requiredMaskedInputProps, ...maskedInputProps }}
                        {...props}
                        ref={targetRef}
                    />
                </DateFieldContext.Provider>
            </DatePickerExtendedContext.Provider>,
        );

    /** Возвращает поле ввода даты. */
    const getInput = () => screen.getByRole("textbox");

    /** Возвращает кнопку-иконку календаря. */
    const getCalendarButton = () => {
        const button = screen.getByTestId("calendar-icon").closest("button");

        if (button === null) {
            throw new Error("Calendar button not found");
        }

        return button;
    };

    beforeEach(() => {
        vi.clearAllMocks();
        useMobileViewMock.mockReturnValue(false);
        inputFocusedRef = { current: false };
    });

    it("renders the input and the calendar button", () => {
        renderTarget();

        expect(getInput()).toBeInTheDocument();
        expect(getCalendarButton()).toBeInTheDocument();
    });

    describe("focus and blur", () => {
        it("marks the input as focused in the context on focus", () => {
            renderTarget();

            fireEvent.focus(getInput());

            expect(inputFocusedRef.current).toBe(true);
        });

        it("marks the input as not focused in the context on blur", () => {
            renderTarget();
            const input = getInput();

            fireEvent.focus(input);
            fireEvent.blur(input);

            expect(inputFocusedRef.current).toBe(false);
        });

        it("fixes the typed value on blur when the dropdown is closed", () => {
            renderTarget({ dropdownOpen: false });

            fireEvent.blur(getInput());

            expect(triggerChangeFromInput).toHaveBeenCalledTimes(1);
        });

        it("does not fix the typed value on blur when the dropdown is open", () => {
            // Фокус уходит в открытый календарь, значение фиксируется на его закрытии.
            renderTarget({ dropdownOpen: true });

            fireEvent.blur(getInput());

            expect(triggerChangeFromInput).not.toHaveBeenCalled();
        });

        it("calls the passed onFocus after setting the focused flag", () => {
            const handleFocus = vi.fn(() => {
                expect(inputFocusedRef.current).toBe(true);
            });
            renderTarget({ maskedInputProps: { onFocus: handleFocus } });

            fireEvent.focus(getInput());

            expect(handleFocus).toHaveBeenCalledTimes(1);
            expect(handleFocus).toHaveBeenCalledWith(expect.objectContaining({ type: "focus" }));
        });

        it("calls the passed onBlur after the internal handler", () => {
            const handleBlur = vi.fn(() => {
                expect(inputFocusedRef.current).toBe(false);
            });
            renderTarget({ maskedInputProps: { onBlur: handleBlur } });

            fireEvent.blur(getInput());

            expect(triggerChangeFromInput).toHaveBeenCalledTimes(1);
            expect(handleBlur).toHaveBeenCalledTimes(1);
            expect(triggerChangeFromInput.mock.invocationCallOrder[0]).toBeLessThan(
                handleBlur.mock.invocationCallOrder[0],
            );
        });
    });

    describe("mouse down on the input", () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        /** Выполняет отложенное открытие выпадающего календаря. */
        const runOpenTimeout = () =>
            act(() => {
                vi.runAllTimers();
            });

        it("opens the dropdown when it is closed", () => {
            renderTarget({ dropdownOpen: false });

            fireEvent.mouseDown(getInput());
            runOpenTimeout();

            expect(setDropdownOpen).toHaveBeenCalledTimes(1);
            expect(setDropdownOpen).toHaveBeenCalledWith(true);
        });

        it("does not open the dropdown when it is already open", () => {
            renderTarget({ dropdownOpen: true });

            fireEvent.mouseDown(getInput());
            runOpenTimeout();

            expect(setDropdownOpen).not.toHaveBeenCalled();
        });

        it("does not prevent focusing the input on desktop", () => {
            renderTarget({ dropdownOpen: false });

            // fireEvent возвращает результат dispatchEvent: true — значит preventDefault не вызывался.
            expect(fireEvent.mouseDown(getInput())).toBe(true);
            runOpenTimeout();

            expect(setDropdownOpen).toHaveBeenCalledWith(true);
        });

        it("prevents focusing the input on mobile and still opens the dropdown", () => {
            useMobileViewMock.mockReturnValue(true);
            renderTarget({ dropdownOpen: false });

            // fireEvent возвращает результат dispatchEvent: false — значит был preventDefault.
            expect(fireEvent.mouseDown(getInput())).toBe(false);
            runOpenTimeout();

            expect(setDropdownOpen).toHaveBeenCalledWith(true);
        });

        it("does not prevent focusing the input on mobile when the dropdown is already open", () => {
            useMobileViewMock.mockReturnValue(true);
            renderTarget({ dropdownOpen: true });

            expect(fireEvent.mouseDown(getInput())).toBe(true);
        });

        it("calls the passed onMouseDown after the internal handler", () => {
            useMobileViewMock.mockReturnValue(true);
            const handleMouseDown = vi.fn((event: React.MouseEvent<HTMLInputElement>) => {
                // Внутренний обработчик уже вызвал preventDefault.
                expect(event.defaultPrevented).toBe(true);
            });
            renderTarget({ dropdownOpen: false, maskedInputProps: { onMouseDown: handleMouseDown } });

            fireEvent.mouseDown(getInput());
            runOpenTimeout();

            expect(handleMouseDown).toHaveBeenCalledTimes(1);
            expect(setDropdownOpen).toHaveBeenCalledWith(true);
        });
    });

    describe("keyboard", () => {
        it("opens the closed dropdown on Enter", () => {
            renderTarget({ dropdownOpen: false });

            fireEvent.keyDown(getInput(), { code: "Enter" });

            expect(setDropdownOpen).toHaveBeenCalledWith(true);
        });

        it("closes the open dropdown on Enter", () => {
            renderTarget({ dropdownOpen: true });

            fireEvent.keyDown(getInput(), { code: "Enter" });

            expect(setDropdownOpen).toHaveBeenCalledWith(false);
        });

        it("does not prevent the default input on Enter", () => {
            renderTarget();

            expect(fireEvent.keyDown(getInput(), { code: "Enter" })).toBe(true);
        });

        it("opens the closed dropdown on Space and prevents the default input", () => {
            renderTarget({ dropdownOpen: false });

            // fireEvent возвращает результат dispatchEvent: false — значит был preventDefault.
            expect(fireEvent.keyDown(getInput(), { code: "Space" })).toBe(false);
            expect(setDropdownOpen).toHaveBeenCalledWith(true);
        });

        it("closes the open dropdown on Space", () => {
            renderTarget({ dropdownOpen: true });

            fireEvent.keyDown(getInput(), { code: "Space" });

            expect(setDropdownOpen).toHaveBeenCalledWith(false);
        });

        it("ignores other keys", () => {
            renderTarget();

            expect(fireEvent.keyDown(getInput(), { code: "KeyA" })).toBe(true);
            expect(fireEvent.keyDown(getInput(), { code: "Escape" })).toBe(true);
            expect(setDropdownOpen).not.toHaveBeenCalled();
        });

        it("calls the passed onKeyDown after the internal handler", () => {
            const handleKeyDown = vi.fn((event: React.KeyboardEvent<HTMLInputElement>) => {
                // Внутренний обработчик уже вызвал preventDefault.
                expect(event.defaultPrevented).toBe(true);
            });
            renderTarget({ maskedInputProps: { onKeyDown: handleKeyDown } });

            fireEvent.keyDown(getInput(), { code: "Space" });

            expect(handleKeyDown).toHaveBeenCalledTimes(1);
            expect(setDropdownOpen).toHaveBeenCalledTimes(1);
            expect(setDropdownOpen.mock.invocationCallOrder[0]).toBeLessThan(handleKeyDown.mock.invocationCallOrder[0]);
        });

        it("calls the passed onKeyDown on keys the component ignores", () => {
            const handleKeyDown = vi.fn();
            renderTarget({ maskedInputProps: { onKeyDown: handleKeyDown } });

            fireEvent.keyDown(getInput(), { code: "KeyA" });

            expect(handleKeyDown).toHaveBeenCalledTimes(1);
            expect(setDropdownOpen).not.toHaveBeenCalled();
        });
    });

    describe("calendar button", () => {
        it("opens the closed dropdown on click", () => {
            renderTarget({ dropdownOpen: false });

            fireEvent.click(getCalendarButton());

            expect(setDropdownOpen).toHaveBeenCalledWith(true);
        });

        it("closes the open dropdown on click", () => {
            renderTarget({ dropdownOpen: true });

            fireEvent.click(getCalendarButton());

            expect(setDropdownOpen).toHaveBeenCalledWith(false);
        });

        it("is disabled when the field status is disabled", () => {
            renderTarget({ status: EFormFieldStatus.DISABLED });

            expect(getCalendarButton()).toBeDisabled();
        });
    });

    describe("clear button", () => {
        it("is not rendered without onClear", () => {
            renderTarget();

            expect(screen.queryByTestId("cross-icon")).not.toBeInTheDocument();
        });

        it("calls onClear on click", () => {
            const handleClear = vi.fn();
            renderTarget({ onClear: handleClear });

            fireEvent.click(screen.getByTestId("cross-icon").closest("button") as HTMLButtonElement);

            expect(handleClear).toHaveBeenCalledTimes(1);
        });
    });

    describe("class names", () => {
        it("merges the passed className with the internal one", () => {
            const ref = React.createRef<HTMLDivElement>();

            renderTarget({ className: "custom-class", targetRef: ref });

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current).toHaveClass("dateFieldTarget", "custom-class");
        });

        it("merges the passed input className with the size one", () => {
            renderTarget({
                size: EComponentSize.SM,
                maskedInputProps: { className: "custom-input-class" },
            });

            expect(getInput().closest(".minWidthSM")).toHaveClass("custom-input-class");
        });

        it("applies the min width class of the default size", () => {
            renderTarget();

            expect(getInput().closest(".minWidthMD")).toBeInTheDocument();
        });

        it("renders the postfix passed from outside", () => {
            renderTarget({ postfix: <span data-testid="custom-postfix" /> });

            expect(screen.getByTestId("custom-postfix")).toBeInTheDocument();
            expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
        });
    });
});
