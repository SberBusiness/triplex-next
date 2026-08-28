import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderTabs } from "../components/HeaderTabs/HeaderTabs";
import { HeaderTabsContent } from "../components/HeaderTabs/HeaderTabsContent";
import { HeaderTabsControls } from "../components/HeaderTabs/HeaderTabsControls";

const getRoot = () => screen.getByTestId("tabs");

describe("HeaderTabs", () => {
    it("Should render children inside the root element", () => {
        render(<HeaderTabs data-testid="tabs">Content</HeaderTabs>);

        expect(getRoot()).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("Should set own class on the root element", () => {
        render(<HeaderTabs data-testid="tabs" />);

        expect(getRoot()).toHaveClass("headerTabs");
    });

    it("Should merge custom className with own class", () => {
        render(<HeaderTabs className="custom-class" data-testid="tabs" />);

        const root = getRoot();
        expect(root).toHaveClass("headerTabs");
        expect(root).toHaveClass("custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<HeaderTabs id="tabs-id" aria-label="Tabs" data-testid="tabs" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "tabs-id");
        expect(root).toHaveAttribute("aria-label", "Tabs");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<HeaderTabs ref={ref} data-testid="tabs" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<HeaderTabs ref={ref} data-testid="tabs" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should expose subcomponents as static properties", () => {
        expect(HeaderTabs.Content).toBe(HeaderTabsContent);
        expect(HeaderTabs.Controls).toBe(HeaderTabsControls);
    });

    it("Should set displayName", () => {
        expect(HeaderTabs.displayName).toBe("HeaderTabs");
    });
});
