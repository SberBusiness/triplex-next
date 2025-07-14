import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "../index";

describe("Input", () => {
    it("applying a class", () => {
        const className = "test";

        render(<Input className={className} />);
        expect(screen.getByRole("textbox").classList).toContain(className);
    });
});
