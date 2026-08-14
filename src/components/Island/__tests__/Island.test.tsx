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

    test("does not render loader screen by default", () => {
        render(<Island data-testid="island">Island content</Island>);
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    test("renders loader screen over content when loading", () => {
        const { rerender } = render(
            <Island data-testid="island-loading" loading>
                <Island.Body>Island Body</Island.Body>
            </Island>,
        );

        const root = screen.getByTestId("island-loading");
        // Лоадер лежит поверх контента — последним потомком карточки, контент при этом остаётся в DOM.
        expect(root).toHaveTextContent("Island Body");
        expect(root.lastElementChild).toContainElement(screen.getByRole("status"));

        rerender(
            <Island data-testid="island-loading">
                <Island.Body>Island Body</Island.Body>
            </Island>,
        );
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    test("passes loaderScreenProps to loader screen and merges its className", () => {
        render(
            <Island
                data-testid="island"
                loading
                loaderScreenProps={{ className: "custom", description: "Загрузка" }}
            />,
        );

        const loaderScreen = screen.getByTestId("island").lastElementChild;
        // Пользовательский класс добавляется к внутреннему, а не затирает его: на islandLoaderScreen
        // держится локальный z-index, без которого лоадер уходит под глобальные оверлеи.
        expect(loaderScreen).toHaveClass("islandLoaderScreen", "custom");
        expect(loaderScreen).toHaveTextContent("Загрузка");
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
