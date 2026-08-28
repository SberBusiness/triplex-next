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
        expect(skeleton).toHaveClass("type2");
    });

    it("Should apply TYPE_1 type class correctly", () => {
        render(<Skeleton type={ESkeletonType.TYPE_1} data-testid="skeleton" />);

        const skeleton = getSkeleton();
        expect(skeleton).toHaveClass("skeleton");
        expect(skeleton).toHaveClass("type1");
        expect(skeleton).not.toHaveClass("type2");
        expect(skeleton).not.toHaveClass("type3");
    });

    it("Should apply TYPE_2 type class correctly", () => {
        render(<Skeleton type={ESkeletonType.TYPE_2} data-testid="skeleton" />);

        const skeleton = getSkeleton();
        expect(skeleton).toHaveClass("skeleton");
        expect(skeleton).toHaveClass("type2");
        expect(skeleton).not.toHaveClass("type1");
        expect(skeleton).not.toHaveClass("type3");
    });

    it("Should apply TYPE_3 type class correctly", () => {
        render(<Skeleton type={ESkeletonType.TYPE_3} data-testid="skeleton" />);

        const skeleton = getSkeleton();
        expect(skeleton).toHaveClass("skeleton");
        expect(skeleton).toHaveClass("type3");
        expect(skeleton).not.toHaveClass("type1");
        expect(skeleton).not.toHaveClass("type2");
    });

    it("Should merge custom className with default classes", () => {
        render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);

        const skeleton = getSkeleton();
        expect(skeleton).toHaveClass("skeleton");
        expect(skeleton).toHaveClass("type2");
        expect(skeleton).toHaveClass("custom-skeleton");
    });
});
