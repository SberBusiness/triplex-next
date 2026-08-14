import React from "react";
import { render, screen } from "@testing-library/react";
import { UnorderedList } from "../UnorderedList";

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
    });
});
