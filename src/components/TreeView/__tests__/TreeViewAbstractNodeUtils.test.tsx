import { describe, it, expect } from "vitest";
import { TreeViewAbstractNode } from "../TreeViewAbstractNode";
import { TreeViewAbstractNodeUtils } from "../TreeViewAbstractNodeUtils";

/**
 * Тестовое дерево:
 *
 * root
 * ├── a
 * │   ├── a1
 * │   └── a2
 * ├── b
 * └── c
 *     └── c1
 */
const createTree = () => {
    const root = new TreeViewAbstractNode({ id: "root" });
    const a = new TreeViewAbstractNode({ id: "a" });
    const a1 = new TreeViewAbstractNode({ id: "a1" });
    const a2 = new TreeViewAbstractNode({ id: "a2" });
    const b = new TreeViewAbstractNode({ id: "b" });
    const c = new TreeViewAbstractNode({ id: "c" });
    const c1 = new TreeViewAbstractNode({ id: "c1" });

    root.addChild(a);
    root.addChild(b);
    root.addChild(c);
    a.addChild(a1);
    a.addChild(a2);
    c.addChild(c1);

    return { root, a, a1, a2, b, c, c1 };
};

/** Нода, которая знает про родителя, но в его children не попала - fallback-ветка поиска индекса среди сиблингов. */
const createDetachedNode = (parentNode: TreeViewAbstractNode) => {
    const detached = new TreeViewAbstractNode({ id: "detached" });

    detached.setParent(parentNode);

    return detached;
};

