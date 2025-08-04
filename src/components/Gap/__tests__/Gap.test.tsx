import React from "react";
import { render, screen } from "@testing-library/react";
import { Gap } from "triplex-next";

describe("Gap", () => {
    it("applying a class correctly", () => {
        const className = "test";
        render(<Gap size={4} className={className} />);

        const element = screen.getByRole("presentation");
        expect(element).toHaveClass(className);
    });

    it("applies size property correctly", () => {
        render(<Gap size={8} />);

        const element = screen.getByRole("presentation");
        expect(element).toHaveStyle("height: 8px");
    });

    it("merges custom styles correctly", () => {
        const style = { display: "block", background: "rgb(0, 0, 0)" };
        render(<Gap size={4} style={style} />);

        const element = screen.getByRole("presentation");
        expect(element).toHaveStyle({ ...style, height: "4px" });
    });

    it("passes additional HTML attributes", () => {
        render(<Gap size={4} aria-hidden="true" data-analytics="test" />);

        const element = screen.getByRole("presentation", { hidden: true });
        expect(element).toHaveAttribute("aria-hidden", "true");
        expect(element).toHaveAttribute("data-analytics", "test");
    });
});
