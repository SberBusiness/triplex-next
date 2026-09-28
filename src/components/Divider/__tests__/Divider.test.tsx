import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Divider, TDividerMarginSize } from "../Divider";

const marginSizes: TDividerMarginSize[] = [4, 8, 12, 16, 20, 24, 28, 32];

const getDivider = () => screen.getByRole("separator");

describe("Divider", () => {
    it("Should render hr element", () => {
        render(<Divider />);
        const divider = getDivider();

        expect(divider).toBeInTheDocument();
        expect(divider.tagName).toBe("HR");
    });

    it("Should apply base divider class", () => {
        render(<Divider />);
        const divider = getDivider();

        expect(divider).toHaveClass("divider");
    });

    it.each(marginSizes)("Should apply marginTopSize class for marginTopSize=%i", (size) => {
        render(<Divider marginTopSize={size} />);

        expect(getDivider()).toHaveClass(`marginTopSize-${size}`);
    });

    it.each(marginSizes)("Should apply marginBottomSize class for marginBottomSize=%i", (size) => {
        render(<Divider marginBottomSize={size} />);

        expect(getDivider()).toHaveClass(`marginBottomSize-${size}`);
    });

    it("Should apply both marginTopSize and marginBottomSize classes", () => {
        render(<Divider marginTopSize={8} marginBottomSize={12} />);
        const divider = getDivider();

        expect(divider).toHaveClass("marginTopSize-8");
        expect(divider).toHaveClass("marginBottomSize-12");
    });

    it("Should apply custom className and merge with default classes", () => {
        render(<Divider className="custom-class" />);
        const divider = getDivider();

        expect(divider).toHaveClass("divider");
        expect(divider).toHaveClass("custom-class");
    });

    it("Should pass additional HTML attributes", () => {
        render(<Divider data-testid="divider-test" aria-label="Separator" data-analytics="divider-analytics" />);
        const divider = getDivider();

        expect(divider).toHaveAttribute("data-testid", "divider-test");
        expect(divider).toHaveAttribute("aria-label", "Separator");
        expect(divider).toHaveAttribute("data-analytics", "divider-analytics");
    });

    it("Should not apply marginTopSize class when marginTopSize is not provided", () => {
        render(<Divider marginBottomSize={16} />);
        const divider = getDivider();

        expect(divider).not.toHaveClass("marginTopSize-4");
        expect(divider).not.toHaveClass("marginTopSize-8");
        expect(divider).toHaveClass("marginBottomSize-16");
    });

    it("Should not apply marginBottomSize class when marginBottomSize is not provided", () => {
        render(<Divider marginTopSize={16} />);
        const divider = getDivider();

        expect(divider).not.toHaveClass("marginBottomSize-4");
        expect(divider).not.toHaveClass("marginBottomSize-8");
        expect(divider).toHaveClass("marginTopSize-16");
    });

    it("Should forward ref to the root hr element", () => {
        const ref = React.createRef<HTMLHRElement>();
        render(<Divider ref={ref} marginTopSize={24} />);

        expect(ref.current).toBeInstanceOf(HTMLHRElement);
        expect(ref.current).toBe(getDivider());
        expect(ref.current).toHaveClass("divider", "marginTopSize-24");
    });

    it("Should have correct displayName", () => {
        expect(Divider.displayName).toBe("Divider");
    });
});
