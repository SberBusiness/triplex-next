import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoaderScreen } from "../LoaderScreen";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

const getLoaderScreen = () => screen.getByRole("status", { name: "loading" });

describe("LoaderScreen", () => {
    it("Should render LoaderSmall with default props", () => {
        render(<LoaderScreen type="small" />);

        const loader = getLoaderScreen();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderSmall");
        expect(loader).toHaveClass("brand");
        expect(loader).toHaveClass("md");
    });

    it("Should render LoaderSmall in different sizes", () => {
        render(<LoaderScreen type="small" size={EComponentSize.SM} />);

        const loader = getLoaderScreen();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderSmall");
        expect(loader).toHaveClass("brand");
        expect(loader).toHaveClass("sm");
    });

    it("Should render LoaderMiddle", () => {
        render(<LoaderScreen type="middle" />);

        const loader = getLoaderScreen();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderMiddle");
    });

    it("Should render description when provided", () => {
        render(<LoaderScreen type="middle" description="Loading data..." />);
        expect(screen.getByText("Loading data...")).toBeInTheDocument();
        expect(getLoaderScreen()).toBeInTheDocument();
    });

    it("Should render controls when provided", () => {
        render(<LoaderScreen type="middle" controls={<button type="button">Cancel</button>} />);
        expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    });

    it("Should render description and controls together", () => {
        render(
            <LoaderScreen type="middle" description="Please wait" controls={<button type="button">Retry</button>} />,
        );
        expect(screen.getByText("Please wait")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });
});
