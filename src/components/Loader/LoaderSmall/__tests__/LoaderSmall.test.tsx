import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoaderSmall } from "../LoaderSmall";
import { ELoaderSmallTheme } from "../enum";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

const getLoaderSmall = () => screen.getByRole("status", { name: "loading" });

describe("LoaderSmall", () => {
    it("Should render with default props", () => {
        render(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />);

        const loader = getLoaderSmall();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderSmall");
    });

    it("Should apply correct theme classes", () => {
        const { rerender } = render(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />);

        let loader = getLoaderSmall();
        expect(loader).toHaveClass("brand");

        rerender(<LoaderSmall theme={ELoaderSmallTheme.NEUTRAL} size={EComponentSize.MD} />);

        loader = getLoaderSmall();
        expect(loader).toHaveClass("neutral");
    });

    it("Should apply correct size classes", () => {
        const { rerender } = render(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.SM} />);

        let loader = getLoaderSmall();
        expect(loader).toHaveClass("sm");

        rerender(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />);

        loader = getLoaderSmall();
        expect(loader).toHaveClass("md");

        rerender(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.LG} />);

        loader = getLoaderSmall();
        expect(loader).toHaveClass("lg");
    });
});
