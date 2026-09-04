import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MultiselectFieldDropdownFooter } from "../components/MultiselectFieldDropdownFooter";

describe("MultiselectFieldDropdownFooter", () => {
    it("Should render children", () => {
        render(
            <MultiselectFieldDropdownFooter data-testid="footer">
                <button data-testid="submit">Submit</button>
            </MultiselectFieldDropdownFooter>,
        );

        expect(screen.getByTestId("submit")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toHaveClass("multiselectFieldFooter");
    });

    it("Should merge custom className", () => {
        render(
            <MultiselectFieldDropdownFooter className="custom-footer" data-testid="footer">
                Footer
            </MultiselectFieldDropdownFooter>,
        );

        expect(screen.getByTestId("footer")).toHaveClass("multiselectFieldFooter", "custom-footer");
    });

    it("Should pass through unknown html attributes", () => {
        render(
            <MultiselectFieldDropdownFooter id="footer-id" data-testid="footer">
                Footer
            </MultiselectFieldDropdownFooter>,
        );

        expect(screen.getByTestId("footer")).toHaveAttribute("id", "footer-id");
    });
});
