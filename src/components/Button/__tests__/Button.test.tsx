import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@sberbusiness/triplex-next/components/";

describe("Button", () => {
    it("applying a class", () => {
        const className = "test";
        render(<Button className={className} />);

        const element = screen.getByRole("button");
        expect(element).toHaveClass(className);
    });
});
