import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CollapsibleTree } from "../CollapsibleTree";
import { ICollapsibleTreeNodeBranch } from "../types";

const getMockNodes = (): ICollapsibleTreeNodeBranch[] => [
    {
        id: "folder-1",
        label: "Folder 1",
        children: [
            { id: "file-1-1", content: "File 1-1" },
            { id: "file-1-2", content: "File 1-2" },
        ],
    },
    {
        id: "folder-2",
        label: "Folder 2",
        defaultOpened: true,
        children: [{ id: "file-2-1", content: "File 2-1" }],
    },
    { id: "folder-3", label: "Empty folder" },
];

describe("CollapsibleTree", () => {
    it("Рендерит заголовки веток верхнего уровня и стартовое раскрытие", () => {
        render(<CollapsibleTree nodes={getMockNodes()} />);

        expect(screen.getByText("Folder 1")).toBeInTheDocument();
        expect(screen.getByText("Folder 2")).toBeInTheDocument();
        expect(screen.getByText("Empty folder")).toBeInTheDocument();
        // defaultOpened: true показывает контент листа внутри ветки.
        expect(screen.getByText("File 2-1")).toBeInTheDocument();
    });

    it("Раскрывает и сворачивает ветку по клику на header", () => {
        render(<CollapsibleTree nodes={getMockNodes()} />);

        const folder1Button = screen.getByRole("button", { name: /Folder 1/ });
        expect(folder1Button).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(folder1Button);
        expect(folder1Button).toHaveAttribute("aria-expanded", "true");

        fireEvent.click(folder1Button);
        expect(folder1Button).toHaveAttribute("aria-expanded", "false");
    });

    it("Пустая ветка (без children) не интерактивна: без шеврона, disabled и без aria-expanded", () => {
        render(<CollapsibleTree nodes={getMockNodes()} />);

        const emptyFolderButton = screen.getByRole("button", { name: "Empty folder" });
        expect(emptyFolderButton).toBeDisabled();
        expect(emptyFolderButton).not.toHaveAttribute("aria-expanded");
        expect(emptyFolderButton.querySelector("svg")).toBeNull();
    });

    it("Кнопка раскрывающейся ветки получает класс interactive", () => {
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

    it("Лист рендерит контент без кнопки и без шеврона", () => {
        render(<CollapsibleTree nodes={getMockNodes()} />);

        // Лист File 2-1 виден (родитель раскрыт).
        const leafText = screen.getByText("File 2-1");
        // Лист не оборачивается в button.
        expect(leafText.closest("button")).toBeNull();
        // У контейнера листа нет svg-шеврона.
        const leafItem = leafText.closest('[role="treeitem"]');
        expect(leafItem).not.toBeNull();
        expect(leafItem?.querySelector("svg")).toBeNull();
    });

    it("Лист рендерится как treeitem с произвольным React-контентом", () => {
        const nodes: ICollapsibleTreeNodeBranch[] = [
            {
                id: "branch",
                label: "Branch",
                defaultOpened: true,
                children: [
                    {
                        id: "leaf",
                        content: <span data-testid="leaf-content">custom</span>,
                    },
                ],
            },
        ];

        render(<CollapsibleTree nodes={nodes} />);

        expect(screen.getByTestId("leaf-content")).toHaveTextContent("custom");
    });

    it("Рендерит вложенные ветки рекурсивно", () => {
        const nested: ICollapsibleTreeNodeBranch[] = [
            {
                id: "root",
                label: "Root",
                defaultOpened: true,
                children: [
                    {
                        id: "child",
                        label: "Child",
                        defaultOpened: true,
                        children: [{ id: "grandchild", content: "Grandchild" }],
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
