import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { Skeleton } from "../Skeleton";
import { ESkeletonType } from "../enums";

const getSkeleton = () => screen.getByTestId("skeleton");

beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

describe("Skeleton", () => {
    it("Should render with default props", () => {
        render(<Skeleton data-testid="skeleton" />);

        const skeleton = getSkeleton();
        expect(skeleton).toBeInTheDocument();
        expect(skeleton.tagName).toBe("DIV");
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

    it("Should pass through html attributes to the root element", () => {
        render(<Skeleton data-testid="skeleton" id="loading-block" aria-hidden="true" style={{ height: "80px" }} />);

        const skeleton = getSkeleton();
        expect(skeleton).toHaveAttribute("id", "loading-block");
        expect(skeleton).toHaveAttribute("aria-hidden", "true");
        expect(skeleton).toHaveStyle({ height: "80px" });
    });

    it("Should set data-tx attribute with package version", () => {
        render(<Skeleton data-testid="skeleton" />);

        expect(getSkeleton()).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("Should not let consumer override data-tx attribute", () => {
        render(<Skeleton data-tx="consumer-value" data-testid="skeleton" />);

        expect(getSkeleton()).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("Should forward ref to the root div element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Skeleton data-testid="skeleton" ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getSkeleton());
    });

    it("Should have correct displayName", () => {
        expect(Skeleton.displayName).toBe("Skeleton");
    });
});
