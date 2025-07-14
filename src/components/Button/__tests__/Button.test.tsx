import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "../index";

describe("Button", () => {
    it("applying a class", () => {
        const className = "test";

        render(<Button className={className} />);
        expect(screen.getByRole("button").classList).toContain(className);
    });
});
