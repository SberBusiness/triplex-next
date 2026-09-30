import React from "react";
import { render, screen } from "@testing-library/react";
import { Ellipsis } from "../Ellipsis";

const LINE_CLAMP_VAR = "--triplex-next-runtime-Ellipsis-Root_LineClamp";

describe("Ellipsis", () => {
    it("Should render children correctly", () => {
        const text = "Test text content";
        render(<Ellipsis maxLines={2}>{text}</Ellipsis>);

        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it("Should apply maxLines as CSS variable correctly", () => {
        const maxLines = 3;
        render(<Ellipsis maxLines={maxLines}>Test text</Ellipsis>);

        expect(screen.getByText("Test text")).toHaveStyle({ [LINE_CLAMP_VAR]: String(maxLines) });
    });

    it("Should apply oneLine class when maxLines is 1", () => {
        render(<Ellipsis maxLines={1}>Test text</Ellipsis>);

        const element = screen.getByText("Test text");
        expect(element).toHaveClass("oneLine");
        expect(element).toHaveStyle({ [LINE_CLAMP_VAR]: "1" });
    });

    it("Should not apply oneLine class when maxLines is greater than 1", () => {
        render(<Ellipsis maxLines={2}>Test text</Ellipsis>);

        expect(screen.getByText("Test text")).not.toHaveClass("oneLine");
    });

    it("Should merge custom style with the line clamp CSS variable", () => {
        render(
            <Ellipsis maxLines={4} style={{ color: "red" }}>
                Test text
            </Ellipsis>,
        );

        const element = screen.getByText("Test text");
        expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
        expect(element).toHaveStyle({ [LINE_CLAMP_VAR]: "4" });
    });

    it("Should merge custom className into root element", () => {
        render(
            <Ellipsis maxLines={2} className="custom-class">
                Test text
            </Ellipsis>,
        );

        const element = screen.getByText("Test text");
        expect(element).toHaveClass("custom-class");
        expect(element).toHaveClass("ellipsisLineClamp");
    });

    it("Should spread rest props to root element", () => {
        render(
            <Ellipsis maxLines={2} id="ellipsis-id" aria-label="Описание">
                Test text
            </Ellipsis>,
        );

        const element = screen.getByText("Test text");
        expect(element).toHaveAttribute("id", "ellipsis-id");
        expect(element).toHaveAttribute("aria-label", "Описание");
    });

    it("Should forward ref to root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Ellipsis maxLines={2} ref={ref}>
                Test text
            </Ellipsis>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveTextContent("Test text");
    });
});
