import React from "react";
import { render, screen } from "@testing-library/react";
import { ChipIcon } from "@sberbusiness/triplex-next/components/Chip/ChipIcon";

describe("ChipIcon", () => {
    test("renders child icon inside prefix and reserves postfix", () => {
        render(
            <ChipIcon>
                <span data-testid="icon">I</span>
            </ChipIcon>,
        );
        const chip = screen.getByRole("button");
        expect(chip).toBeInTheDocument();
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
});
