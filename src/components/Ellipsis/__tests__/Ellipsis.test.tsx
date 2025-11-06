import React from "react";
import { render, screen } from "@testing-library/react";
import { Ellipsis } from "../Ellipsis";

describe("Ellipsis", () => {
    it("Should render children correctly", () => {
        const text = "Test text content";
        render(<Ellipsis maxLine={2}>{text}</Ellipsis>);

        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it("Should apply maxLine as CSS variable correctly", () => {
        const maxLine = 3;
        render(<Ellipsis maxLine={maxLine}>Test text</Ellipsis>);

        const element = screen.getByText("Test text");
        expect(element).toHaveAttribute("style", `--ellipsis-line-clamp: ${maxLine};`);
    });

    it("Should apply oneLine class when maxLine is 1", () => {
        render(<Ellipsis maxLine={1}>Test text</Ellipsis>);

        const element = screen.getByText("Test text");
        expect(element).toHaveClass("oneLine");
    });
});
