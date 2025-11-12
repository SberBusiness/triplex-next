import React from "react";
import { render, screen } from "@testing-library/react";
import { UnorderedList } from "@sberbusiness/triplex-next/components/UnorderedList/UnorderedList";

// Мокаем process.env.npm_package_version
beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

describe("UnorderedList", () => {
    it("renders unordered list with correct tag and structure", () => {
        render(
            <UnorderedList>
                <UnorderedList.Item>First item</UnorderedList.Item>
                <UnorderedList.Item>Second item</UnorderedList.Item>
            </UnorderedList>,
        );

        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();
        expect(list.tagName).toBe("UL");

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent("First item");
        expect(items[1]).toHaveTextContent("Second item");
    });

    it("applies custom className to list", () => {
        render(
            <UnorderedList className="custom-list">
                <UnorderedList.Item>Item</UnorderedList.Item>
            </UnorderedList>,
        );

        const list = screen.getByRole("list");
        expect(list).toHaveClass("custom-list");
    });

    it("passes through HTML attributes to list element", () => {
        render(
            <UnorderedList aria-label="Test list" data-testid="test-list">
                <UnorderedList.Item>Item</UnorderedList.Item>
            </UnorderedList>,
        );

        const list = screen.getByTestId("test-list");
        expect(list).toHaveAttribute("aria-label", "Test list");
    });

    it("applies correct data-tx attribute with version to list", () => {
        render(
            <UnorderedList>
                <UnorderedList.Item>Item</UnorderedList.Item>
            </UnorderedList>,
        );

        const list = screen.getByRole("list");
        expect(list).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("forwards ref to ul element", () => {
        const ref = vi.fn();
        render(
            <UnorderedList ref={ref}>
                <UnorderedList.Item>Item</UnorderedList.Item>
            </UnorderedList>,
        );

        expect(ref).toHaveBeenCalledWith(expect.any(HTMLUListElement));
    });

    describe("UnorderedList.Item", () => {
        it("renders list item with correct typography", () => {
            render(<UnorderedList.Item>List item content</UnorderedList.Item>);

            const item = screen.getByRole("listitem");
            expect(item).toBeInTheDocument();
            expect(item).toHaveTextContent("List item content");
            expect(item.tagName).toBe("LI");
        });

        it("applies custom className to list item", () => {
            render(<UnorderedList.Item className="custom-item">Item</UnorderedList.Item>);

            const item = screen.getByRole("listitem");
            expect(item).toHaveClass("custom-item");
        });

        it("passes through HTML attributes to list item", () => {
            render(
                <UnorderedList.Item data-testid="test-item" aria-label="Test item">
                    Item
                </UnorderedList.Item>,
            );

            const item = screen.getByTestId("test-item");
            expect(item).toHaveAttribute("aria-label", "Test item");
        });

        it("applies correct data-tx attribute with version to item", () => {
            render(<UnorderedList.Item>Item</UnorderedList.Item>);

            const item = screen.getByRole("listitem");
            expect(item).toHaveAttribute("data-tx", "1.0.0-test");
        });

        it("forwards ref to li element", () => {
            const ref = vi.fn();
            render(<UnorderedList.Item ref={ref}>Item</UnorderedList.Item>);

            expect(ref).toHaveBeenCalledWith(expect.any(HTMLLIElement));
        });

        it("renders with li tag", () => {
            render(<UnorderedList.Item>Item</UnorderedList.Item>);

            const item = screen.getByRole("listitem");
            expect(item.tagName).toBe("LI");
        });
    });

    it("maintains component composition", () => {
        expect(UnorderedList).toHaveProperty("Item");
        expect(UnorderedList.Item).toBeDefined();
    });
});
