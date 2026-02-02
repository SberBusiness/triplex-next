import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IslandWidget } from "../IslandWidget";
import { IIslandWidgetBodyProps } from "../components/IslandWidgetBody";
import { IIslandWidgetHeaderProps } from "../components/IslandWidgetHeader";
import { IIslandWidgetFooterProps } from "../components/IslandWidgetFooter";
import { IslandWidgetWrapper } from "../components/IslandWidgetWrapper";
import { useMatchMedia } from "../../MediaWidth/useMatchMedia";
import type { MockedFunction } from "vitest";

const mockedUseMatchMedia = useMatchMedia as MockedFunction<typeof useMatchMedia>;

vi.mock("../../MediaWidth/useMatchMedia", () => ({
    useMatchMedia: vi.fn(),
}));

describe("IslandWidget", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseMatchMedia.mockReturnValue(false);
    });

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

    const defaultRenderExtraFooter = () => <IslandWidget.ExtraFooter>Extra footer content</IslandWidget.ExtraFooter>;

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
            <IslandWidgetWrapper>
                <IslandWidget renderBody={defaultRenderBody} renderHeader={defaultRenderHeader} />
                {defaultRenderExtraFooter()}
            </IslandWidgetWrapper>,
        );

        expect(screen.getByText("Extra footer content")).toBeInTheDocument();
    });

    it("Should render both footer and extra footer when both are provided", () => {
        render(
            <IslandWidgetWrapper>
                <IslandWidget
                    renderBody={defaultRenderBody}
                    renderHeader={defaultRenderHeader}
                    renderFooter={defaultRenderFooter}
                />
                {defaultRenderExtraFooter()}
            </IslandWidgetWrapper>,
        );

        expect(screen.getByText("Footer content")).toBeInTheDocument();
        expect(screen.getByText("Extra footer content")).toBeInTheDocument();
    });

    it("Should hide content by default when adaptive", () => {
        mockedUseMatchMedia.mockReturnValue(true);

        render(
            <IslandWidget
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
                renderFooter={defaultRenderFooter}
            />,
        );

        expect(screen.getByText("Header content")).toBeVisible();
        expect(screen.getByText("Header description")).toBeVisible();
        expect(screen.getByText("Body content")).not.toBeVisible();
        expect(screen.queryByText("Footer content")).not.toBeVisible();
    });

    it("Should show content when adaptive and disableAdaptiveCollapsing is true", () => {
        mockedUseMatchMedia.mockReturnValue(true);

        render(
            <IslandWidget
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
                renderFooter={defaultRenderFooter}
                disableAdaptiveCollapsing={true}
            />,
        );

        expect(screen.getByText("Body content")).toBeVisible();
        expect(screen.getByText("Header content")).toBeVisible();
        expect(screen.getByText("Header description")).toBeVisible();
        expect(screen.getByText("Footer content")).toBeVisible();
    });
});
