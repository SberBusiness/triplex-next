import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChipOptions } from "../ChipOptions";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

const getChipOptions = () => screen.getByTestId("chip-options");

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
