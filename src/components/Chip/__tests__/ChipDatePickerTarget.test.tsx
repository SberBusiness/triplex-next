import React, { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChipDatePickerTarget, IChipDatePickerTargetProps } from "../ChipDatePicker/ChipDatePickerTarget";
import { DatePickerExtendedContext } from "../../DatePickerExtended/DatePickerExtendedContext";

const TargetWithContext = (props: IChipDatePickerTargetProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <DatePickerExtendedContext.Provider value={{ dropdownOpen, setDropdownOpen, mouseUsedRef: { current: false } }}>
            <ChipDatePickerTarget {...props} />
        </DatePickerExtendedContext.Provider>
    );
};

const getTarget = () => screen.getByRole("button", { name: "Выберите дату" });

describe("ChipDatePickerTarget", () => {
    it("renders an unselected target with the collapsed context state", () => {
        render(<TargetWithContext onClear={() => {}}>Выберите дату</TargetWithContext>);

        expect(getTarget()).toHaveAttribute("aria-expanded", "false");
        expect(getTarget()).not.toHaveClass("selected");
        expect(within(getTarget()).queryByRole("button")).not.toBeInTheDocument();
    });

    it("toggles the context on click and passes the original event to onClick", () => {
        const onClick = vi.fn();
        render(
            <TargetWithContext onClear={() => {}} onClick={onClick}>
                Выберите дату
            </TargetWithContext>,
        );

        fireEvent.click(getTarget());

        expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        expect(onClick).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({ type: "click", target: getTarget() }),
        );

        fireEvent.click(getTarget());

        expect(getTarget()).toHaveAttribute("aria-expanded", "false");
    });

    it.each(["Enter", "Space"])("toggles the context on %s and passes the prevented event to onKeyDown", (code) => {
        const onKeyDown = vi.fn();
        render(
            <TargetWithContext onClear={() => {}} onKeyDown={onKeyDown}>
                Выберите дату
            </TargetWithContext>,
        );

        const notPrevented = fireEvent.keyDown(getTarget(), { code });

        expect(notPrevented).toBe(false);
        expect(getTarget()).toHaveAttribute("aria-expanded", "true");
        expect(onKeyDown).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({ code, defaultPrevented: true, target: getTarget() }),
        );

        fireEvent.keyDown(getTarget(), { code });

        expect(getTarget()).toHaveAttribute("aria-expanded", "false");
    });

    it("calls the context setter before the consumer click callback", () => {
        const setDropdownOpen = vi.fn();
        const onClick = vi.fn(() => expect(setDropdownOpen).toHaveBeenCalledExactlyOnceWith(true));
        render(
            <DatePickerExtendedContext.Provider
                value={{ dropdownOpen: false, setDropdownOpen, mouseUsedRef: { current: false } }}
            >
                <ChipDatePickerTarget onClear={() => {}} onClick={onClick}>
                    Выберите дату
                </ChipDatePickerTarget>
            </DatePickerExtendedContext.Provider>,
        );

        fireEvent.click(getTarget());

        expect(onClick).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ type: "click" }));
    });

    it("clears a selected target without toggling its dropdown or bubbling the click", () => {
        const onClear = vi.fn();
        const onClick = vi.fn();
        const onContainerClick = vi.fn();
        render(
            <div onClick={onContainerClick}>
                <TargetWithContext selected onClear={onClear} onClick={onClick}>
                    Выберите дату
                </TargetWithContext>
            </div>,
        );

        expect(getTarget()).toHaveClass("selected");
        fireEvent.click(within(getTarget()).getByRole("button"));

        expect(onClear).toHaveBeenCalledExactlyOnceWith();
        expect(onClick).not.toHaveBeenCalled();
        expect(onContainerClick).not.toHaveBeenCalled();
        expect(getTarget()).toHaveAttribute("aria-expanded", "false");
    });

    it("allows a custom postfix and forwards span attributes and className", () => {
        render(
            <TargetWithContext
                selected
                onClear={() => {}}
                className="custom-target"
                id="date-target"
                aria-label="Выберите дату"
                prefix={<span>Prefix</span>}
                postfix={<span>Postfix</span>}
            />,
        );

        expect(getTarget()).toHaveClass("chip", "custom-target", "withPrefix", "withPostfix");
        expect(getTarget()).toHaveAttribute("id", "date-target");
        expect(within(getTarget()).getByText("Prefix")).toBeInTheDocument();
        expect(within(getTarget()).getByText("Postfix")).toBeInTheDocument();
        expect(within(getTarget()).queryByRole("button")).not.toBeInTheDocument();
    });

    it("forwards ref to the root span", () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(
            <ChipDatePickerTarget onClear={() => {}} ref={ref}>
                Выберите дату
            </ChipDatePickerTarget>,
        );

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(getTarget());
    });
});
