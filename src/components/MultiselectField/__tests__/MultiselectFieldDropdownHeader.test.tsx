import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MultiselectFieldDropdownHeader } from "../components/MultiselectFieldDropdownHeader";

describe("MultiselectFieldDropdownHeader", () => {
    it("Should render children", () => {
        render(
            <MultiselectFieldDropdownHeader data-testid="header">
                <span data-testid="filter">Filter</span>
            </MultiselectFieldDropdownHeader>,
        );

        expect(screen.getByTestId("filter")).toBeInTheDocument();
        expect(screen.getByTestId("header")).toHaveClass("multiselectFieldHeader");
    });

    it("Should merge custom className", () => {
        render(
            <MultiselectFieldDropdownHeader className="custom-header" data-testid="header">
                Header
            </MultiselectFieldDropdownHeader>,
        );

        expect(screen.getByTestId("header")).toHaveClass("multiselectFieldHeader", "custom-header");
    });

    it("Should pass through unknown html attributes", () => {
        render(
            <MultiselectFieldDropdownHeader id="header-id" data-testid="header">
                Header
            </MultiselectFieldDropdownHeader>,
        );

        expect(screen.getByTestId("header")).toHaveAttribute("id", "header-id");
    });
});
