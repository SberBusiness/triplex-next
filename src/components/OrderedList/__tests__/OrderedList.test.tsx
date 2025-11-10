import React from "react";
import { render, screen } from "@testing-library/react";
import { OrderedList } from "@sberbusiness/triplex-next/components/OrderedList/OrderedList";

// Мокаем process.env.npm_package_version
beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

describe("OrderedList", () => {
    it("renders ordered list with correct tag and structure", () => {
        render(
            <OrderedList>
                <OrderedList.Item>First item</OrderedList.Item>
                <OrderedList.Item>Second item</OrderedList.Item>
            </OrderedList>,
        );

        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();
        expect(list.tagName).toBe("OL");

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent("First item");
        expect(items[1]).toHaveTextContent("Second item");
    });

    it("applies custom className to list", () => {
        render(
            <OrderedList className="custom-list">
                <OrderedList.Item>Item</OrderedList.Item>
            </OrderedList>,
        );

        const list = screen.getByRole("list");
        expect(list).toHaveClass("custom-list");
    });

    it("passes through HTML attributes to list element", () => {
        render(
            <OrderedList aria-label="Test list" data-testid="test-list">
                <OrderedList.Item>Item</OrderedList.Item>
            </OrderedList>,
        );

        const list = screen.getByTestId("test-list");
        expect(list).toHaveAttribute("aria-label", "Test list");
    });

    it("applies correct data-tx attribute with version to list", () => {
        render(
            <OrderedList>
                <OrderedList.Item>Item</OrderedList.Item>
            </OrderedList>,
        );

        const list = screen.getByRole("list");
        expect(list).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("forwards ref to ol element", () => {
        const ref = vi.fn();
        render(
            <OrderedList ref={ref}>
                <OrderedList.Item>Item</OrderedList.Item>
            </OrderedList>,
        );

        expect(ref).toHaveBeenCalledWith(expect.any(HTMLOListElement));
    });

    describe("OrderedList.Item", () => {
        it("renders list item with correct typography", () => {
            render(<OrderedList.Item>List item content</OrderedList.Item>);

            const item = screen.getByRole("listitem");
            expect(item).toBeInTheDocument();
            expect(item).toHaveTextContent("List item content");
            expect(item.tagName).toBe("LI");
        });

        it("applies custom className to list item", () => {
            render(<OrderedList.Item className="custom-item">Item</OrderedList.Item>);

            const item = screen.getByRole("listitem");
            expect(item).toHaveClass("custom-item");
        });

        it("passes through HTML attributes to list item", () => {
            render(
                <OrderedList.Item data-testid="test-item" aria-label="Test item">
                    Item
                </OrderedList.Item>,
            );

            const item = screen.getByTestId("test-item");
            expect(item).toHaveAttribute("aria-label", "Test item");
        });

        it("applies correct data-tx attribute with version to item", () => {
            render(<OrderedList.Item>Item</OrderedList.Item>);

            const item = screen.getByRole("listitem");
            expect(item).toHaveAttribute("data-tx", "1.0.0-test");
        });

        it("forwards ref to li element", () => {
            const ref = vi.fn();
            render(<OrderedList.Item ref={ref}>Item</OrderedList.Item>);

            expect(ref).toHaveBeenCalledWith(expect.any(HTMLLIElement));
        });

        it("renders with li tag", () => {
            render(<OrderedList.Item>Item</OrderedList.Item>);

            const item = screen.getByRole("listitem");
            expect(item.tagName).toBe("LI");
        });
    });

    it("maintains component composition", () => {
        expect(OrderedList).toHaveProperty("Item");
        expect(OrderedList.Item).toBeDefined();
    });
});
