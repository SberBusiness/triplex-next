import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IslandWidget } from "../IslandWidget";
import { IIslandWidgetBodyProps } from "../components/IslandWidgetBody";
import { IIslandWidgetHeaderProps } from "../components/IslandWidgetHeader";
import { IIslandWidgetFooterProps } from "../components/IslandWidgetFooter";
import { IIslandWidgetExtraFooterProps } from "../components/IslandWidgetExtraFooter";

describe("IslandWidget", () => {
    const defaultRenderBody = (props: IIslandWidgetBodyProps) => (
        <IslandWidget.Body {...props}>Body content</IslandWidget.Body>
    );
    const defaultRenderHeader = (props: IIslandWidgetHeaderProps) => (
        <IslandWidget.Header {...props}>
            <IslandWidget.Header.Content>Header content</IslandWidget.Header.Content>
            <IslandWidget.Header.Description>Header description</IslandWidget.Header.Description>
        </IslandWidget.Header>
    );

    const defaultRenderFooter = (props: IIslandWidgetFooterProps) => (
        <IslandWidget.Footer {...props}>Footer content</IslandWidget.Footer>
    );

    const defaultRenderExtraFooter = (props: IIslandWidgetExtraFooterProps) => (
        <IslandWidget.ExtraFooter {...props}>Extra footer content</IslandWidget.ExtraFooter>
    );

    it("Should render correctly with required props", () => {
        render(<IslandWidget renderBody={defaultRenderBody} renderHeader={defaultRenderHeader} />);

        expect(screen.getByText("Body content")).toBeInTheDocument();
        expect(screen.getByText("Header content")).toBeInTheDocument();
        expect(screen.getByText("Header description")).toBeInTheDocument();
        expect(screen.queryByText("Footer content")).not.toBeInTheDocument();
        expect(screen.queryByText("Extra footer content")).not.toBeInTheDocument();
    });

    it("Should render footer when renderFooter is provided", () => {
        render(
            <IslandWidget
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
                renderFooter={defaultRenderFooter}
            />,
        );

        expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("Should render extra footer when renderExtraFooter is provided", () => {
        render(
            <IslandWidget
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
                renderExtraFooter={defaultRenderExtraFooter}
            />,
        );

        expect(screen.getByText("Extra footer content")).toBeInTheDocument();
    });

    it("Should render both footer and extra footer when both are provided", () => {
        render(
            <IslandWidget
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
                renderFooter={defaultRenderFooter}
                renderExtraFooter={defaultRenderExtraFooter}
            />,
        );

        expect(screen.getByText("Footer content")).toBeInTheDocument();
        expect(screen.getByText("Extra footer content")).toBeInTheDocument();
    });
});
