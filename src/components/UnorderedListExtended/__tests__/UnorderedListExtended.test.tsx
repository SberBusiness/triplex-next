import React from "react";
import { render, screen } from "@testing-library/react";
import { UnorderedListExtended } from "../UnorderedListExtended";

beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

describe("UnorderedListExtended", () => {
    it("renders unordered list with correct tag and structure", () => {
        render(
            <UnorderedListExtended>
                <UnorderedListExtended.Item>First item</UnorderedListExtended.Item>
                <UnorderedListExtended.Item>Second item</UnorderedListExtended.Item>
            </UnorderedListExtended>,
        );

        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();
        expect(list.tagName).toBe("UL");

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent("First item");
        expect(items[1]).toHaveTextContent("Second item");
    });

    it("renders fallback marker inside wrapper when no children provided", () => {
        render(
            <UnorderedListExtended>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker data-testid="extended-marker" />
                    Item with fallback
                </UnorderedListExtended.Item>
            </UnorderedListExtended>,
        );

        const markerWrapper = screen.getByTestId("extended-marker");
        expect(markerWrapper).toBeInTheDocument();
        expect(markerWrapper).toHaveClass("markerWrapper");

        const fallbackDot = markerWrapper.querySelector(".marker");
        expect(fallbackDot).toBeInTheDocument();
    });

    it("renders custom marker content and hides fallback dot", () => {
        render(
            <UnorderedListExtended>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker data-testid="extended-marker">
                        <span data-testid="custom-icon">★</span>
                    </UnorderedListExtended.Item.Marker>
                    Item with custom icon
                </UnorderedListExtended.Item>
            </UnorderedListExtended>,
        );

        const markerWrapper = screen.getByTestId("extended-marker");
        expect(markerWrapper).toBeInTheDocument();

        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
        expect(markerWrapper.querySelector(".marker")).not.toBeInTheDocument();
    });

    it("applies custom className to list", () => {
        render(
            <UnorderedListExtended className="custom-list">
                <UnorderedListExtended.Item>Item</UnorderedListExtended.Item>
            </UnorderedListExtended>,
        );

        const list = screen.getByRole("list");
        expect(list).toHaveClass("custom-list");
    });

    it("passes through HTML attributes to list element", () => {
        render(
            <UnorderedListExtended aria-label="Test list" data-testid="test-list">
                <UnorderedListExtended.Item>Item</UnorderedListExtended.Item>
            </UnorderedListExtended>,
        );

        const list = screen.getByTestId("test-list");
        expect(list).toHaveAttribute("aria-label", "Test list");
    });

    it("applies correct data-tx attribute with version to list", () => {
        render(
            <UnorderedListExtended>
                <UnorderedListExtended.Item>Item</UnorderedListExtended.Item>
            </UnorderedListExtended>,
        );

        const list = screen.getByRole("list");
        expect(list).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("forwards ref to ul element", () => {
        const ref = React.createRef<HTMLUListElement>();
        render(
            <UnorderedListExtended ref={ref}>
                <UnorderedListExtended.Item>Item</UnorderedListExtended.Item>
            </UnorderedListExtended>,
        );

        expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    describe("UnorderedListExtended.Item", () => {
        it("renders list item with correct typography", () => {
            render(<UnorderedListExtended.Item>List item content</UnorderedListExtended.Item>);

            const item = screen.getByRole("listitem");
            expect(item).toBeInTheDocument();
            expect(item).toHaveTextContent("List item content");
            expect(item.tagName).toBe("LI");
        });

        it("applies custom className to list item", () => {
            render(<UnorderedListExtended.Item className="custom-item">Item</UnorderedListExtended.Item>);

            const item = screen.getByRole("listitem");
            expect(item).toHaveClass("custom-item");
        });

        it("passes through HTML attributes to list item", () => {
            render(
                <UnorderedListExtended.Item data-testid="test-item" aria-label="Test item">
                    Item
                </UnorderedListExtended.Item>,
            );

            const item = screen.getByTestId("test-item");
            expect(item).toHaveAttribute("aria-label", "Test item");
        });

        it("applies correct data-tx attribute with version to item", () => {
            render(<UnorderedListExtended.Item>Item</UnorderedListExtended.Item>);

            const item = screen.getByRole("listitem");
            expect(item).toHaveAttribute("data-tx", "1.0.0-test");
        });

        it("forwards ref to li element", () => {
            const ref = React.createRef<HTMLLIElement>();
            render(<UnorderedListExtended.Item ref={ref}>Item</UnorderedListExtended.Item>);

            expect(ref.current).toBeInstanceOf(HTMLLIElement);
        });

        it("renders with li tag", () => {
            render(<UnorderedListExtended.Item>Item</UnorderedListExtended.Item>);

            const item = screen.getByRole("listitem");
            expect(item.tagName).toBe("LI");
        });
    });

    it("maintains component composition", () => {
        expect(UnorderedListExtended).toHaveProperty("Item");
        expect(UnorderedListExtended.Item).toBeDefined();
        expect(UnorderedListExtended.Item).toHaveProperty("Marker");
        expect(UnorderedListExtended.Item.Marker).toBeDefined();
    });
});
