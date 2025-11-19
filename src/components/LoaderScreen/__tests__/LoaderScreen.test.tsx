import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoaderScreen } from "../LoaderScreen";
import { ELoaderSmallTheme } from "../../Loader";
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

    it("Should render LoaderSmall in different themes", () => {
        render(<LoaderScreen type="small" theme={ELoaderSmallTheme.NEUTRAL} size={EComponentSize.MD} />);

        const loader = getLoaderScreen();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderSmall");
        expect(loader).toHaveClass("neutral");
        expect(loader).toHaveClass("md");
    });

    it("Should render LoaderSmall in different sizes", () => {
        render(<LoaderScreen type="small" theme={ELoaderSmallTheme.BRAND} size={EComponentSize.SM} />);

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
});
