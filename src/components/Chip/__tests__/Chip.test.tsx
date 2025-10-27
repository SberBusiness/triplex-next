import React from "react";
import { render, screen } from "@testing-library/react";
import { Chip } from "@sberbusiness/triplex-next/components/Chip/Chip";

describe("Chip", () => {
    test("renders content and role button", () => {
        render(<Chip>Label</Chip>);
        const chip = screen.getByRole("button");
        expect(chip).toBeInTheDocument();
        expect(chip).toHaveTextContent("Label");
        expect(chip).toHaveAttribute("tabindex", "0");
    });

    test("disabled chip has tabIndex -1", () => {
        render(<Chip disabled>Disabled</Chip>);
        const chip = screen.getByRole("button");
        expect(chip).toHaveAttribute("tabindex", "-1");
    });

    test("renders prefix and postfix content when provided", () => {
        render(
            <Chip prefix={<span data-testid="prefix">P</span>} postfix={<span data-testid="postfix">S</span>}>
                Content
            </Chip>,
        );
        expect(screen.getByTestId("prefix")).toBeInTheDocument();
        expect(screen.getByTestId("postfix")).toBeInTheDocument();
    });
});
