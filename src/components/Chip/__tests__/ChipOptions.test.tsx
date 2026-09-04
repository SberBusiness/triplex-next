import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChipOptions } from "../ChipOptions";
import { EChipType } from "../enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

const getChipOptions = () => screen.getByTestId("chip-options");

/** Иконка опций, отрисованная в prefix. */
const getPrefixIcon = () => getChipOptions().querySelector(".prefix svg");

/** Кнопка сброса выбора, отрисованная в postfix. */
const getClearButton = () => getChipOptions().querySelector<HTMLButtonElement>(".postfix button");

/**
 * Класс палитры на path иконки опций. Иконки кодируют paletteIndex хешированным классом,
 * поэтому сравниваем палитры состояний между собой, а не с конкретным именем класса.
 */
const getPrefixIconPaletteClassName = () => getPrefixIcon()?.querySelector("path")?.getAttribute("class");

describe("ChipOptions", () => {
    const defaultProps = {
        clearSelected: vi.fn(),
    };

    it("Should render correctly with default props and children", () => {
        render(
            <ChipOptions {...defaultProps} data-testid="chip-options">
                Test content
            </ChipOptions>,
        );

        const chipOptions = getChipOptions();
        expect(chipOptions).toBeInTheDocument();
        expect(chipOptions).toHaveTextContent("Test content");
    });

    it("Should apply size prop correctly", () => {
        const { rerender } = render(
            <ChipOptions {...defaultProps} size={EComponentSize.SM} data-testid="chip-options">
                Options
            </ChipOptions>,
        );

        let chipOptions = getChipOptions();
        expect(chipOptions).toHaveClass("sm");

        rerender(
            <ChipOptions {...defaultProps} size={EComponentSize.MD} data-testid="chip-options">
                Options
            </ChipOptions>,
        );

        chipOptions = getChipOptions();
        expect(chipOptions).toHaveClass("md");

        rerender(
            <ChipOptions {...defaultProps} size={EComponentSize.LG} data-testid="chip-options">
                Options
            </ChipOptions>,
        );

        chipOptions = getChipOptions();
        expect(chipOptions).toHaveClass("lg");
    });

    it("Should apply type prop correctly", () => {
        const { rerender } = render(
            <ChipOptions {...defaultProps} type={EChipType.TYPE_1} data-testid="chip-options">
                Options
            </ChipOptions>,
        );

        expect(getChipOptions()).toHaveClass("type1");

        rerender(
            <ChipOptions {...defaultProps} type={EChipType.TYPE_2} data-testid="chip-options">
                Options
            </ChipOptions>,
        );

        expect(getChipOptions()).toHaveClass("type2");
    });

    it("Should merge custom className and pass rest props to the root element", () => {
        render(
            <ChipOptions {...defaultProps} className="custom-class" id="chip-id" data-testid="chip-options">
                Options
            </ChipOptions>,
        );

        const chipOptions = getChipOptions();
        expect(chipOptions).toHaveClass("custom-class", "chip");
        expect(chipOptions).toHaveAttribute("id", "chip-id");
    });

    it("Should mark chip as selected and disabled", () => {
        render(<ChipOptions {...defaultProps} selected disabled data-testid="chip-options" />);

        const chipOptions = getChipOptions();
        expect(chipOptions).toHaveClass("selected", "disabled");
        expect(chipOptions).toHaveAttribute("tabindex", "-1");
    });

    describe("content", () => {
        it("Should wrap children into content element", () => {
            render(
                <ChipOptions {...defaultProps} data-testid="chip-options">
                    Options
                </ChipOptions>,
            );

            const content = getChipOptions().querySelector(".chipOptionsContent");
            expect(content).toBeInTheDocument();
            expect(content).toHaveTextContent("Options");
        });

        it("Should wrap zero children into content element", () => {
            render(
                <ChipOptions {...defaultProps} data-testid="chip-options">
                    {0}
                </ChipOptions>,
            );

            const content = getChipOptions().querySelector(".chipOptionsContent");
            expect(content).toBeInTheDocument();
            expect(content).toHaveTextContent("0");
        });

        it("Should not render content element without children", () => {
            render(<ChipOptions {...defaultProps} data-testid="chip-options" />);

            expect(getChipOptions().querySelector(".chipOptionsContent")).not.toBeInTheDocument();
        });
    });

    describe("prefix", () => {
        it("Should always render options icon", () => {
            const { rerender } = render(<ChipOptions {...defaultProps} data-testid="chip-options" />);

            expect(getPrefixIcon()).toBeInTheDocument();
            expect(getChipOptions()).toHaveClass("withPrefix");

            rerender(<ChipOptions {...defaultProps} selected data-testid="chip-options" />);

            expect(getPrefixIcon()).toBeInTheDocument();
            expect(getChipOptions()).toHaveClass("withPrefix");
        });

        it("Should use different icon palette in selected state", () => {
            const { rerender } = render(<ChipOptions {...defaultProps} data-testid="chip-options" />);

            const defaultPaletteClassName = getPrefixIconPaletteClassName();

            rerender(<ChipOptions {...defaultProps} selected data-testid="chip-options" />);

            const selectedPaletteClassName = getPrefixIconPaletteClassName();

            expect(defaultPaletteClassName).toBeTruthy();
            expect(selectedPaletteClassName).toBeTruthy();
            expect(selectedPaletteClassName).not.toBe(defaultPaletteClassName);
        });
    });

    describe("postfix", () => {
        it("Should render clear button only in selected state", () => {
            const { rerender } = render(<ChipOptions {...defaultProps} data-testid="chip-options" />);

            expect(getClearButton()).not.toBeInTheDocument();

            rerender(<ChipOptions {...defaultProps} selected data-testid="chip-options" />);

            expect(getClearButton()).toBeInTheDocument();
        });

        it("Should keep withPostfix class in both states to preserve paddings", () => {
            const { rerender } = render(<ChipOptions {...defaultProps} data-testid="chip-options" />);

            expect(getChipOptions()).toHaveClass("withPostfix");

            rerender(<ChipOptions {...defaultProps} selected data-testid="chip-options" />);

            expect(getChipOptions()).toHaveClass("withPostfix");
        });

        it.each([
            [EComponentSize.SM, "CrossStrokeSrvIcon16"],
            [EComponentSize.MD, "CrossStrokeSrvIcon20"],
            [EComponentSize.LG, "CrossStrokeSrvIcon24"],
        ])("Should render clear button icon matching size %s", (size, iconName) => {
            render(<ChipOptions {...defaultProps} selected size={size} data-testid="chip-options" />);

            expect(getClearButton()?.querySelector("svg")).toHaveAttribute("name", iconName);
        });
    });

    describe("clearSelected", () => {
        it("Should call clearSelected on clear button click", () => {
            const clearSelected = vi.fn();

            render(<ChipOptions clearSelected={clearSelected} selected data-testid="chip-options" />);

            fireEvent.click(getClearButton()!);

            expect(clearSelected).toHaveBeenCalledTimes(1);
            expect(clearSelected).toHaveBeenCalledWith();
        });

        it("Should not trigger chip onClick on clear button click", () => {
            const clearSelected = vi.fn();
            const onClick = vi.fn();

            render(<ChipOptions clearSelected={clearSelected} onClick={onClick} selected data-testid="chip-options" />);

            fireEvent.click(getClearButton()!);

            expect(clearSelected).toHaveBeenCalledTimes(1);
            expect(onClick).not.toHaveBeenCalled();
        });

        it("Should not call clearSelected on chip click", () => {
            const clearSelected = vi.fn();
            const onClick = vi.fn();

            render(<ChipOptions clearSelected={clearSelected} onClick={onClick} selected data-testid="chip-options" />);

            fireEvent.click(getChipOptions());

            expect(onClick).toHaveBeenCalledTimes(1);
            expect(clearSelected).not.toHaveBeenCalled();
        });
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLSpanElement>();

        render(
            <ChipOptions {...defaultProps} ref={ref} data-testid="chip-options">
                Options
            </ChipOptions>,
        );

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(screen.getByTestId("chip-options"));
    });
});
