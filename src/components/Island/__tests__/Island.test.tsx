import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Island } from "../Island";
import { EIslandType } from "../enums";
import { EComponentSize } from "../../../enums/EComponentSize";

describe("Island", () => {
    test("applies default classes for type", () => {
        const { container } = render(<Island />);
        const root = container.firstElementChild as HTMLElement | null;
        expect(root).toBeTruthy();
        expect(root?.classList.contains("island")).toBe(true);
        expect(root?.classList.contains("type1")).toBe(true);
    });

    test("applies md size class by default", () => {
        render(<Island data-testid="island" />);
        expect(screen.getByTestId("island")).toHaveClass("md");
    });

    test.each([
        [EIslandType.TYPE_1, "type1"],
        [EIslandType.TYPE_2, "type2"],
        [EIslandType.TYPE_3, "type3"],
    ])("applies class for type %s", (type, expectedClassName) => {
        render(<Island data-testid="island" type={type} />);
        expect(screen.getByTestId("island")).toHaveClass(expectedClassName);
    });

    test.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies class for size %s", (size, expectedClassName) => {
        render(<Island data-testid="island" size={size} />);
        expect(screen.getByTestId("island")).toHaveClass(expectedClassName);
    });

    test("merges custom className with base classes", () => {
        render(<Island data-testid="island" className="custom" />);
        expect(screen.getByTestId("island")).toHaveClass("island", "type1", "md", "custom");
    });

    test("renders children", () => {
        render(<Island data-testid="island">Island content</Island>);
        expect(screen.getByTestId("island")).toHaveTextContent("Island content");
    });

    test("forwards ref to root div", () => {
        const ref = createRef<HTMLDivElement>();
        const { container } = render(<Island ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        const root = container.firstElementChild as HTMLDivElement | null;
        expect(ref.current).toBe(root);
    });

    test("supports native HTML attributes and events", () => {
        const handleClick = vi.fn();
        render(<Island role="region" aria-label="island" tabIndex={0} onClick={handleClick} />);
        const region = screen.getByRole("region", { name: "island" });
        expect(region).toBeInTheDocument();
        fireEvent.click(region);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("renders composed Header, Body and Footer as adjacent children in order", () => {
        render(
            <Island data-testid="island">
                <Island.Header data-testid="header">Header</Island.Header>
                <Island.Body data-testid="body">Body</Island.Body>
                <Island.Footer data-testid="footer">Footer</Island.Footer>
            </Island>,
        );

        const root = screen.getByTestId("island");

        expect(screen.getByTestId("header")).toHaveClass("islandHeader");
        expect(screen.getByTestId("body")).toHaveClass("islandBody");
        expect(screen.getByTestId("footer")).toHaveClass("islandFooter");
        // Отступы между блоками задаются смежными селекторами, поэтому части острова должны идти соседними элементами.
        expect(Array.from(root.children)).toEqual([
            screen.getByTestId("header"),
            screen.getByTestId("body"),
            screen.getByTestId("footer"),
        ]);
    });
});
