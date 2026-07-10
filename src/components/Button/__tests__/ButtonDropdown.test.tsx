import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ButtonDropdown } from "../ButtonDropdown";
import { EButtonTheme } from "../enums";
import { EComponentSize } from "../../../enums/EComponentSize";

const options = [
    { id: "opt-1", label: "Option 1" },
    { id: "opt-2", label: "Option 2" },
];

describe("ButtonDropdown", () => {
    it("renders options when opened", () => {
        render(
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options}>
                Actions
            </ButtonDropdown>,
        );
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("passes dropdownAttributes to the dropdown element", () => {
        render(
            <ButtonDropdown
                theme={EButtonTheme.GENERAL}
                size={EComponentSize.MD}
                options={options}
                dropdownAttributes={{
                    id: "button-dropdown-menu",
                    className: "custom-dropdown",
                    style: { zIndex: 1500 },
                    "data-testid": "dropdown-menu",
                }}
            >
                Actions
            </ButtonDropdown>,
        );
        fireEvent.click(screen.getByRole("button"));

        const dropdown = document.getElementById("button-dropdown-menu");
        expect(dropdown).not.toBeNull();
        expect(dropdown).toHaveClass("custom-dropdown");
        expect(dropdown).toHaveStyle("z-index: 1500");
        expect(dropdown).toHaveAttribute("data-testid", "dropdown-menu");
    });
});
