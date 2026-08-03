import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../Badge";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

describe("Badge", () => {
    it("should render correctly with children", () => {
        render(<Badge size={EComponentSize.MD}>Test</Badge>);

        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should render as a span element", () => {
        render(<Badge size={EComponentSize.MD}>Badge Text</Badge>);

        const badge = screen.getByText("Badge Text").closest("span");
        expect(badge?.tagName).toBe("SPAN");
    });

    it("should apply correct size class from the map", () => {
        const { container: sm } = render(<Badge size={EComponentSize.SM}>SM</Badge>);
        const { container: md } = render(<Badge size={EComponentSize.MD}>MD</Badge>);
        const { container: lg } = render(<Badge size={EComponentSize.LG}>LG</Badge>);

        expect(sm.firstChild).toHaveClass("sm");
        expect(md.firstChild).toHaveClass("md");
        expect(lg.firstChild).toHaveClass("lg");
    });

    it("should merge and apply custom className", () => {
        const { container } = render(
            <Badge size={EComponentSize.MD} className="custom-class">
                Test
            </Badge>,
        );
        const badge = container.firstChild;

        expect(badge).toHaveClass("custom-class");
        expect(badge).toHaveClass("badge");
    });

    it("should forward ref correctly to the HTML element", () => {
        const ref = createRef<HTMLSpanElement>();
        render(
            <Badge size={EComponentSize.MD} ref={ref}>
                Ref Target
            </Badge>,
        );

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("should accept and apply inline styles for positioning", () => {
        const customStyle = { top: "10px", position: "absolute" as const };
        const { container } = render(
            <Badge size={EComponentSize.SM} style={customStyle}>
                Styled
            </Badge>,
        );
        const badge = container.firstChild;

        expect(badge).toHaveStyle({ top: "10px", position: "absolute" });
    });

    it("should render nested elements properly", () => {
        render(
            <Badge size={EComponentSize.MD}>
                <span>99+</span>
            </Badge>,
        );

        expect(screen.getByText("99+")).toBeInTheDocument();
    });

    it("should render with prefix and content", () => {
        render(
            <Badge size={EComponentSize.MD} prefix={<span>Prefix Icon</span>}>
                <span>Badge text</span>
            </Badge>,
        );

        expect(screen.getByText("Prefix Icon")).toBeInTheDocument();
        expect(screen.getByText("Badge text")).toBeInTheDocument();
    });

    it("should render with postfix and content", () => {
        render(
            <Badge size={EComponentSize.MD} postfix={<span>Postfix Icon</span>}>
                <span>Badge text</span>
            </Badge>,
        );

        expect(screen.getByText("Postfix Icon")).toBeInTheDocument();
        expect(screen.getByText("Badge text")).toBeInTheDocument();
    });

    it("should render only prefix without content", () => {
        render(<Badge size={EComponentSize.MD} prefix={<span>Prefix Only</span>} />);

        expect(screen.getByText("Prefix Only")).toBeInTheDocument();
    });

    it("should render only postfix without content", () => {
        render(<Badge size={EComponentSize.MD} postfix={<span>Postfix Only</span>} />);

        expect(screen.getByText("Postfix Only")).toBeInTheDocument();
    });

    it("should render Badge.Dot correctly", () => {
        render(<Badge.Dot size={EComponentSize.MD} data-testid="badge-dot" />);

        expect(screen.getByTestId("badge-dot")).toBeInTheDocument();
    });
});
