import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "triplex-next";

describe("Input", () => {
    it("applying a class", () => {
        const className = "test";
        render(<Input className={className} />);

        const element = screen.getByRole("textbox");
        expect(element).toHaveClass(className);
    });
});
