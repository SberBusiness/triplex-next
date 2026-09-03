import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MultiselectFieldDropdownContent } from "../components/MultiselectFieldDropdownContent";
import { MultiselectFieldContext } from "../MultiselectFieldContext";
import { EComponentSize } from "../../../enums/EComponentSize";

describe("MultiselectFieldDropdownContent", () => {
    const renderContent = (
        props: React.ComponentProps<typeof MultiselectFieldDropdownContent> = {},
        size?: EComponentSize,
    ) => {
        const content = (
            <MultiselectFieldDropdownContent data-testid="content" {...props}>
                {props.children ?? "Content"}
            </MultiselectFieldDropdownContent>
        );

        return render(
            size ? (
                <MultiselectFieldContext.Provider value={{ size, mouseUsedRef: { current: false } }}>
                    {content}
                </MultiselectFieldContext.Provider>
            ) : (
                content
            ),
        );
    };

    it("Should render children", () => {
        renderContent({ children: <span data-testid="option">Option</span> });

        expect(screen.getByTestId("option")).toBeInTheDocument();
        expect(screen.getByTestId("content")).toHaveClass("multiselectFieldContent");
    });

    it("Should be focusable programmatically but skipped by Tab", () => {
        renderContent();

        expect(screen.getByTestId("content")).toHaveAttribute("tabindex", "-1");
    });

    it("Should merge custom className", () => {
        renderContent({ className: "custom-content" });

        expect(screen.getByTestId("content")).toHaveClass("multiselectFieldContent", "custom-content");
    });

    it("Should pass through unknown html attributes", () => {
        renderContent({ id: "content-id", role: "group" });

        const content = screen.getByTestId("content");

        expect(content).toHaveAttribute("id", "content-id");
        expect(content).toHaveAttribute("role", "group");
    });

    it("Should use MD size class outside of MultiselectField", () => {
        renderContent();

        expect(screen.getByTestId("content")).toHaveClass("md");
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("Should apply the %s size class from context", (size, expectedClassName) => {
        renderContent({}, size);

        expect(screen.getByTestId("content")).toHaveClass(expectedClassName);
    });

    it("Should not render the loader by default", () => {
        renderContent();

        expect(screen.getByTestId("content").querySelector(".loaderScreen")).toBeNull();
    });

    it("Should render the loader over the content when loading", () => {
        renderContent({ loading: true, children: <span data-testid="option">Option</span> });

        expect(screen.getByTestId("option")).toBeInTheDocument();
        expect(screen.getByTestId("content").querySelector(".loaderScreen")).not.toBeNull();
    });
});