describe("TreeViewAbstractNodeUtils", () => {
    describe("getNode", () => {
        it("Находит ноду по id на любом уровне вложенности", () => {
            const { root, a2, c1 } = createTree();

            expect(TreeViewAbstractNodeUtils.getNode("a2", root)).toBe(a2);
            expect(TreeViewAbstractNodeUtils.getNode("c1", root)).toBe(c1);
        });

        it("Находит саму rootNode", () => {
            const { root } = createTree();

            expect(TreeViewAbstractNodeUtils.getNode("root", root)).toBe(root);
        });

        it("Возвращает undefined для неизвестного id", () => {
            const { root } = createTree();

            expect(TreeViewAbstractNodeUtils.getNode("unknown", root)).toBeUndefined();
        });
    });

    describe("getActiveNode", () => {
        it("Возвращает undefined, когда активной ноды нет", () => {
            const { root } = createTree();

            expect(TreeViewAbstractNodeUtils.getActiveNode(root)).toBeUndefined();
        });

        it("Возвращает активную ноду", () => {
            const { root, a2 } = createTree();

            a2.setActive(true);

            expect(TreeViewAbstractNodeUtils.getActiveNode(root)).toBe(a2);
        });
    });

    describe("getNextSiblingNode", () => {
        it("Возвращает следующую ноду того же уровня", () => {
            const { a, b } = createTree();

            expect(TreeViewAbstractNodeUtils.getNextSiblingNode(a)).toBe(b);
        });

        it("Возвращает undefined для последней ноды уровня", () => {
            const { c } = createTree();

            expect(TreeViewAbstractNodeUtils.getNextSiblingNode(c)).toBeUndefined();
        });

        it("Возвращает undefined для rootNode", () => {
            const { root } = createTree();

            expect(TreeViewAbstractNodeUtils.getNextSiblingNode(root)).toBeUndefined();
        });

        it("Ноду, которой нет среди детей родителя, трактует как первую", () => {
            const { a, a2 } = createTree();

            expect(TreeViewAbstractNodeUtils.getNextSiblingNode(createDetachedNode(a))).toBe(a2);
        });
    });

    describe("getPrevSiblingNode", () => {
        it("Ноду, которой нет среди детей родителя, трактует как первую", () => {
            const { a } = createTree();

            expect(TreeViewAbstractNodeUtils.getPrevSiblingNode(createDetachedNode(a))).toBeUndefined();
        });

        it("Возвращает предыдущую ноду того же уровня", () => {
            const { b, c } = createTree();

            expect(TreeViewAbstractNodeUtils.getPrevSiblingNode(c)).toBe(b);
        });

        it("Возвращает undefined для первой ноды уровня", () => {
            const { a } = createTree();

            expect(TreeViewAbstractNodeUtils.getPrevSiblingNode(a)).toBeUndefined();
        });

        it("Возвращает undefined для rootNode", () => {
            const { root } = createTree();

            expect(TreeViewAbstractNodeUtils.getPrevSiblingNode(root)).toBeUndefined();
        });
    });

    describe("getNextNode", () => {
        it("Свернутая нода с детьми: следующая - соседняя нода того же уровня", () => {
            const { a, b } = createTree();

            expect(TreeViewAbstractNodeUtils.getNextNode(a)).toBe(b);
        });

        it("Раскрытая нода с детьми: следующая - первая дочерняя нода", () => {
            const { a, a1 } = createTree();

            a.setOpened(true);

            expect(TreeViewAbstractNodeUtils.getNextNode(a)).toBe(a1);
        });

        it("Последняя нода вложенного уровня: следующая - соседняя нода родителя", () => {
            const { a2, b } = createTree();

            expect(TreeViewAbstractNodeUtils.getNextNode(a2)).toBe(b);
        });

        it("Последняя нода дерева: следующая - первая нода дерева", () => {
            const { c, a } = createTree();

            expect(TreeViewAbstractNodeUtils.getNextNode(c)).toBe(a);
        });

        it("Последняя вложенная нода дерева: следующая - первая нода дерева", () => {
            const { c, c1, a } = createTree();

            c.setOpened(true);

            expect(TreeViewAbstractNodeUtils.getNextNode(c1)).toBe(a);
        });
    });

    describe("getPrevNode", () => {
        it("Первая дочерняя нода: предыдущая - родительская нода", () => {
            const { a, a1 } = createTree();

            expect(TreeViewAbstractNodeUtils.getPrevNode(a1)).toBe(a);
        });

        it("Свернутая соседняя нода: предыдущая - она сама", () => {
            const { a, b } = createTree();

            expect(TreeViewAbstractNodeUtils.getPrevNode(b)).toBe(a);
        });

        it("Раскрытая соседняя нода: предыдущая - ее последняя дочерняя нода", () => {
            const { a, a2, b } = createTree();

            a.setOpened(true);

            expect(TreeViewAbstractNodeUtils.getPrevNode(b)).toBe(a2);
        });

        it("Первая нода дерева: предыдущая - последняя нода дерева", () => {
            const { a, c } = createTree();

            // c свернута, поэтому спуск в ее детей не идет - предыдущей становится сама c.
            expect(TreeViewAbstractNodeUtils.getPrevNode(a)).toBe(c);
        });

        it("Первая нода дерева при раскрытой последней ветке: предыдущая - последняя видимая нода дерева", () => {
            const { a, c, c1 } = createTree();

            c.setOpened(true);

            expect(TreeViewAbstractNodeUtils.getPrevNode(a)).toBe(c1);
        });

        it("Свернутая соседняя нода с детьми: спуск в свернутую ветку не идет", () => {
            const { a, a2, b } = createTree();

            a.setOpened(true);
            a2.addChild(new TreeViewAbstractNode({ id: "a21" }));

            expect(TreeViewAbstractNodeUtils.getPrevNode(b)).toBe(a2);
        });
    });

    describe("isLastNode", () => {
        it("true для последней ноды последней ветки", () => {
            const { c1 } = createTree();

            expect(TreeViewAbstractNodeUtils.isLastNode(c1)).toBe(true);
        });

        it("false для ноды в середине уровня", () => {
            const { b } = createTree();

            expect(TreeViewAbstractNodeUtils.isLastNode(b)).toBe(false);
        });

        it("false для последней ноды не последней ветки", () => {
            const { a2 } = createTree();

            expect(TreeViewAbstractNodeUtils.isLastNode(a2)).toBe(false);
        });

        it("true для rootNode", () => {
            const { root } = createTree();

            expect(TreeViewAbstractNodeUtils.isLastNode(root)).toBe(true);
        });
    });

    describe("setActiveNode", () => {
        it("Активирует ноду и сбрасывает активность остальных", () => {
            const { root, a, b } = createTree();

            TreeViewAbstractNodeUtils.setActiveNode(a, root, true);
            TreeViewAbstractNodeUtils.setActiveNode(b, root, true);

            expect(a.getActive()).toBe(false);
            expect(b.getActive()).toBe(true);
            expect(TreeViewAbstractNodeUtils.getActiveNode(root)).toBe(b);
        });

        it("Снимает активность с ноды при isActive=false", () => {
            const { root, a } = createTree();

            TreeViewAbstractNodeUtils.setActiveNode(a, root, true);
            TreeViewAbstractNodeUtils.setActiveNode(a, root, false);

            expect(a.getActive()).toBe(false);
            expect(TreeViewAbstractNodeUtils.getActiveNode(root)).toBeUndefined();
        });
    });

    describe("setActiveNextNode", () => {
        it("Переносит активность на следующую ноду", () => {
            const { root, a, b } = createTree();

            TreeViewAbstractNodeUtils.setActiveNode(a, root, true);
            TreeViewAbstractNodeUtils.setActiveNextNode(root);

            expect(TreeViewAbstractNodeUtils.getActiveNode(root)).toBe(b);
        });

        it("Спускается в раскрытую ветку", () => {
            const { root, a, a1 } = createTree();

            a.setOpened(true);
            TreeViewAbstractNodeUtils.setActiveNode(a, root, true);
            TreeViewAbstractNodeUtils.setActiveNextNode(root);

            expect(TreeViewAbstractNodeUtils.getActiveNode(root)).toBe(a1);
        });

        it("Ничего не делает, когда активной ноды нет", () => {
            const { root } = createTree();

            TreeViewAbstractNodeUtils.setActiveNextNode(root);

            expect(TreeViewAbstractNodeUtils.getActiveNode(root)).toBeUndefined();
        });
    });

    describe("setActivePrevNode", () => {
        it("Переносит активность на предыдущую ноду", () => {
            const { root, b, c } = createTree();

            TreeViewAbstractNodeUtils.setActiveNode(c, root, true);
            TreeViewAbstractNodeUtils.setActivePrevNode(root);

            expect(TreeViewAbstractNodeUtils.getActiveNode(root)).toBe(b);
        });

        it("Поднимается из первой дочерней ноды к родителю", () => {
            const { root, a, a1 } = createTree();

            a.setOpened(true);
            TreeViewAbstractNodeUtils.setActiveNode(a1, root, true);
            TreeViewAbstractNodeUtils.setActivePrevNode(root);

            expect(TreeViewAbstractNodeUtils.getActiveNode(root)).toBe(a);
        });

        it("Ничего не делает, когда активной ноды нет", () => {
            const { root } = createTree();

            TreeViewAbstractNodeUtils.setActivePrevNode(root);

            expect(TreeViewAbstractNodeUtils.getActiveNode(root)).toBeUndefined();
        });
    });
});
