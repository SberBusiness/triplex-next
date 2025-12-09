import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChipMultiselect } from "../ChipMultiselect";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

const getMultiselectField = () => screen.getByTestId("multiselect-field");

describe("ChipMultiselect", () => {
    const defaultProps = {
        clearSelected: vi.fn(),
        label: "Выберите опции",
        children: () => null,
    };

    it("Should render correctly with basic props", () => {
        render(<ChipMultiselect {...defaultProps} data-testid="multiselect-field" />);

        const multiselectField = getMultiselectField();

        expect(multiselectField).toBeInTheDocument();
        expect(multiselectField).toHaveClass("chipGroupItem");
        expect(multiselectField).toHaveTextContent("Выберите опции");
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

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ChipMultiselect {...defaultProps} ref={ref} data-testid="multiselect-field" />);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(getMultiselectField().querySelector("span"));
    });
});
