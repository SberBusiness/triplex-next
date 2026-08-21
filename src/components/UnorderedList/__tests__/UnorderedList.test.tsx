import React from "react";
import { render, screen } from "@testing-library/react";
import { UnorderedList } from "../UnorderedList";
import { EFontType, EFontWeightText, ETextSize } from "../../Typography";

beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

describe("UnorderedList", () => {
    const mockItems = [
        { key: "first", children: "First item" },
        { key: "second", children: "Second item", marker: <span data-testid="custom-marker">✓</span> },
    ];

    it("renders unordered list with correct tag and items structure", () => {
        render(<UnorderedList items={mockItems} />);

        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();
        expect(list.tagName).toBe("UL");

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent("First item");
        expect(items[1]).toHaveTextContent("Second item");
    });

    it("renders custom marker when passed in items", () => {
        render(<UnorderedList items={mockItems} />);

        const customMarker = screen.getByTestId("custom-marker");
        expect(customMarker).toBeInTheDocument();
        expect(customMarker).toHaveTextContent("✓");
    });

    it("applies custom className to list", () => {
        render(<UnorderedList items={mockItems} className="custom-list" />);

        const list = screen.getByRole("list");
        expect(list).toHaveClass("custom-list");
    });

    it("passes through HTML attributes to list element", () => {
        render(<UnorderedList items={mockItems} aria-label="Test list" data-testid="test-list" />);

        const list = screen.getByTestId("test-list");
        expect(list).toHaveAttribute("aria-label", "Test list");
    });

    it("applies correct data-tx attribute with version to list", () => {
        render(<UnorderedList items={mockItems} />);

        const list = screen.getByRole("list");
        expect(list).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("forwards ref to ul element", () => {
        const ref = React.createRef<HTMLUListElement>();
        render(<UnorderedList items={mockItems} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it("renders empty list when items are not passed", () => {
        render(<UnorderedList />);

        const list = screen.getByRole("list");
        expect(list).toBeEmptyDOMElement();
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("renders empty list when items array is empty", () => {
        render(<UnorderedList items={[]} />);

        expect(screen.getByRole("list")).toBeEmptyDOMElement();
    });

    it("renders marker wrapper before the content of an item", () => {
        render(<UnorderedList items={[{ children: "First item" }]} />);

        const [item] = screen.getAllByRole("listitem");

        // Обёртка маркера — единственный дочерний элемент, содержимое идёт после неё текстовым узлом.
        expect(item.children).toHaveLength(1);
        expect(item.firstElementChild?.tagName).toBe("SPAN");
        expect(item).toHaveTextContent("First item");
    });

    it("passes marker from an item into its marker wrapper", () => {
        render(<UnorderedList items={[{ children: "First item", marker: <span data-testid="marker">✓</span> }]} />);

        const [item] = screen.getAllByRole("listitem");

        expect(item.firstElementChild).toContainElement(screen.getByTestId("marker"));
    });

    describe("UnorderedList.Item attributes proxying", () => {
        it("passes individual item properties down to list items", () => {
            const itemsWithProps = [
                { key: "proxy-item", children: "Item", className: "custom-item", "data-testid": "test-item" },
            ];
            render(<UnorderedList items={itemsWithProps} />);

            const item = screen.getByTestId("test-item");
            expect(item).toBeInTheDocument();
            expect(item).toHaveClass("custom-item");
            expect(item.tagName).toBe("LI");
            expect(item).toHaveAttribute("data-tx", "1.0.0-test");
        });

        it("passes typography props of an item down to its element", () => {
            render(
                <UnorderedList
                    items={[
                        {
                            key: "typography-item",
                            children: "Item",
                            size: ETextSize.B1,
                            type: EFontType.SECONDARY,
                            weight: EFontWeightText.SEMIBOLD,
                            "data-testid": "typography-item",
                        },
                    ]}
                />,
            );

            const item = screen.getByTestId("typography-item");
            expect(item).toHaveClass("b1");
            expect(item).toHaveClass("secondary");
            expect(item).toHaveClass("semibold");
        });

        it("renders items with the default B3 size when size is not passed", () => {
            render(<UnorderedList items={[{ key: "default-size", children: "Item" }]} />);

            expect(screen.getAllByRole("listitem")[0]).toHaveClass("b3");
        });

        it("forwards ref passed inside an item object to the li element", () => {
            const ref = React.createRef<HTMLLIElement>();
            render(<UnorderedList items={[{ key: "item-with-ref", ref, children: "Item" }]} />);

            expect(ref.current).toBeInstanceOf(HTMLLIElement);
            expect(ref.current).toBe(screen.getByRole("listitem"));
        });
    });

    describe("React keys of items", () => {
        // Ключ элемента напрямую не наблюдаем, поэтому проверяется его следствие: при перестановке
        // элементов React переиспользует DOM-узел того элемента, чей ключ совпал.
        it("falls back to item id when key is not passed and keeps id as an attribute", () => {
            const { rerender } = render(
                <UnorderedList
                    items={[
                        { id: "first", children: "First item" },
                        { id: "second", children: "Second item" },
                    ]}
                />,
            );
            const [firstItem] = screen.getAllByRole("listitem");
            expect(firstItem).toHaveAttribute("id", "first");

            rerender(
                <UnorderedList
                    items={[
                        { id: "second", children: "Second item" },
                        { id: "first", children: "First item" },
                    ]}
                />,
            );

            // Узел переехал вместе со своим элементом — значит ключом был id, а не индекс.
            expect(screen.getAllByRole("listitem")[1]).toBe(firstItem);
        });

        it("prefers explicit key over id", () => {
            const { rerender } = render(
                <UnorderedList
                    items={[
                        { key: "one", id: "first", children: "First item" },
                        { key: "two", id: "second", children: "Second item" },
                    ]}
                />,
            );
            const [firstItem] = screen.getAllByRole("listitem");

            // Порядок ключей прежний, а id переставлены местами.
            rerender(
                <UnorderedList
                    items={[
                        { key: "one", id: "second", children: "First item" },
                        { key: "two", id: "first", children: "Second item" },
                    ]}
                />,
            );

            // Узел остался на месте вслед за ключом, id при этом обновился.
            expect(screen.getAllByRole("listitem")[0]).toBe(firstItem);
            expect(firstItem).toHaveAttribute("id", "second");
        });

        it("falls back to item index when neither key nor id is passed", () => {
            const { rerender } = render(
                <UnorderedList items={[{ children: "First item" }, { children: "Second item" }]} />,
            );
            const [firstItem] = screen.getAllByRole("listitem");

            rerender(<UnorderedList items={[{ children: "Second item" }, { children: "First item" }]} />);

            // Ключом остался индекс, поэтому узел не переехал, а сменил содержимое.
            expect(screen.getAllByRole("listitem")[0]).toBe(firstItem);
            expect(firstItem).toHaveTextContent("Second item");
        });
    });
});
