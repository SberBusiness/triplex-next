import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TreeViewGroup } from "../components/TreeViewGroup";

describe("TreeViewGroup", () => {
    it("Рендерит ul с role=group и children", () => {
        render(
            <TreeViewGroup>
                <li>Item</li>
            </TreeViewGroup>,
        );

        const group = screen.getByRole("group");

        expect(group.tagName).toBe("UL");
        expect(group).toHaveTextContent("Item");
    });

    it("Мерджит className с собственным классом", () => {
        render(<TreeViewGroup className="custom-class" />);

        expect(screen.getByRole("group")).toHaveClass("treeViewGroup", "custom-class");
    });

    it("Пробрасывает остальные атрибуты на корневой ul", () => {
        render(<TreeViewGroup id="group-id" aria-label="Group" />);

        expect(screen.getByRole("group")).toHaveAttribute("id", "group-id");
        expect(screen.getByRole("group")).toHaveAttribute("aria-label", "Group");
    });

    it("Пробрасывает ref на корневой ul", () => {
        const ref = React.createRef<HTMLUListElement>();

        render(<TreeViewGroup ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLUListElement);
        expect(ref.current).toBe(screen.getByRole("group"));
    });
});
