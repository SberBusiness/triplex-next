import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CollapsibleTreeExtended } from "../../CollapsibleTreeExtended/CollapsibleTreeExtended";
import { CollapsibleTreeBranchNode } from "../components/CollapsibleTreeBranchNode";
import { ICollapsibleTreeNodeBranch, TCollapsibleTreeNode } from "../types";

/**
 * CollapsibleTreeBranchNode тестируется в составе CollapsibleTreeExtended:
 * ему нужен TreeView-контекст для регистрации абстрактной ноды (от этого зависит hasChildNodes).
 * Это всё ещё unit-уровень для самого компонента — мы проверяем его собственное поведение
 * (локальный state, рекурсивный рендер, проброс соседних id), а не публичный API CollapsibleTree.
 */
const renderInTree = (node: TCollapsibleTreeNode) =>
    render(
        <CollapsibleTreeExtended>
            <CollapsibleTreeBranchNode node={node as ICollapsibleTreeNodeBranch} />
        </CollapsibleTreeExtended>,
    );

describe("CollapsibleTreeBranchNode", () => {
    describe("Локальное состояние opened", () => {
        it("Инициализируется из node.defaultOpened=true", () => {
            renderInTree({
                id: "branch",
                label: "Branch",
                defaultOpened: true,
                children: [{ id: "child", content: "Child content" }],
            });

            const button = screen.getByRole("button", { name: /Branch/ });
            expect(button).toHaveAttribute("aria-expanded", "true");
            // Контент дочернего листа отрендерен — ветка раскрыта изначально.
            expect(screen.getByText("Child content")).toBeInTheDocument();
        });

        it("Инициализируется как false когда defaultOpened не передан", () => {
            renderInTree({
                id: "branch",
                label: "Branch",
                children: [{ id: "child", content: "Child content" }],
            });

            const button = screen.getByRole("button", { name: /Branch/ });
            expect(button).toHaveAttribute("aria-expanded", "false");
        });

        it("Инициализируется из defaultOpened=false явно", () => {
            renderInTree({
                id: "branch",
                label: "Branch",
                defaultOpened: false,
                children: [{ id: "child", content: "Child content" }],
            });

            const button = screen.getByRole("button", { name: /Branch/ });
            expect(button).toHaveAttribute("aria-expanded", "false");
        });

        it("Click тогглит локальный state и aria-expanded меняется", () => {
            renderInTree({
                id: "branch",
                label: "Branch",
                children: [{ id: "child", content: "Child content" }],
            });

            const button = screen.getByRole("button", { name: /Branch/ });
            expect(button).toHaveAttribute("aria-expanded", "false");

            fireEvent.click(button);
            expect(button).toHaveAttribute("aria-expanded", "true");

            fireEvent.click(button);
            expect(button).toHaveAttribute("aria-expanded", "false");
        });
    });

    describe("Рекурсивный рендер children", () => {
        it("Рендерит вложенную ветку через инлайн-диспетчер в renderBody", () => {
            renderInTree({
                id: "root",
                label: "Root",
                defaultOpened: true,
                children: [
                    {
                        id: "child-branch",
                        label: "Child branch",
                        defaultOpened: true,
                        children: [{ id: "grandchild", content: "Grandchild content" }],
                    },
                ],
            });

            // И вложенная ветка, и её лист — обе рендерятся инлайн-диспетчером по isCollapsibleTreeNodeLeaf.
            expect(screen.getByRole("button", { name: /Child branch/ })).toBeInTheDocument();
            expect(screen.getByText("Grandchild content")).toBeInTheDocument();
        });

        it("Рендерит лист в children инлайн-диспетчером (без шеврона, как treeitem)", () => {
            renderInTree({
                id: "root",
                label: "Root",
                defaultOpened: true,
                children: [{ id: "leaf", content: "Leaf content" }],
            });

            const leafText = screen.getByText("Leaf content");
            // Лист не оборачивается в button.
            expect(leafText.closest("button")).toBeNull();

            const leafItem = leafText.closest('[role="treeitem"]');
            expect(leafItem).not.toBeNull();
            expect(leafItem?.querySelector("svg")).toBeNull();
        });

        it("Не падает на пустых children (children=[]) — рендерит как лист без раскрытия", () => {
            renderInTree({
                id: "branch",
                label: "Empty branch",
                children: [],
            });

            const button = screen.getByRole("button", { name: "Empty branch" });
            // С пустым children — hasChildNodes=false → disabled и без aria-expanded.
            expect(button).toBeDisabled();
            expect(button).not.toHaveAttribute("aria-expanded");
        });

        it("Не падает когда children не переданы (undefined)", () => {
            renderInTree({
                id: "branch",
                label: "Branch without children",
            });

            const button = screen.getByRole("button", { name: "Branch without children" });
            expect(button).toBeDisabled();
        });
    });

    describe("Проброс prevNodeId/nextNodeId в дочерние узлы", () => {
        it("Соседние id корректно прокидываются — соседние treeitem отрендерены", () => {
            renderInTree({
                id: "root",
                label: "Root",
                defaultOpened: true,
                children: [
                    { id: "a", content: "A" },
                    { id: "b", content: "B" },
                    { id: "c", content: "C" },
                ],
            });

            // Все три листа должны отрендериться как treeitem'ы (это косвенно проверяет,
            // что prev/next-связки между ними не ломают регистрацию в дереве).
            const tree = screen.getByRole("tree");
            const items = within(tree).getAllByRole("treeitem");

            // 1 ветка + 3 листа = 4 treeitem.
            expect(items.length).toBe(4);
            expect(within(tree).getByText("A")).toBeInTheDocument();
            expect(within(tree).getByText("B")).toBeInTheDocument();
            expect(within(tree).getByText("C")).toBeInTheDocument();
        });
    });
});
