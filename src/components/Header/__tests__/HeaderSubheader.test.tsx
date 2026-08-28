import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderSubheader } from "../components/HeaderSubheader/HeaderSubheader";

const getRoot = () => screen.getByTestId("subheader");

describe("HeaderSubheader", () => {
    it("Should render children inside the root element", () => {
        render(<HeaderSubheader data-testid="subheader">Content</HeaderSubheader>);

        expect(getRoot()).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("Should set own class on the root element", () => {
        render(<HeaderSubheader data-testid="subheader" />);

        expect(getRoot()).toHaveClass("headerSubheader");
    });

    it("Should not set withoutPaddings class by default", () => {
        render(<HeaderSubheader data-testid="subheader" />);

        expect(getRoot()).not.toHaveClass("withoutPaddings");
    });

    it("Should not set withoutPaddings class when withoutPaddings is false", () => {
        render(<HeaderSubheader withoutPaddings={false} data-testid="subheader" />);

        expect(getRoot()).not.toHaveClass("withoutPaddings");
    });

    it("Should set withoutPaddings class when withoutPaddings is true", () => {
        render(<HeaderSubheader withoutPaddings data-testid="subheader" />);

        const root = getRoot();
        expect(root).toHaveClass("headerSubheader");
        expect(root).toHaveClass("withoutPaddings");
    });

    it("Should not render withoutPaddings as a DOM attribute", () => {
        render(<HeaderSubheader withoutPaddings data-testid="subheader" />);

        expect(getRoot()).not.toHaveAttribute("withoutPaddings");
    });

    it("Should merge custom className with own class", () => {
        render(<HeaderSubheader className="custom-class" data-testid="subheader" />);

        const root = getRoot();
        expect(root).toHaveClass("headerSubheader");
        expect(root).toHaveClass("custom-class");
    });

    it("Should merge custom className with withoutPaddings class", () => {
        render(<HeaderSubheader withoutPaddings className="custom-class" data-testid="subheader" />);

        const root = getRoot();
        expect(root).toHaveClass("headerSubheader");
        expect(root).toHaveClass("withoutPaddings");
        expect(root).toHaveClass("custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<HeaderSubheader id="subheader-id" aria-label="Subheader" data-testid="subheader" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "subheader-id");
        expect(root).toHaveAttribute("aria-label", "Subheader");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<HeaderSubheader ref={ref} data-testid="subheader" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<HeaderSubheader ref={ref} data-testid="subheader" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should set displayName", () => {
        expect(HeaderSubheader.displayName).toBe("HeaderSubheader");
    });
});
