import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ListMasterFooter } from "../components/ListMasterFooter";

describe("ListMasterFooter", () => {
    it("renders children inside a div", () => {
        render(<ListMasterFooter data-testid="root">Footer content</ListMasterFooter>);
        const root = screen.getByTestId("root");
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveTextContent("Footer content");
    });

    it("applies sticky class by default", () => {
        render(<ListMasterFooter data-testid="root" />);
        expect(screen.getByTestId("root")).toHaveClass("sticky");
    });

    it("does not apply sticky class when sticky=false", () => {
        render(<ListMasterFooter data-testid="root" sticky={false} />);
        expect(screen.getByTestId("root")).not.toHaveClass("sticky");
    });

    it("merges custom className on the root", () => {
        render(<ListMasterFooter className="custom" data-testid="root" />);
        expect(screen.getByTestId("root")).toHaveClass("custom");
    });

    it("forwards ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ListMasterFooter ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
