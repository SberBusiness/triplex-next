import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CollapsibleTree } from "../CollapsibleTree";
import { ICollapsibleTreeNodeData } from "../types";

const getMockNodes = (): ICollapsibleTreeNodeData[] => [
    {
        id: "folder-1",
        label: "Folder 1",
        children: [
            { id: "file-1-1", label: "File 1-1" },
            { id: "file-1-2", label: "File 1-2" },
        ],
    },
    {
        id: "folder-2",
        label: "Folder 2",
        defaultOpened: true,
        children: [{ id: "file-2-1", label: "File 2-1" }],
    },
    { id: "leaf", label: "Leaf node" },
];

describe("CollapsibleTree", () => {
    it("Рендерит заголовки нод верхнего уровня и стартовое раскрытие", () => {
        render(<CollapsibleTree nodes={getMockNodes()} />);

        expect(screen.getByText("Folder 1")).toBeInTheDocument();
        expect(screen.getByText("Folder 2")).toBeInTheDocument();
        expect(screen.getByText("Leaf node")).toBeInTheDocument();
        // defaultOpened: true показывает дочерние ноды.
        expect(screen.getByText("File 2-1")).toBeInTheDocument();
    });

    it("Раскрывает и сворачивает ноду по клику на header", () => {
        render(<CollapsibleTree nodes={getMockNodes()} />);

        const folder1Button = screen.getByRole("button", { name: /Folder 1/ });
        expect(folder1Button).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(folder1Button);
        expect(folder1Button).toHaveAttribute("aria-expanded", "true");

        fireEvent.click(folder1Button);
        expect(folder1Button).toHaveAttribute("aria-expanded", "false");
    });

    it("Леаф-нода не интерактивна: без шеврона, disabled и без aria-expanded", () => {
        render(<CollapsibleTree nodes={getMockNodes()} />);

        const leafButton = screen.getByRole("button", { name: "Leaf node" });
        expect(leafButton).toBeDisabled();
        expect(leafButton).not.toHaveAttribute("aria-expanded");
        // У disabled-кнопки внутри не должно быть SVG-шеврона.
        expect(leafButton.querySelector("svg")).toBeNull();
    });

    it("Кнопка раскрывающейся ноды получает класс interactive", () => {
        render(<CollapsibleTree nodes={getMockNodes()} />);

        const folderButton = screen.getByRole("button", { name: /Folder 1/ });
        expect(folderButton.className).toMatch(/interactive/);
    });

    it("Шеврон поворачивается в открытом состоянии", () => {
        render(<CollapsibleTree nodes={getMockNodes()} />);

        const folder2Button = screen.getByRole("button", { name: /Folder 2/ });
        const chevron = folder2Button.querySelector("svg");
        expect(chevron?.getAttribute("class") ?? "").toMatch(/opened/);
    });

    it("Рендерит вложенные ноды рекурсивно", () => {
        const nested: ICollapsibleTreeNodeData[] = [
            {
                id: "root",
                label: "Root",
                defaultOpened: true,
                children: [
                    {
                        id: "child",
                        label: "Child",
                        defaultOpened: true,
                        children: [{ id: "grandchild", label: "Grandchild" }],
                    },
                ],
            },
        ];

        render(<CollapsibleTree nodes={nested} />);

        const tree = screen.getByRole("tree");
        expect(within(tree).getByText("Root")).toBeInTheDocument();
        expect(within(tree).getByText("Child")).toBeInTheDocument();
        expect(within(tree).getByText("Grandchild")).toBeInTheDocument();
    });

    it("Прокидывает className на корневой ul", () => {
        const { container } = render(<CollapsibleTree nodes={getMockNodes()} className="custom-tree" />);

        const tree = container.querySelector('[role="tree"]');
        expect(tree?.className).toMatch(/custom-tree/);
    });
});
