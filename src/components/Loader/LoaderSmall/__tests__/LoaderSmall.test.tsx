import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoaderSmall } from "../LoaderSmall";
import { ELoaderSmallTheme, ELoaderSmallSize } from "../enum";

const getLoaderSmall = () => screen.getByRole("status", { name: "loading" });

describe("LoaderSmall", () => {
    it("Should render with default props", () => {
        render(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.MD} />);

        const loader = getLoaderSmall();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderSmall");
    });

    it("Should apply correct theme classes", () => {
        const { rerender } = render(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.MD} />);

        let loader = getLoaderSmall();
        expect(loader).toHaveClass("brand");

        rerender(<LoaderSmall theme={ELoaderSmallTheme.NEUTRAL} size={ELoaderSmallSize.MD} />);

        loader = getLoaderSmall();
        expect(loader).toHaveClass("neutral");
    });

    it("Should apply correct size classes", () => {
        const { rerender } = render(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.SM} />);

        let loader = getLoaderSmall();
        expect(loader).toHaveClass("sm");

        rerender(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.MD} />);

        loader = getLoaderSmall();
        expect(loader).toHaveClass("md");

        rerender(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={ELoaderSmallSize.LG} />);

        loader = getLoaderSmall();
        expect(loader).toHaveClass("lg");
    });
});
