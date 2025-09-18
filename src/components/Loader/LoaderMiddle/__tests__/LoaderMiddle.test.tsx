import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoaderMiddle } from "../LoaderMiddle";

describe("LoaderMiddle", () => {
    it("Should render with default props", () => {
        render(<LoaderMiddle />);

        const loader = screen.getByRole("status", { name: "loading" });
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderMiddle");
    });
});
