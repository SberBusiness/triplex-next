import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CollapsibleTreeExtended } from "../CollapsibleTreeExtended";

const renderTree = (props: Partial<React.ComponentProps<typeof CollapsibleTreeExtended>> = {}) =>
    render(
        <CollapsibleTreeExtended {...props}>
            <CollapsibleTreeExtended.Node
                id="branch"
                renderHeader={() => <span>Ветка</span>}
                renderBody={() => <span>Содержимое</span>}
            />
        </CollapsibleTreeExtended>,
    );

describe("CollapsibleTreeExtended", () => {
    it("отдаёт в ref корневой ul", () => {
        const ref = React.createRef<HTMLUListElement>();

        renderTree({ ref });

        expect(ref.current).toBe(screen.getByRole("tree"));
        expect(ref.current?.tagName).toBe("UL");
    });

    it("пробрасывает html-атрибуты на корневой ul", () => {
        renderTree({ id: "my-tree", className: "my-class", "aria-label": "Дерево" });

        const tree = screen.getByRole("tree");
        expect(tree).toHaveAttribute("id", "my-tree");
        expect(tree).toHaveAttribute("aria-label", "Дерево");
        expect(tree).toHaveClass("my-class");
    });

    it("предоставляет составные части", () => {
        expect(CollapsibleTreeExtended.Node.displayName).toBe("CollapsibleTreeExtendedNode");
    });
});
