import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ListMaster } from "../ListMaster";
import { ListMasterBody } from "../components/ListMasterBody";
import { ListMasterChipGroup } from "../components/ListMasterChipGroup";
import { ListMasterFooter } from "../components/ListMasterFooter";
import { ListMasterFooterControls } from "../components/ListMasterFooterControls";
import { ListMasterFooterDescription } from "../components/ListMasterFooterDescription";
import { ListMasterHeader } from "../components/ListMasterHeader";
import { SelectionControls } from "../components/SelectionControls";

describe("ListMaster", () => {
    it("renders children inside a root div", () => {
        render(
            <ListMaster data-testid="root">
                <span>Content</span>
            </ListMaster>,
        );
        const root = screen.getByTestId("root");
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveTextContent("Content");
    });

    it("merges custom className on the root", () => {
        render(<ListMaster className="custom" data-testid="root" />);
        expect(screen.getByTestId("root")).toHaveClass("custom");
    });

    it("forwards ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ListMaster ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("exposes static compound members", () => {
        expect(ListMaster.Body).toBe(ListMasterBody);
        expect(ListMaster.ChipGroup).toBe(ListMasterChipGroup);
        expect(ListMaster.Footer).toBe(ListMasterFooter);
        expect(ListMaster.FooterControls).toBe(ListMasterFooterControls);
        expect(ListMaster.FooterDescription).toBe(ListMasterFooterDescription);
        expect(ListMaster.Header).toBe(ListMasterHeader);
        expect(ListMaster.SelectionControls).toBe(SelectionControls);
    });
});
