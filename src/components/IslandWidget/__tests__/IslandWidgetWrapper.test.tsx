import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { IslandWidgetWrapper } from "../components/IslandWidgetWrapper";
import { IslandWidgetLayoutContext } from "../IslandWidgetLayoutContext";

const getWrapper = () => screen.getByTestId("wrapper");

const LayoutContextProbe: React.FC = () => {
    const { hasExtraFooter, setHasExtraFooter } = useContext(IslandWidgetLayoutContext);

    return (
        <button type="button" onClick={() => setHasExtraFooter(!hasExtraFooter)}>
            {String(hasExtraFooter)}
        </button>
    );
};

describe("IslandWidgetWrapper", () => {
    it("Should render children", () => {
        render(<IslandWidgetWrapper data-testid="wrapper">Wrapper content</IslandWidgetWrapper>);

        expect(screen.getByText("Wrapper content")).toBeInTheDocument();
    });

    it("Should merge custom className with the base class name", () => {
        render(<IslandWidgetWrapper data-testid="wrapper" className="custom-class" />);

        expect(getWrapper()).toHaveClass("islandWidgetWrapper", "custom-class");
    });

    it("Should spread rest attributes to the root element", () => {
        render(<IslandWidgetWrapper data-testid="wrapper" aria-label="Widget wrapper" title="title-attr" />);

        expect(getWrapper()).toHaveAttribute("aria-label", "Widget wrapper");
        expect(getWrapper()).toHaveAttribute("title", "title-attr");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<IslandWidgetWrapper ref={ref} data-testid="wrapper" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getWrapper());
    });

    it("Should forward callback ref to the root div", () => {
        let node: HTMLDivElement | null = null;

        render(
            <IslandWidgetWrapper
                ref={(instance) => {
                    node = instance;
                }}
                data-testid="wrapper"
            />,
        );

        expect(node).toBe(getWrapper());
    });

    it("Should provide the layout context with hasExtraFooter false by default", () => {
        render(
            <IslandWidgetWrapper>
                <LayoutContextProbe />
            </IslandWidgetWrapper>,
        );

        expect(screen.getByRole("button")).toHaveTextContent("false");
    });

    it("Should update hasExtraFooter through the layout context setter", async () => {
        const user = userEvent.setup();

        render(
            <IslandWidgetWrapper>
                <LayoutContextProbe />
            </IslandWidgetWrapper>,
        );

        await user.click(screen.getByRole("button"));

        expect(screen.getByRole("button")).toHaveTextContent("true");
    });
});
