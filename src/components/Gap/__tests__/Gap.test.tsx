import React from "react";
import { render, screen } from "@testing-library/react";
import { Gap } from "triplex-next";

describe("Gap", () => {
    it("applying a class correctly", () => {
        const className = "test";
        render(<Gap size={4} className={className} />);

        const element = screen.getByRole("presentation");
        expect(element.classList).toContain(className);
    });

    it("applies custom size correctly", () => {
        render(<Gap size={8} />);

        const element = screen.getByRole("presentation");
        expect(element.getAttribute("style")).toBe("height: 8px;");
    });

    it("merges custom styles correctly", () => {
        const style = { display: "block", background: "rgb(0, 0, 0)" };
        render(<Gap size={4} style={style} />);

        const element = screen.getByRole("presentation");
        expect(element.getAttribute("style")).toBe("height: 4px; display: block; background: rgb(0, 0, 0);");
    });

    it("passes additional HTML attributes", () => {
        render(<Gap size={4} aria-hidden="true" data-analytics="test" />);

        const element = screen.getByRole("presentation", { hidden: true });
        expect(element.getAttribute("aria-hidden")).toBe("true");
        expect(element.getAttribute("data-analytics")).toBe("test");
    });
});
