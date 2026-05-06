import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ListMasterChipGroup } from "../components/ListMasterChipGroup";

describe("ListMasterChipGroup", () => {
    it("renders as ChipGroup with horizontal padding class", () => {
        render(<ListMasterChipGroup data-testid="root" />);
        const root = screen.getByTestId("root");
        expect(root).toBeInTheDocument();
        expect(root).toHaveClass("listMasterChipGroup");
    });

    it("merges custom className on the root", () => {
        render(<ListMasterChipGroup className="custom" data-testid="root" />);
        const root = screen.getByTestId("root");
        expect(root).toHaveClass("custom");
        expect(root).toHaveClass("listMasterChipGroup");
    });

    it("renders children inside ChipGroup", () => {
        render(
            <ListMasterChipGroup>
                <span data-testid="child">Chip</span>
            </ListMasterChipGroup>,
        );
        expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ListMasterChipGroup ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
