import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TreeView } from "../TreeView";
import { ITreeViewNodeProvideProps } from "../components/TreeViewNode";

/** Render-функция ноды, выставляющая provide-props в data-атрибуты для проверок. */
const renderNodeContent =
    (label: string) =>
    ({ activeNode, hasChildNodes, isLastNode, openedNode }: ITreeViewNodeProvideProps) => (
        <span
            data-testid={`content-${label}`}
            data-active={String(activeNode)}
            data-has-child-nodes={String(hasChildNodes)}
            data-last={String(isLastNode)}
            data-opened={String(openedNode)}
        >
            {label}
        </span>
    );

describe("TreeViewNode", () => {
    describe("Разметка", () => {
        it("Рендерит li с role=treeitem", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
                </TreeView>,
            );

            const item = screen.getByRole("treeitem");

            expect(item.tagName).toBe("LI");
        });

        it("Не дает переопределить role и aria-expanded", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a" role="none" aria-expanded opened={false}>
                        {renderNodeContent("a")}
                    </TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByRole("treeitem")).toHaveAttribute("aria-expanded", "false");
        });

        it("Мерджит className с собственным классом", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a" className="custom-class">
                        {renderNodeContent("a")}
                    </TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByRole("treeitem")).toHaveClass("treeViewNode", "custom-class");
        });

        it("Пробрасывает остальные атрибуты на li", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a" title="Node title">
                        {renderNodeContent("a")}
                    </TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByRole("treeitem")).toHaveAttribute("title", "Node title");
        });
    });

    describe("Состояние раскрытия", () => {
        it("aria-expanded=false по умолчанию", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByRole("treeitem")).toHaveAttribute("aria-expanded", "false");
            expect(screen.getByTestId("content-a")).toHaveAttribute("data-opened", "false");
        });

        it("aria-expanded=true при opened", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a" opened>
                        {renderNodeContent("a")}
                    </TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByRole("treeitem")).toHaveAttribute("aria-expanded", "true");
            expect(screen.getByTestId("content-a")).toHaveAttribute("data-opened", "true");
        });

        it("Реагирует на смену opened в props", () => {
            const { rerender } = render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByRole("treeitem")).toHaveAttribute("aria-expanded", "false");

            rerender(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a" opened>
                        {renderNodeContent("a")}
                    </TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByRole("treeitem")).toHaveAttribute("aria-expanded", "true");
        });

        it("setOpenedNode из render-функции переключает состояние раскрытия", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a">
                        {({ openedNode, setOpenedNode }) => (
                            <button type="button" onClick={() => setOpenedNode(!openedNode)}>
                                toggle
                            </button>
                        )}
                    </TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByRole("treeitem")).toHaveAttribute("aria-expanded", "false");

            fireEvent.click(screen.getByRole("button", { name: "toggle" }));

            expect(screen.getByRole("treeitem")).toHaveAttribute("aria-expanded", "true");
        });
    });

    describe("Provide-props", () => {
        it("hasChildNodes=true, когда внутри есть вложенные ноды", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="branch">
                        {(props) => (
                            <>
                                {renderNodeContent("branch")(props)}
                                <TreeView.Group>
                                    <TreeView.Node id="leaf">{renderNodeContent("leaf")}</TreeView.Node>
                                </TreeView.Group>
                            </>
                        )}
                    </TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByTestId("content-branch")).toHaveAttribute("data-has-child-nodes", "true");
            expect(screen.getByTestId("content-leaf")).toHaveAttribute("data-has-child-nodes", "false");
        });

        it("isLastNode=true только у последней ноды дерева", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
                    <TreeView.Node id="b">{renderNodeContent("b")}</TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByTestId("content-a")).toHaveAttribute("data-last", "false");
            expect(screen.getByTestId("content-b")).toHaveAttribute("data-last", "true");
        });

        it("nextNodeId задает позицию ноды в абстрактном дереве независимо от порядка в разметке", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
                    <TreeView.Node id="b">{renderNodeContent("b")}</TreeView.Node>
                    <TreeView.Node id="c" nextNodeId="b">
                        {renderNodeContent("c")}
                    </TreeView.Node>
                </TreeView>,
            );

            // Порядок в абстрактном дереве: a, c, b — последней считается b, а не отрисованная последней c.
            expect(screen.getByTestId("content-b")).toHaveAttribute("data-last", "true");
            expect(screen.getByTestId("content-c")).toHaveAttribute("data-last", "false");
        });

        it("prevNodeId задает позицию ноды в абстрактном дереве независимо от порядка в разметке", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
                    <TreeView.Node id="b">{renderNodeContent("b")}</TreeView.Node>
                    <TreeView.Node id="c" prevNodeId="a">
                        {renderNodeContent("c")}
                    </TreeView.Node>
                </TreeView>,
            );

            // Порядок в абстрактном дереве: a, c, b — последней считается b, а не отрисованная последней c.
            expect(screen.getByTestId("content-b")).toHaveAttribute("data-last", "true");
            expect(screen.getByTestId("content-c")).toHaveAttribute("data-last", "false");
            // tabIndex=0 получает только первая нода уровня - значит c встала после a, а не перед ней.
            expect(screen.getByTestId("content-a").closest("li")).toHaveAttribute("tabindex", "0");
        });
    });

    describe("Фокус", () => {
        it("Вызывает onFocus потребителя и делает ноду активной", () => {
            const onFocus = vi.fn();

            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a" onFocus={onFocus}>
                        {renderNodeContent("a")}
                    </TreeView.Node>
                </TreeView>,
            );

            fireEvent.focus(screen.getByRole("treeitem"));

            expect(onFocus).toHaveBeenCalledTimes(1);
            expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ type: "focus" }));
            expect(screen.getByTestId("content-a")).toHaveAttribute("data-active", "true");
        });

        it("Вызывает onBlur потребителя и снимает активность", () => {
            const onBlur = vi.fn();

            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a" onBlur={onBlur}>
                        {renderNodeContent("a")}
                    </TreeView.Node>
                </TreeView>,
            );

            const item = screen.getByRole("treeitem");

            fireEvent.focus(item);
            fireEvent.blur(item);

            expect(onBlur).toHaveBeenCalledTimes(1);
            expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ type: "blur" }));
            expect(screen.getByTestId("content-a")).toHaveAttribute("data-active", "false");
        });

        it("Фокус на вложенной ноде не активирует родительскую", () => {
            render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="branch" opened>
                        {(props) => (
                            <>
                                {renderNodeContent("branch")(props)}
                                <TreeView.Group>
                                    <TreeView.Node id="leaf">{renderNodeContent("leaf")}</TreeView.Node>
                                </TreeView.Group>
                            </>
                        )}
                    </TreeView.Node>
                </TreeView>,
            );

            const [, leaf] = screen.getAllByRole("treeitem");

            fireEvent.focus(leaf);

            expect(screen.getByTestId("content-leaf")).toHaveAttribute("data-active", "true");
            expect(screen.getByTestId("content-branch")).toHaveAttribute("data-active", "false");
        });
    });

    describe("Удаление ноды", () => {
        it("Размонтированная нода исчезает из абстрактного дерева", () => {
            const { rerender } = render(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
                    <TreeView.Node id="b">{renderNodeContent("b")}</TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByTestId("content-a")).toHaveAttribute("data-last", "false");

            rerender(
                <TreeView aria-label="Tree">
                    <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByTestId("content-a")).toHaveAttribute("data-last", "true");
        });
    });
});
