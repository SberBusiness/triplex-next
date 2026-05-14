import React from "react";
import { TCollapsibleTreeNode, isCollapsibleTreeNodeLeaf } from "../types";
import { CollapsibleTreeBranchNode } from "./CollapsibleTreeBranchNode";
import { CollapsibleTreeLeafNode } from "./CollapsibleTreeLeafNode";

/** Свойства CollapsibleTreeNode. */
export interface ICollapsibleTreeNodeProps {
    /** Данные узла — ветка или лист. */
    node: TCollapsibleTreeNode;
    /** Идентификатор предыдущего соседнего узла (для клавиатурной навигации). */
    prevNodeId?: string;
    /** Идентификатор следующего соседнего узла (для клавиатурной навигации). */
    nextNodeId?: string;
}

/**
 * Диспетчер узла CollapsibleTree.
 * Выбирает рендер ветки или листа по форме данных узла.
 */
export const CollapsibleTreeNode: React.FC<ICollapsibleTreeNodeProps> = ({ node, prevNodeId, nextNodeId }) =>
    isCollapsibleTreeNodeLeaf(node) ? (
        <CollapsibleTreeLeafNode node={node} prevNodeId={prevNodeId} nextNodeId={nextNodeId} />
    ) : (
        <CollapsibleTreeBranchNode node={node} prevNodeId={prevNodeId} nextNodeId={nextNodeId} />
    );

CollapsibleTreeNode.displayName = "CollapsibleTreeNode";
