import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { List } from "../List";

const getList = () => screen.getByRole("list");

describe("List", () => {
    it("Should render with default props", () => {
        render(
            <List>
                <li>Item 1</li>
                <li>Item 2</li>
            </List>,
        );
        const list = getList();
        expect(list).toBeInTheDocument();
        expect(list.tagName).toBe("UL");
    });

    it("Should render LoaderWidget when loading is true", () => {
        render(
            <List loading>
                <li>Item</li>
            </List>,
        );
        const list = getList();
        const loader = list.querySelector('[role="status"]');
        expect(loader).toBeInTheDocument();
    });

    it("Should render empty list when no children provided", () => {
        render(<List />);
        const list = getList();
        expect(list).toBeInTheDocument();
        expect(list.children.length).toBe(0);
    });
});
