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
        render(<Badge size={EComponentSize.MD} data-testid="badge" />);
        const badge = screen.getByTestId("badge");

        expect(badge.tagName).toBe("SPAN");
    });

    it("should apply correct size class from the map", () => {
        const { container: sm } = render(<Badge size={EComponentSize.SM} />);
        const { container: md } = render(<Badge size={EComponentSize.MD} />);
        const { container: lg } = render(<Badge size={EComponentSize.LG} />);

        expect(sm.firstChild).toHaveClass(/sm/);
        expect(md.firstChild).toHaveClass(/md/);
        expect(lg.firstChild).toHaveClass(/lg/);
    });

    it("should merge and apply custom className", () => {
        render(<Badge size={EComponentSize.MD} className="custom-class" data-testid="badge" />);
        const badge = screen.getByTestId("badge");

        expect(badge).toHaveClass("custom-class");
        expect(badge).toHaveClass(/badge/);
    });

    it("should forward ref correctly to the HTML element", () => {
        const ref = createRef<HTMLSpanElement>();
        render(<Badge size={EComponentSize.MD} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("should accept and apply inline styles for positioning", () => {
        const customStyle = { top: "10px", position: "absolute" as const };
        render(<Badge size={EComponentSize.SM} style={customStyle} data-testid="badge" />);
        const badge = screen.getByTestId("badge");

        expect(badge).toHaveStyle({ top: "10px", position: "absolute" });
    });

    it("should render nested elements properly", () => {
        render(
            <Badge size={EComponentSize.MD}>
                <span data-testid="inner-content">99+</span>
            </Badge>,
        );

        expect(screen.getByTestId("inner-content")).toBeInTheDocument();
    });

    it("should render with prefix", () => {
        render(
            <Badge size={EComponentSize.MD} prefix={<span data-testid="prefix-icon">Icon</span>} data-testid="badge">
                Badge text
            </Badge>,
        );

        expect(screen.getByTestId("prefix-icon")).toBeInTheDocument();
        expect(screen.getByText("Badge text")).toBeInTheDocument();
    });

    it("should render with postfix", () => {
        render(
            <Badge size={EComponentSize.MD} postfix={<span data-testid="postfix-icon">Icon</span>} data-testid="badge">
                Badge text
            </Badge>,
        );

        expect(screen.getByTestId("postfix-icon")).toBeInTheDocument();
        expect(screen.getByText("Badge text")).toBeInTheDocument();
    });

    it("should render with both prefix and postfix", () => {
        render(
            <Badge
                size={EComponentSize.MD}
                prefix={<span data-testid="prefix-icon">Prefix</span>}
                postfix={<span data-testid="postfix-icon">Postfix</span>}
                data-testid="badge"
            >
                Badge text
            </Badge>,
        );

        expect(screen.getByTestId("prefix-icon")).toBeInTheDocument();
        expect(screen.getByText("Badge text")).toBeInTheDocument();
        expect(screen.getByTestId("postfix-icon")).toBeInTheDocument();
    });

    it("should render only prefix without content", () => {
        render(<Badge size={EComponentSize.MD} prefix={<span data-testid="prefix-icon">Icon</span>} />);

        expect(screen.getByTestId("prefix-icon")).toBeInTheDocument();
        expect(screen.queryByText("Badge text")).not.toBeInTheDocument();
    });

    it("should render only postfix without content", () => {
        render(<Badge size={EComponentSize.MD} postfix={<span data-testid="postfix-icon">Icon</span>} />);

        expect(screen.getByTestId("postfix-icon")).toBeInTheDocument();
        expect(screen.queryByText("Badge text")).not.toBeInTheDocument();
    });

    it("should not render prefix when not provided", () => {
        const { container } = render(<Badge size={EComponentSize.MD}>Badge text</Badge>);

        expect(container.querySelector("[class*='badgePrefix']")).not.toBeInTheDocument();
    });

    it("should not render postfix when not provided", () => {
        const { container } = render(<Badge size={EComponentSize.MD}>Badge text</Badge>);

        expect(container.querySelector("[class*='badgePostfix']")).not.toBeInTheDocument();
    });

    it("should not render content when children is not provided", () => {
        const { container } = render(<Badge size={EComponentSize.MD} />);

        expect(container.querySelector("[class*='badgeContent']")).not.toBeInTheDocument();
    });

    it("should render Badge.Dot correctly", () => {
        render(<Badge.Dot size={EComponentSize.MD} data-testid="badge-dot" />);
        const badgeDot = screen.getByTestId("badge-dot");

        expect(badgeDot).toBeInTheDocument();
    });
});
