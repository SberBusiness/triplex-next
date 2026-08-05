import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoaderMiddle } from "../LoaderMiddle";

const getLoaderMiddle = () => screen.getByRole("status", { name: "loading" });

describe("LoaderMiddle", () => {
    it("Should render root element with status role", () => {
        render(<LoaderMiddle />);

        const loader = getLoaderMiddle();
        expect(loader).toBeInTheDocument();
        // Класс корневого элемента — на него завязан тест потребителя TableBasic.test.tsx.
        expect(loader).toHaveClass("loaderMiddle");
    });

    it("Should render four dots and a line", () => {
        render(<LoaderMiddle />);

        const loader = getLoaderMiddle();
        expect(loader.querySelectorAll(".dot")).toHaveLength(4);
        expect(loader.querySelectorAll(".line")).toHaveLength(1);
    });
});
