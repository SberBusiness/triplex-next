import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IslandWidget } from "../IslandWidget";
import { IslandWidgetExtraFooter } from "../components/IslandWidgetExtraFooter";
import { IslandWidgetWrapper } from "../components/IslandWidgetWrapper";
import { IIslandWidgetBodyProps } from "../components/IslandWidgetBody";
import { IIslandWidgetHeaderProps } from "../components/IslandWidgetHeader";

const renderBody = (props: IIslandWidgetBodyProps) => <IslandWidget.Body {...props}>Body content</IslandWidget.Body>;
const renderHeader = (props: IIslandWidgetHeaderProps) => (
    <IslandWidget.Header {...props}>Header content</IslandWidget.Header>
);

const renderWithWidget = (open: boolean) =>
    render(
        <IslandWidgetWrapper>
            <IslandWidget data-testid="widget" renderBody={renderBody} renderHeader={renderHeader} />
            <IslandWidgetExtraFooter data-testid="extra-footer" open={open}>
                Extra footer content
            </IslandWidgetExtraFooter>
        </IslandWidgetWrapper>,
    );

const getExtraFooter = () => screen.getByTestId("extra-footer");
const getWidget = () => screen.getByTestId("widget");

describe("IslandWidgetExtraFooter", () => {
    it("Should render children", () => {
        render(<IslandWidgetExtraFooter data-testid="extra-footer">Extra footer content</IslandWidgetExtraFooter>);

        expect(screen.getByText("Extra footer content")).toBeInTheDocument();
    });

    it("Should merge custom className with the base class name", () => {
        render(<IslandWidgetExtraFooter data-testid="extra-footer" className="custom-class" />);

        expect(getExtraFooter()).toHaveClass("islandWidgetExtraFooter", "custom-class");
    });

    it("Should spread rest attributes to the root element", () => {
        render(<IslandWidgetExtraFooter data-testid="extra-footer" aria-label="Extra footer" title="title-attr" />);

        expect(getExtraFooter()).toHaveAttribute("aria-label", "Extra footer");
        expect(getExtraFooter()).toHaveAttribute("title", "title-attr");
    });

    it("Should keep content collapsed by default", () => {
        render(<IslandWidgetExtraFooter data-testid="extra-footer">Extra footer content</IslandWidgetExtraFooter>);

        expect(screen.getByText("Extra footer content")).not.toBeVisible();
    });

    it("Should expand content when open is true", () => {
        render(
            <IslandWidgetExtraFooter data-testid="extra-footer" open={true}>
                Extra footer content
            </IslandWidgetExtraFooter>,
        );

        expect(screen.getByText("Extra footer content")).toBeVisible();
    });

    it("Should render without IslandWidgetWrapper, silently ignoring the layout context", () => {
        expect(() =>
            render(
                <IslandWidgetExtraFooter open={true} data-testid="extra-footer">
                    Extra footer content
                </IslandWidgetExtraFooter>,
            ),
        ).not.toThrow();

        expect(screen.getByText("Extra footer content")).toBeVisible();
    });

    it("Should not mark the widget with the extra footer shadow when closed", () => {
        renderWithWidget(false);

        expect(getWidget()).not.toHaveClass("islandWidgetWithExtraFooter");
    });

    it("Should mark the widget with the extra footer shadow when open", () => {
        renderWithWidget(true);

        expect(getWidget()).toHaveClass("islandWidget", "islandWidgetWithExtraFooter");
    });

    it("Should update the widget shadow when open changes", () => {
        const { rerender } = renderWithWidget(false);

        expect(getWidget()).not.toHaveClass("islandWidgetWithExtraFooter");

        rerender(
            <IslandWidgetWrapper>
                <IslandWidget data-testid="widget" renderBody={renderBody} renderHeader={renderHeader} />
                <IslandWidgetExtraFooter data-testid="extra-footer" open={true}>
                    Extra footer content
                </IslandWidgetExtraFooter>
            </IslandWidgetWrapper>,
        );

        expect(getWidget()).toHaveClass("islandWidgetWithExtraFooter");
    });
});
