import React from "react";
import { render, screen } from "@testing-library/react";
import { UnorderedList } from "../UnorderedList";
import { IUnorderedListItemProps } from "../types";
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

    it("renders default marker for an item without custom marker", () => {
        render(<UnorderedList items={[{ children: "First item" }]} />);

        const [item] = screen.getAllByRole("listitem");
        const markerWrapper = item.firstElementChild;

        expect(markerWrapper).toHaveClass("markerWrapper");
        expect(markerWrapper?.firstElementChild).toHaveClass("marker");
    });

    it("renders custom marker instead of default one", () => {
        render(<UnorderedList items={[{ children: "First item", marker: <span data-testid="marker">✓</span> }]} />);

        const [item] = screen.getAllByRole("listitem");
        const markerWrapper = item.firstElementChild;

        expect(markerWrapper).toContainElement(screen.getByTestId("marker"));
        expect(markerWrapper?.querySelector(".marker")).toBeNull();
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
    });

    describe("React keys of items", () => {
        const renderAndCollectKeyWarnings = (items: IUnorderedListItemProps[]) => {
            const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

            render(<UnorderedList items={items} />);

            const warnings = consoleError.mock.calls.filter(([message]) => String(message).includes('unique "key"'));
            consoleError.mockRestore();

            return warnings;
        };

        it("falls back to item index when neither key nor id is passed", () => {
            expect(renderAndCollectKeyWarnings([{ children: "First item" }, { children: "Second item" }])).toHaveLength(
                0,
            );
        });

        it("falls back to item id when key is not passed and keeps id as an attribute", () => {
            expect(
                renderAndCollectKeyWarnings([
                    { id: "first", children: "First item" },
                    { id: "second", children: "Second item" },
                ]),
            ).toHaveLength(0);

            const items = screen.getAllByRole("listitem");
            expect(items[0]).toHaveAttribute("id", "first");
            expect(items[1]).toHaveAttribute("id", "second");
        });
    });
});
