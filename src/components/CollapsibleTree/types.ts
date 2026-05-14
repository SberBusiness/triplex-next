import React from "react";

/** Ветка дерева CollapsibleTree — раскрывающийся узел с заголовком и дочерними узлами. */
export interface ICollapsibleTreeNodeBranch {
    /** Уникальный идентификатор узла в дереве. */
    id: string;
    /** Содержимое заголовка ветки. */
    label: React.ReactNode;
    /** Начальное состояние раскрытия ветки. */
    defaultOpened?: boolean;
    /** Дочерние узлы — другие ветки или листья. Если массив пуст или не передан — ветка отображается без шеврона и не раскрывается. */
    children?: TCollapsibleTreeNode[];
}

/** Лист дерева CollapsibleTree — конечный узел с произвольным контентом, не раскрывается. */
export interface ICollapsibleTreeNodeLeaf {
    /** Уникальный идентификатор узла в дереве. */
    id: string;
    /** Произвольный контент листа. */
    content: React.ReactNode;
}

/** Узел дерева CollapsibleTree — ветка или лист. */
export type TCollapsibleTreeNode = ICollapsibleTreeNodeBranch | ICollapsibleTreeNodeLeaf;

/** Type guard: проверяет, что узел — лист. */
export const isCollapsibleTreeNodeLeaf = (node: TCollapsibleTreeNode): node is ICollapsibleTreeNodeLeaf =>
    "content" in node;
