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

    it("Should render three dots", () => {
        render(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />);

        // Количество точек и их порядок завязаны на задержки анимации в стилях.
        const dots = getLoaderSmall().querySelectorAll(".dot");
        expect(dots).toHaveLength(3);
        expect(dots[0]).toHaveClass("dot1");
        expect(dots[1]).toHaveClass("dot2");
        expect(dots[2]).toHaveClass("dot3");
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

    it("Should merge custom className with base classes", () => {
        render(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} className="customClassName" />);

        const loader = getLoaderSmall();
        expect(loader).toHaveClass("loaderSmall");
        expect(loader).toHaveClass("brand");
        expect(loader).toHaveClass("md");
        expect(loader).toHaveClass("customClassName");
    });

    it("Should pass rest props to root element", () => {
        render(<LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} id="loader" data-test="loader" />);

        const loader = getLoaderSmall();
        expect(loader).toHaveAttribute("id", "loader");
        expect(loader).toHaveAttribute("data-test", "loader");
    });
});
