import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeAll, beforeEach, afterAll } from "vitest";
import { IslandWidget } from "../IslandWidget";
import { IIslandWidgetBodyProps } from "../components/IslandWidgetBody";
import { IIslandWidgetHeaderProps } from "../components/IslandWidgetHeader";
import { IIslandWidgetFooterProps } from "../components/IslandWidgetFooter";
import { IslandWidgetWrapper } from "../components/IslandWidgetWrapper";
import { useMatchMedia } from "../../MediaWidth/useMatchMedia";
import { EComponentSize } from "../../../enums/EComponentSize";
import type { MockedFunction } from "vitest";

const mockedUseMatchMedia = useMatchMedia as MockedFunction<typeof useMatchMedia>;

vi.mock("../../MediaWidth/useMatchMedia", () => ({
    useMatchMedia: vi.fn(),
}));

beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

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
            <IslandWidget.Header.Title>Header content</IslandWidget.Header.Title>
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

    it("Should render extra footer placed next to the widget inside the wrapper", () => {
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

    it.each(Object.values(EComponentSize))("Should render description with B4 size on desktop in %s", (size) => {
        render(<IslandWidget size={size} renderBody={defaultRenderBody} renderHeader={defaultRenderHeader} />);

        expect(screen.getByText("Header description")).toHaveClass("b4");
    });

    it.each([EComponentSize.MD, EComponentSize.LG])(
        "Should render description with B3 size in adaptive in %s",
        (size) => {
            mockedUseMatchMedia.mockReturnValue(true);

            render(<IslandWidget size={size} renderBody={defaultRenderBody} renderHeader={defaultRenderHeader} />);

            expect(screen.getByText("Header description")).toHaveClass("b3");
        },
    );

    it("Should keep description B4 size in adaptive for sm", () => {
        mockedUseMatchMedia.mockReturnValue(true);

        render(
            <IslandWidget size={EComponentSize.SM} renderBody={defaultRenderBody} renderHeader={defaultRenderHeader} />,
        );

        expect(screen.getByText("Header description")).toHaveClass("b4");
    });

    it("Should toggle content on header click in adaptive", async () => {
        const user = userEvent.setup();

        mockedUseMatchMedia.mockReturnValue(true);

        render(
            <IslandWidget
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
                renderFooter={defaultRenderFooter}
            />,
        );

        expect(screen.getByText("Body content")).not.toBeVisible();

        await user.click(screen.getByText("Header content"));

        expect(screen.getByText("Body content")).toBeVisible();
        expect(screen.getByText("Footer content")).toBeVisible();

        await user.click(screen.getByText("Header content"));

        // Сворачивание идёт через анимацию ExpandAnimation, контент скрывается по её завершении.
        await waitFor(() => {
            expect(screen.getByText("Body content")).not.toBeVisible();
        });
    });

    it("Should not collapse content on header click in adaptive when disableAdaptiveCollapsing is true", async () => {
        const user = userEvent.setup();

        mockedUseMatchMedia.mockReturnValue(true);

        render(
            <IslandWidget
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
                disableAdaptiveCollapsing={true}
            />,
        );

        await user.click(screen.getByText("Header content"));

        expect(screen.getByText("Body content")).toBeVisible();
    });

    it("Should keep content visible on header click on desktop", async () => {
        const user = userEvent.setup();

        render(<IslandWidget renderBody={defaultRenderBody} renderHeader={defaultRenderHeader} />);

        await user.click(screen.getByText("Header content"));

        expect(screen.getByText("Body content")).toBeVisible();
    });

    it("Should merge custom className with the base class name", () => {
        render(
            <IslandWidget
                data-testid="widget"
                className="custom-class"
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
            />,
        );

        expect(screen.getByTestId("widget")).toHaveClass("islandWidget", "custom-class");
    });

    it("Should spread rest attributes to the root element", () => {
        render(
            <IslandWidget
                data-testid="widget"
                aria-label="Widget"
                title="title-attr"
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
            />,
        );

        expect(screen.getByTestId("widget")).toHaveAttribute("aria-label", "Widget");
        expect(screen.getByTestId("widget")).toHaveAttribute("title", "title-attr");
    });

    it("Should set data-tx attribute with the library version on the root element", () => {
        render(<IslandWidget data-testid="widget" renderBody={defaultRenderBody} renderHeader={defaultRenderHeader} />);

        expect(screen.getByTestId("widget")).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("Should not let consumer override data-tx attribute", () => {
        render(
            <IslandWidget
                data-testid="widget"
                data-tx="consumer-value"
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
            />,
        );

        expect(screen.getByTestId("widget")).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <IslandWidget
                ref={ref}
                data-testid="widget"
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
            />,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("widget"));
    });

    it("Should forward callback ref to the root div", () => {
        let node: HTMLDivElement | null = null;

        render(
            <IslandWidget
                ref={(instance) => {
                    node = instance;
                }}
                data-testid="widget"
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
            />,
        );

        expect(node).toBe(screen.getByTestId("widget"));
    });

    it.each(Object.values(EComponentSize))("Should pass %s size down to the widget parts", (size) => {
        render(
            <IslandWidget
                size={size}
                renderBody={defaultRenderBody}
                renderHeader={defaultRenderHeader}
                renderFooter={defaultRenderFooter}
            />,
        );

        expect(screen.getByText("Body content")).toHaveClass("islandWidgetBody", size);
        expect(screen.getByText("Footer content")).toHaveClass("islandWidgetFooter", size);
    });
});
