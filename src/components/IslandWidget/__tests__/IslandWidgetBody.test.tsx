import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IslandWidgetBody } from "../components/IslandWidgetBody";
import { IIslandWidgetContext, IslandWidgetContext } from "../IslandWidgetContext";
import { EComponentSize } from "../../../enums/EComponentSize";

const CONTEXT_DEFAULT: IIslandWidgetContext = {
    adaptive: false,
    disableAdaptiveCollapsing: false,
    open: false,
    size: EComponentSize.MD,
};

const renderBody = (children: React.ReactNode, context: Partial<IIslandWidgetContext> = {}) =>
    render(
        <IslandWidgetContext.Provider value={{ ...CONTEXT_DEFAULT, ...context }}>
            {children}
        </IslandWidgetContext.Provider>,
    );

const getBody = () => screen.getByTestId("body");

describe("IslandWidgetBody", () => {
    it("Should render children", () => {
        renderBody(<IslandWidgetBody data-testid="body">Body content</IslandWidgetBody>);

        expect(screen.getByText("Body content")).toBeInTheDocument();
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("Should take %s size class name from the widget context", (size, className) => {
        renderBody(<IslandWidgetBody data-testid="body" />, { size });

        expect(getBody()).toHaveClass("islandWidgetBody", className);
    });

    it("Should merge custom className with the base class name", () => {
        renderBody(<IslandWidgetBody data-testid="body" className="custom-class" />);

        expect(getBody()).toHaveClass("islandWidgetBody", "custom-class");
    });

    it("Should spread rest attributes to the root element", () => {
        renderBody(<IslandWidgetBody data-testid="body" aria-label="Widget body" title="title-attr" />);

        expect(getBody()).toHaveAttribute("aria-label", "Widget body");
        expect(getBody()).toHaveAttribute("title", "title-attr");
    });
});
