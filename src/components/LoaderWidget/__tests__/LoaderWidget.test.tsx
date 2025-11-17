import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoaderWidget } from "../LoaderWidget";
import { ELoaderSmallTheme } from "../../Loader";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

const getLoaderWidget = () => screen.getByRole("status", { name: "loading" });

describe("LoaderWidget", () => {
    it("Should render LoaderSmall with default props", () => {
        render(<LoaderWidget type="small" />);

        const loader = getLoaderWidget();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderSmall");
        expect(loader).toHaveClass("brand");
        expect(loader).toHaveClass("md");
    });

    it("Should render LoaderSmall in different themes", () => {
        render(<LoaderWidget type="small" theme={ELoaderSmallTheme.NEUTRAL} size={EComponentSize.MD} />);

        const loader = getLoaderWidget();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderSmall");
        expect(loader).toHaveClass("neutral");
        expect(loader).toHaveClass("md");
    });

    it("Should render LoaderSmall in different sizes", () => {
        render(<LoaderWidget type="small" theme={ELoaderSmallTheme.BRAND} size={EComponentSize.SM} />);

        const loader = getLoaderWidget();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderSmall");
        expect(loader).toHaveClass("brand");
        expect(loader).toHaveClass("sm");
    });

    it("Should render LoaderMiddle", () => {
        render(<LoaderWidget type="middle" />);

        const loader = getLoaderWidget();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderMiddle");
    });
});
