import React from "react";
import { render, screen } from "@testing-library/react";
import { Ellipsis } from "../Ellipsis";

describe("Ellipsis", () => {
    it("Should render children correctly", () => {
        const text = "Test text content";
        render(<Ellipsis maxLines={2}>{text}</Ellipsis>);

        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it("Should apply maxLines as CSS variable correctly", () => {
        const maxLines = 3;
        render(<Ellipsis maxLines={maxLines}>Test text</Ellipsis>);

        const element = screen.getByText("Test text");
        expect(element).toHaveAttribute("style", `--ellipsis-line-clamp: ${maxLines};`);
    });

    it("Should apply oneLine class when maxLines is 1", () => {
        render(<Ellipsis maxLines={1}>Test text</Ellipsis>);

        const element = screen.getByText("Test text");
        expect(element).toHaveClass("oneLine");
    });
});
