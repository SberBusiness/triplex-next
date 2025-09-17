import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Link } from "../Link";

const getLink = () => screen.getByRole("link");

describe("Link", () => {
    it("Should render with default props", () => {
        render(<Link data-testid="link">Click me</Link>);
        const link = getLink();

        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent("Click me");
        expect(link).toHaveAttribute("role", "link");
        expect(link).toHaveClass("link");
    });

    it("Should apply custom className and merge with default classes", () => {
        render(
            <Link className="custom-class" data-testid="link">
                Link text
            </Link>,
        );
        const link = getLink();

        expect(link).toHaveClass("custom-class");
        expect(link).toHaveClass("link");
    });

    it("Should render contentAfter when provided", () => {
        const contentAfter = () => <span data-testid="after-content">Content after</span>;
        render(
            <Link contentAfter={contentAfter} data-testid="link">
                Link text
            </Link>,
        );
        const link = getLink();

        expect(link).toHaveTextContent("Link text");
        expect(screen.getByTestId("after-content")).toBeInTheDocument();
        expect(screen.getByTestId("after-content")).toHaveTextContent("Content after");
    });

    it("Should render contentBefore when provided", () => {
        const contentBefore = () => <span data-testid="before-content">Content before</span>;
        render(
            <Link contentBefore={contentBefore} data-testid="link">
                Link text
            </Link>,
        );
        const link = getLink();

        expect(link).toHaveTextContent("Link text");
        expect(screen.getByTestId("before-content")).toBeInTheDocument();
        expect(screen.getByTestId("before-content")).toHaveTextContent("Content before");
    });

    it("Should render contentBefore and contentAfter when provided", () => {
        const contentBefore = () => <span data-testid="before-content">Content before</span>;
        const contentAfter = () => <span data-testid="after-content">Content after</span>;
        render(
            <Link contentBefore={contentBefore} contentAfter={contentAfter} data-testid="link">
                Link text
            </Link>,
        );
        const link = getLink();

        expect(link).toHaveTextContent("Link text");
        expect(screen.getByTestId("before-content")).toBeInTheDocument();
        expect(screen.getByTestId("before-content")).toHaveTextContent("Content before");
        expect(screen.getByTestId("after-content")).toBeInTheDocument();
        expect(screen.getByTestId("after-content")).toHaveTextContent("Content after");
    });
});
