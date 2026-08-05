import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoaderMiddle } from "../LoaderMiddle";

const getLoaderMiddle = () => screen.getByRole("status", { name: "loading" });

describe("LoaderMiddle", () => {
    it("Should render with default props", () => {
        render(<LoaderMiddle />);

        const loader = getLoaderMiddle();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderMiddle");
    });

    it("Should render dots container inside the root element", () => {
        render(<LoaderMiddle />);

        const dotsContainer = getLoaderMiddle().querySelector(".loaderMiddleDots");
        expect(dotsContainer).toBeInTheDocument();
    });

    it("Should render four dots and a line", () => {
        render(<LoaderMiddle />);

        const loader = getLoaderMiddle();
        expect(loader.querySelectorAll(".dot")).toHaveLength(4);
        expect(loader.querySelectorAll(".line")).toHaveLength(1);
    });

    it("Should render each dot with its own modifier class", () => {
        render(<LoaderMiddle />);

        const loader = getLoaderMiddle();

        ["dot1", "dot2", "dot3", "dot4"].forEach((modifier) => {
            const dot = loader.querySelector(`.${modifier}`);

            expect(dot).toBeInTheDocument();
            expect(dot).toHaveClass("dot");
        });
    });
});
