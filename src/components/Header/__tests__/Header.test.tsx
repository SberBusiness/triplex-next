import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { Header } from "../Header";
import { HeaderLayoutSidebar } from "../components/HeaderLayoutSidebar/HeaderLayoutSidebar";
import { HeaderSubheader } from "../components/HeaderSubheader/HeaderSubheader";
import { HeaderTabs } from "../components/HeaderTabs/HeaderTabs";
import { HeaderTitle } from "../components/HeaderTitle/HeaderTitle";

const getRoot = () => screen.getByTestId("header");

beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

describe("Header", () => {
    it("Should render children inside the root element", () => {
        render(<Header data-testid="header">Content</Header>);

        expect(getRoot()).toContainElement(screen.getByText("Content"));
    });

    it("Should render a div as the root element", () => {
        render(<Header data-testid="header" />);

        expect(getRoot().tagName).toBe("DIV");
    });

    it("Should not set any own class on the root element", () => {
        render(<Header data-testid="header" />);

        expect(getRoot()).not.toHaveAttribute("class");
    });

    it("Should pass custom className to the root element", () => {
        render(<Header className="custom-class" data-testid="header" />);

        expect(getRoot()).toHaveClass("custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<Header id="header-id" aria-label="Header" title="title-attr" data-testid="header" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "header-id");
        expect(root).toHaveAttribute("aria-label", "Header");
        expect(root).toHaveAttribute("title", "title-attr");
    });

    it("Should set data-tx attribute with the library version on the root element", () => {
        render(<Header data-testid="header" />);

        expect(getRoot()).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("Should not let consumer override data-tx attribute", () => {
        render(<Header data-tx="consumer-value" data-testid="header" />);

        expect(getRoot()).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<Header ref={ref} data-testid="header" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<Header ref={ref} data-testid="header" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should expose subcomponents as static properties", () => {
        expect(Header.LayoutSidebar).toBe(HeaderLayoutSidebar);
        expect(Header.Subhead).toBe(HeaderSubheader);
        expect(Header.Tabs).toBe(HeaderTabs);
        expect(Header.Title).toBe(HeaderTitle);
    });

    it("Should set displayName", () => {
        expect(Header.displayName).toBe("Header");
    });
});
