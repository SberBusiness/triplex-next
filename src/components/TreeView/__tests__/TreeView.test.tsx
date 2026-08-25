import React from "react";
import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { ITreeViewProps, TreeView } from "../TreeView";
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

const renderFlatTree = (props?: Omit<ITreeViewProps, "children">) =>
    render(
        <TreeView aria-label="Tree" {...props}>
            <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
            <TreeView.Node id="b">{renderNodeContent("b")}</TreeView.Node>
            <TreeView.Node id="c">{renderNodeContent("c")}</TreeView.Node>
        </TreeView>,
    );

/** Отправляет keydown в window (слушатель навигации висит именно на нем) и возвращает событие. */
const fireWindowKeyDown = (keyCode: number) => {
    const event = createEvent.keyDown(window, { keyCode });

    fireEvent(window, event);

    return event;
};

const getActiveLabel = () =>
    ["a", "b", "c"].find((label) => screen.getByTestId(`content-${label}`).dataset.active === "true");

describe("TreeView", () => {
    describe("Разметка", () => {
        it("Рендерит ul с role=tree", () => {
            renderFlatTree();

            const tree = screen.getByRole("tree");

            expect(tree.tagName).toBe("UL");
        });

        it("Отдает в ref инстанс класса TreeView", () => {
            const ref = React.createRef<TreeView>();

            render(
                <TreeView aria-label="Tree" ref={ref}>
                    <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
                </TreeView>,
            );

            // Инвариант: TreeView остается классовым компонентом, ref отдает инстанс, а не DOM-элемент.
            expect(ref.current).toBeInstanceOf(TreeView);
        });

        it("Не дает переопределить role на корневом ul", () => {
            render(
                <TreeView aria-label="Tree" role="presentation">
                    <TreeView.Node id="a">{renderNodeContent("a")}</TreeView.Node>
                </TreeView>,
            );

            expect(screen.getByRole("tree")).toBeInTheDocument();
        });

        it("Мерджит className с собственным классом", () => {
            renderFlatTree({ className: "custom-class" });

            expect(screen.getByRole("tree")).toHaveClass("treeView", "custom-class");
        });

        it("Пробрасывает остальные атрибуты на корневой ul", () => {
            renderFlatTree({ id: "tree-id" });

            expect(screen.getByRole("tree")).toHaveAttribute("id", "tree-id");
            expect(screen.getByRole("tree")).toHaveAttribute("aria-label", "Tree");
        });

        it("Рендерит дочерние ноды как treeitem", () => {
            renderFlatTree();

            expect(screen.getAllByRole("treeitem")).toHaveLength(3);
        });
    });

    describe("Управление tabIndex", () => {
        it("Первая нода получает tabIndex=0, остальные -1", () => {
            renderFlatTree();

            const [first, second, third] = screen.getAllByRole("treeitem");

            expect(first).toHaveAttribute("tabindex", "0");
            expect(second).toHaveAttribute("tabindex", "-1");
            expect(third).toHaveAttribute("tabindex", "-1");
        });
    });

    describe("Активная нода", () => {
        it("Фокус на ноде делает ее активной", () => {
            renderFlatTree();

            fireEvent.focus(screen.getAllByRole("treeitem")[1]);

            expect(getActiveLabel()).toBe("b");
        });

        it("Blur снимает активность с ноды", () => {
            renderFlatTree();

            const [, second] = screen.getAllByRole("treeitem");

            fireEvent.focus(second);
            fireEvent.blur(second);

            expect(getActiveLabel()).toBeUndefined();
        });

        it("Blur снимает активность, уведенную стрелками на другую ноду", () => {
            renderFlatTree();

            const [first] = screen.getAllByRole("treeitem");

            // Фокус остается на первой ноде, а активность стрелкой уходит на вторую.
            fireEvent.focus(first);
            fireWindowKeyDown(EVENT_KEY_CODES.ARROW_DOWN);

            expect(getActiveLabel()).toBe("b");

            fireEvent.blur(first);

            expect(getActiveLabel()).toBeUndefined();
        });
    });

    describe("Навигация с клавиатуры", () => {
        it("ArrowDown переносит активность на следующую ноду и отменяет скролл страницы", () => {
            renderFlatTree();

            fireEvent.focus(screen.getAllByRole("treeitem")[0]);

            const event = fireWindowKeyDown(EVENT_KEY_CODES.ARROW_DOWN);

            expect(getActiveLabel()).toBe("b");
            expect(event.defaultPrevented).toBe(true);
        });

        it("ArrowUp переносит активность на предыдущую ноду и отменяет скролл страницы", () => {
            renderFlatTree();

            fireEvent.focus(screen.getAllByRole("treeitem")[2]);

            const event = fireWindowKeyDown(EVENT_KEY_CODES.ARROW_UP);

            expect(getActiveLabel()).toBe("b");
            expect(event.defaultPrevented).toBe(true);
        });

        it("ArrowDown на последней ноде переносит активность на первую", () => {
            renderFlatTree();

            fireEvent.focus(screen.getAllByRole("treeitem")[2]);
            fireWindowKeyDown(EVENT_KEY_CODES.ARROW_DOWN);

            expect(getActiveLabel()).toBe("a");
        });

        it("Спускается в раскрытую ветку", () => {
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

            fireEvent.focus(screen.getAllByRole("treeitem")[0]);
            fireWindowKeyDown(EVENT_KEY_CODES.ARROW_DOWN);

            expect(screen.getByTestId("content-leaf")).toHaveAttribute("data-active", "true");
            expect(screen.getByTestId("content-branch")).toHaveAttribute("data-active", "false");
        });

        it("Не реагирует на стрелки, когда активной ноды нет", () => {
            renderFlatTree();

            const event = fireWindowKeyDown(EVENT_KEY_CODES.ARROW_DOWN);

            expect(getActiveLabel()).toBeUndefined();
            expect(event.defaultPrevented).toBe(false);
        });

        it("Не подписывается на keydown, пока в дереве нет активной ноды", () => {
            const addEventListener = vi.spyOn(window, "addEventListener");

            renderFlatTree();

            expect(addEventListener).not.toHaveBeenCalledWith("keydown", expect.any(Function));

            fireEvent.focus(screen.getAllByRole("treeitem")[0]);

            expect(addEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));

            addEventListener.mockRestore();
        });

        it("После ухода фокуса из дерева стрелки снова достаются странице", () => {
            renderFlatTree();

            const [first] = screen.getAllByRole("treeitem");

            fireEvent.focus(first);
            fireEvent.blur(first);

            const event = fireWindowKeyDown(EVENT_KEY_CODES.ARROW_DOWN);

            expect(getActiveLabel()).toBeUndefined();
            expect(event.defaultPrevented).toBe(false);
        });

        it("Не реагирует на другие клавиши", () => {
            renderFlatTree();

            fireEvent.focus(screen.getAllByRole("treeitem")[0]);

            const event = fireWindowKeyDown(EVENT_KEY_CODES.ENTER);

            expect(getActiveLabel()).toBe("a");
            expect(event.defaultPrevented).toBe(false);
        });

        it("Снимает слушатель keydown при размонтировании", () => {
            const removeEventListener = vi.spyOn(window, "removeEventListener");
            const { unmount } = renderFlatTree();

            unmount();

            expect(removeEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));

            removeEventListener.mockRestore();
        });
    });
});
