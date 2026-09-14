import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IslandWidgetFooter } from "../components/IslandWidgetFooter";
import { IIslandWidgetContext, IslandWidgetContext } from "../IslandWidgetContext";
import { EComponentSize } from "../../../enums/EComponentSize";

const CONTEXT_DEFAULT: IIslandWidgetContext = {
    adaptive: false,
    disableAdaptiveCollapsing: false,
    open: false,
    size: EComponentSize.MD,
};

const renderFooter = (children: React.ReactNode, context: Partial<IIslandWidgetContext> = {}) =>
    render(
        <IslandWidgetContext.Provider value={{ ...CONTEXT_DEFAULT, ...context }}>
            {children}
        </IslandWidgetContext.Provider>,
    );

const getFooter = () => screen.getByTestId("footer");

describe("IslandWidgetFooter", () => {
    it("Should render children", () => {
        renderFooter(<IslandWidgetFooter data-testid="footer">Footer content</IslandWidgetFooter>);

        expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("Should take %s size class name from the widget context", (size, className) => {
        renderFooter(<IslandWidgetFooter data-testid="footer" />, { size });

        expect(getFooter()).toHaveClass("islandWidgetFooter", className);
    });

    it("Should merge custom className with the base class name", () => {
        renderFooter(<IslandWidgetFooter data-testid="footer" className="custom-class" />);

        expect(getFooter()).toHaveClass("islandWidgetFooter", "custom-class");
    });

    it("Should spread rest attributes to the root element", () => {
        renderFooter(<IslandWidgetFooter data-testid="footer" aria-label="Widget footer" title="title-attr" />);

        expect(getFooter()).toHaveAttribute("aria-label", "Widget footer");
        expect(getFooter()).toHaveAttribute("title", "title-attr");
    });
});

describe("IslandWidgetFooter.Content", () => {
    it("Should render children and merge custom className with the base class name", () => {
        renderFooter(
            <IslandWidgetFooter>
                <IslandWidgetFooter.Content data-testid="content" className="custom-class">
                    Content
                </IslandWidgetFooter.Content>
            </IslandWidgetFooter>,
        );

        expect(screen.getByTestId("content")).toHaveTextContent("Content");
        expect(screen.getByTestId("content")).toHaveClass("islandWidgetFooterContent", "custom-class");
    });
});

describe("IslandWidgetFooter.Controls", () => {
    it("Should render children and merge custom className with the base class name", () => {
        renderFooter(
            <IslandWidgetFooter>
                <IslandWidgetFooter.Controls data-testid="controls" className="custom-class">
                    <button type="button">Control</button>
                </IslandWidgetFooter.Controls>
            </IslandWidgetFooter>,
        );

        expect(screen.getByRole("button", { name: "Control" })).toBeInTheDocument();
        expect(screen.getByTestId("controls")).toHaveClass("islandWidgetFooterControls", "custom-class");
    });
});
