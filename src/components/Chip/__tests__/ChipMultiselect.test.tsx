import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import { ChipMultiselect } from "../ChipMultiselect";
import { EChipType } from "../enums";

const getMultiselectField = () => screen.getByTestId("multiselect-field");
/** Поле выбора — Chip, отрисованный ChipMultiselect в renderTarget. */
const getTarget = () => screen.getByRole("listbox");
/** Кнопка сброса выбора. Единственный button в разметке: у Chip role переопределён на listbox. */
const getClearButton = () => screen.getByRole("button");

describe("ChipMultiselect", () => {
    const clearSelected = vi.fn();
    /** Выпадающий блок рендерится только когда список открыт — по нему видно состояние открытости. */
    const renderDropdown = ({ opened }: { opened: boolean }) =>
        opened ? <div data-testid="dropdown">Dropdown</div> : null;

    const defaultProps = {
        clearSelected,
        label: "Выберите опции",
        children: renderDropdown,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should render correctly with basic props", () => {
        render(<ChipMultiselect {...defaultProps} data-testid="multiselect-field" />);

        const multiselectField = getMultiselectField();

        expect(multiselectField).toBeInTheDocument();
        expect(multiselectField).toHaveClass("chipGroupItem");
        expect(multiselectField).toHaveTextContent("Выберите опции");
    });

    it("Should merge custom className into the root element", () => {
        render(<ChipMultiselect {...defaultProps} className="custom-class" data-testid="multiselect-field" />);

        const multiselectField = getMultiselectField();

        expect(multiselectField).toHaveClass("chipGroupItem");
        expect(multiselectField).toHaveClass("custom-class");
    });

    it("Should render displayedValue when selected and displayedValue is provided", () => {
        render(
            <ChipMultiselect
                {...defaultProps}
                selected={true}
                displayedValue="Выбрано 3"
                data-testid="multiselect-field"
            />,
        );

        const multiselectField = getMultiselectField();

        expect(multiselectField).toHaveTextContent("Выбрано 3");
    });

    it("Should render label when selected but displayedValue is not provided", () => {
        render(<ChipMultiselect {...defaultProps} selected={true} data-testid="multiselect-field" />);

        const multiselectField = getMultiselectField();
        expect(multiselectField).toHaveTextContent("Выберите опции");
    });

    it("Should render label and ignore displayedValue when nothing is selected", () => {
        render(<ChipMultiselect {...defaultProps} displayedValue="Выбрано 3" data-testid="multiselect-field" />);

        const multiselectField = getMultiselectField();

        expect(multiselectField).toHaveTextContent("Выберите опции");
        expect(multiselectField).not.toHaveTextContent("Выбрано 3");
    });

    it("Should apply size prop correctly", () => {
        const { rerender } = render(
            <ChipMultiselect {...defaultProps} size={EComponentSize.SM} data-testid="multiselect-field" />,
        );

        let multiselectField = getMultiselectField();
        expect(multiselectField.querySelector("span")).toHaveClass("sm");

        rerender(<ChipMultiselect {...defaultProps} size={EComponentSize.MD} data-testid="multiselect-field" />);
        multiselectField = getMultiselectField();
        expect(multiselectField.querySelector("span")).toHaveClass("md");

        rerender(<ChipMultiselect {...defaultProps} size={EComponentSize.LG} data-testid="multiselect-field" />);
        multiselectField = getMultiselectField();
        expect(multiselectField.querySelector("span")).toHaveClass("lg");
    });

    it("Should apply type prop to the target", () => {
        const { rerender } = render(<ChipMultiselect {...defaultProps} type={EChipType.TYPE_1} />);

        expect(getTarget()).toHaveClass("type1");

        rerender(<ChipMultiselect {...defaultProps} type={EChipType.TYPE_2} />);
        expect(getTarget()).toHaveClass("type2");
    });

    it("Should mark the target as selected", () => {
        const { rerender } = render(<ChipMultiselect {...defaultProps} />);

        expect(getTarget()).not.toHaveClass("selected");

        rerender(<ChipMultiselect {...defaultProps} selected={true} />);
        expect(getTarget()).toHaveClass("selected");
    });

    // Chip не блокирует onClick при disabled — он лишь снимает элемент с таба и красит его.
    // Тест фиксирует ровно это, не заявляя, что disabled блокирует открытие списка.
    it("Should pass disabled to the target: class and tab order", () => {
        render(<ChipMultiselect {...defaultProps} disabled={true} />);

        const target = getTarget();

        expect(target).toHaveClass("disabled");
        expect(target).toHaveAttribute("tabindex", "-1");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ChipMultiselect {...defaultProps} ref={ref} data-testid="multiselect-field" />);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(getMultiselectField().querySelector("span"));
    });

    describe("Target", () => {
        it("Should render collapsed listbox target by default", () => {
            render(<ChipMultiselect {...defaultProps} />);

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        });

        it("Should toggle the dropdown on click", () => {
            render(<ChipMultiselect {...defaultProps} />);

            fireEvent.click(getTarget());

            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
            expect(screen.getByTestId("dropdown")).toBeInTheDocument();

            fireEvent.click(getTarget());

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        });

        it.each([["Enter"], ["Space"]])("Should toggle the dropdown on %s", (code) => {
            render(<ChipMultiselect {...defaultProps} />);

            fireEvent.keyDown(getTarget(), { code });

            expect(getTarget()).toHaveAttribute("aria-expanded", "true");
            expect(screen.getByTestId("dropdown")).toBeInTheDocument();

            fireEvent.keyDown(getTarget(), { code });

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        });

        it("Should not open the dropdown on other keys", () => {
            render(<ChipMultiselect {...defaultProps} />);

            fireEvent.keyDown(getTarget(), { code: "KeyA" });

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        });
    });

    describe("Clear button", () => {
        it("Should render the clear button only when selected", () => {
            const { rerender } = render(<ChipMultiselect {...defaultProps} />);

            expect(screen.queryByRole("button")).not.toBeInTheDocument();

            rerender(<ChipMultiselect {...defaultProps} selected={true} />);
            expect(getClearButton()).toBeInTheDocument();
        });

        it("Should call clearSelected on click without opening the dropdown", () => {
            render(<ChipMultiselect {...defaultProps} selected={true} />);

            fireEvent.click(getClearButton());

            expect(clearSelected).toHaveBeenCalledTimes(1);
            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        });

        it.each([
            ["Enter", "{Enter}"],
            ["Space", " "],
        ])("Should call clearSelected on %s without opening the dropdown", async (_code, key) => {
            const user = userEvent.setup();
            render(<ChipMultiselect {...defaultProps} selected={true} />);

            // Кнопка сброса — нативный button, поэтому Enter/Space активируют её кликом.
            getClearButton().focus();
            await user.keyboard(key);

            expect(clearSelected).toHaveBeenCalledTimes(1);
            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        });

        it.each([["Enter"], ["Space"]])("Should not open the dropdown on %s over the clear button", (code) => {
            render(<ChipMultiselect {...defaultProps} selected={true} />);

            fireEvent.keyDown(getClearButton(), { code });

            expect(getTarget()).toHaveAttribute("aria-expanded", "false");
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
        });

        it.each([["Enter"], ["Space"]])("Should stop %s from propagating out of the clear button", (code) => {
            const onKeyDown = vi.fn();
            render(<ChipMultiselect {...defaultProps} selected={true} onKeyDown={onKeyDown} />);

            fireEvent.keyDown(getClearButton(), { code });

            expect(onKeyDown).not.toHaveBeenCalled();
        });

        it("Should let other keys propagate out of the clear button", () => {
            const onKeyDown = vi.fn();
            render(<ChipMultiselect {...defaultProps} selected={true} onKeyDown={onKeyDown} />);

            fireEvent.keyDown(getClearButton(), { code: "KeyA" });

            expect(onKeyDown).toHaveBeenCalledTimes(1);
        });
    });
});
