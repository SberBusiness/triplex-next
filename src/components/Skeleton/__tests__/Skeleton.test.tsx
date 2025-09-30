import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "../Skeleton";
import { ESkeletonType } from "../enums";

const getSkeleton = () => screen.getByTestId("skeleton");

describe("Skeleton", () => {
    it("Should render with default props", () => {
        render(<Skeleton data-testid="skeleton" />);

        const skeleton = getSkeleton();
        expect(skeleton).toBeInTheDocument();
        expect(skeleton).toHaveClass("skeleton");
        expect(skeleton).toHaveClass("dark");
    });

    it("Should apply DARK type class correctly", () => {
        render(<Skeleton type={ESkeletonType.DARK} data-testid="skeleton" />);

        const skeleton = getSkeleton();
        expect(skeleton).toHaveClass("skeleton");
        expect(skeleton).toHaveClass("dark");
        expect(skeleton).not.toHaveClass("light");
    });

    it("Should apply LIGHT type class correctly", () => {
        render(<Skeleton type={ESkeletonType.LIGHT} data-testid="skeleton" />);

        const skeleton = getSkeleton();
        expect(skeleton).toHaveClass("skeleton");
        expect(skeleton).toHaveClass("light");
        expect(skeleton).not.toHaveClass("dark");
    });

    it("Should merge custom className with default classes", () => {
        render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);

        const skeleton = getSkeleton();
        expect(skeleton).toHaveClass("skeleton");
        expect(skeleton).toHaveClass("dark");
        expect(skeleton).toHaveClass("custom-skeleton");
    });
});
