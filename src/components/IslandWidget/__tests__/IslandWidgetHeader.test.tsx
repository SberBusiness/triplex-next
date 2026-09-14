import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { IslandWidgetHeader } from "../components/IslandWidgetHeader";
import { IslandWidgetHeaderContent } from "../components/IslandWidgetHeaderContent";
import { IIslandWidgetContext, IslandWidgetContext } from "../IslandWidgetContext";
import { EComponentSize } from "../../../enums/EComponentSize";

const CONTEXT_DEFAULT: IIslandWidgetContext = {
    adaptive: false,
    disableAdaptiveCollapsing: false,
    open: false,
    size: EComponentSize.MD,
};

const renderHeader = (children: React.ReactNode, context: Partial<IIslandWidgetContext> = {}) =>
    render(
        <IslandWidgetContext.Provider value={{ ...CONTEXT_DEFAULT, ...context }}>
            {children}
        </IslandWidgetContext.Provider>,
    );

const getHeader = () => screen.getByTestId("header");

describe("IslandWidgetHeader", () => {
    it("Should render children", () => {
        renderHeader(<IslandWidgetHeader data-testid="header">Header content</IslandWidgetHeader>);

        expect(screen.getByText("Header content")).toBeInTheDocument();
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("Should set %s size class name", (size, className) => {
        renderHeader(<IslandWidgetHeader data-testid="header" />, { size });

        expect(getHeader()).toHaveClass("islandWidgetHeader", className);
    });

    it("Should merge custom className with the base class name", () => {
        renderHeader(<IslandWidgetHeader data-testid="header" className="custom-class" />);

        expect(getHeader()).toHaveClass("islandWidgetHeader", "custom-class");
    });

    it("Should spread rest attributes to the root element", () => {
        renderHeader(<IslandWidgetHeader data-testid="header" aria-label="Widget header" title="title-attr" />);

        expect(getHeader()).toHaveAttribute("aria-label", "Widget header");
        expect(getHeader()).toHaveAttribute("title", "title-attr");
    });

    it("Should not render the collapse indicator on desktop", () => {
        const { container } = renderHeader(<IslandWidgetHeader data-testid="header" />, { adaptive: false });

        expect(container.querySelector(".caretWrapper")).toBeNull();
    });

    it("Should render the collapse indicator in adaptive", () => {
        const { container } = renderHeader(<IslandWidgetHeader data-testid="header" />, { adaptive: true });

        const caret = container.querySelector(".caretWrapper");

        expect(caret).toBeInTheDocument();
        // Индикатор декоративный: состояние сворачивания передаётся не им, а классом open.
        expect(caret?.firstElementChild).toHaveAttribute("aria-hidden", "true");
    });

    it("Should not render the collapse indicator in adaptive when collapsing is disabled", () => {
        const { container } = renderHeader(<IslandWidgetHeader data-testid="header" />, {
            adaptive: true,
            disableAdaptiveCollapsing: true,
        });

        expect(container.querySelector(".caretWrapper")).toBeNull();
        expect(getHeader()).toHaveClass("disableAdaptiveCollapsing");
    });

    it("Should not set disableAdaptiveCollapsing class name on desktop", () => {
        renderHeader(<IslandWidgetHeader data-testid="header" />, {
            adaptive: false,
            disableAdaptiveCollapsing: true,
        });

        expect(getHeader()).not.toHaveClass("disableAdaptiveCollapsing");
    });

    it.each([true, false])("Should reflect open state %s in the class name", (open) => {
        renderHeader(<IslandWidgetHeader data-testid="header" />, { adaptive: true, open });

        if (open) {
            expect(getHeader()).toHaveClass("open");
        } else {
            expect(getHeader()).not.toHaveClass("open");
        }
    });
});

describe("IslandWidgetHeader.Title", () => {
    it("Should render children and merge custom className", () => {
        renderHeader(
            <IslandWidgetHeader>
                <IslandWidgetHeader.Title data-testid="title" className="custom-class">
                    Title
                </IslandWidgetHeader.Title>
            </IslandWidgetHeader>,
        );

        expect(screen.getByTestId("title")).toHaveTextContent("Title");
        expect(screen.getByTestId("title")).toHaveClass("islandWidgetHeaderTitle", "custom-class");
    });
});

describe("IslandWidgetHeader.Description", () => {
    it("Should render children and merge custom className", () => {
        renderHeader(
            <IslandWidgetHeader>
                <IslandWidgetHeader.Description data-testid="description" className="custom-class">
                    Description
                </IslandWidgetHeader.Description>
            </IslandWidgetHeader>,
        );

        expect(screen.getByTestId("description")).toHaveTextContent("Description");
        expect(screen.getByTestId("description")).toHaveClass("islandWidgetHeaderDescription", "custom-class");
    });
});

describe("IslandWidgetHeader.Controls", () => {
    it("Should render children and merge custom className", () => {
        renderHeader(
            <IslandWidgetHeader>
                <IslandWidgetHeader.Controls data-testid="controls" className="custom-class">
                    <button type="button">Control</button>
                </IslandWidgetHeader.Controls>
            </IslandWidgetHeader>,
        );

        expect(screen.getByRole("button", { name: "Control" })).toBeInTheDocument();
        expect(screen.getByTestId("controls")).toHaveClass("islandWidgetHeaderControls", "custom-class");
    });

    it("Should stop click propagation so interacting with controls does not toggle the widget", async () => {
        const user = userEvent.setup();
        const onOuterClick = vi.fn();

        renderHeader(
            <div onClick={onOuterClick}>
                <IslandWidgetHeader>
                    <IslandWidgetHeader.Controls>
                        <button type="button">Control</button>
                    </IslandWidgetHeader.Controls>
                </IslandWidgetHeader>
            </div>,
            { adaptive: true },
        );

        await user.click(screen.getByRole("button", { name: "Control" }));

        expect(onOuterClick).not.toHaveBeenCalled();
    });

    it("Should let clicks outside controls reach the outer handler", async () => {
        const user = userEvent.setup();
        const onOuterClick = vi.fn();

        renderHeader(
            <div onClick={onOuterClick}>
                <IslandWidgetHeader>
                    <IslandWidgetHeader.Title>Title</IslandWidgetHeader.Title>
                </IslandWidgetHeader>
            </div>,
            { adaptive: true },
        );

        await user.click(screen.getByText("Title"));

        expect(onOuterClick).toHaveBeenCalledTimes(1);
    });
});

describe("IslandWidgetHeaderContent", () => {
    it("Should render children and keep custom className", () => {
        renderHeader(
            <IslandWidgetHeader>
                <IslandWidgetHeaderContent data-testid="content" className="custom-class">
                    Content
                </IslandWidgetHeaderContent>
            </IslandWidgetHeader>,
        );

        expect(screen.getByTestId("content")).toHaveTextContent("Content");
        expect(screen.getByTestId("content")).toHaveClass("custom-class");
    });
});
