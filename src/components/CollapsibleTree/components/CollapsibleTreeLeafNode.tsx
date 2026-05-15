import React from "react";
import { CollapsibleTreeExtended } from "../../CollapsibleTreeExtended/CollapsibleTreeExtended";
import { ICollapsibleTreeNodeLeaf } from "../types";
import { CollapsibleTreeLeafContent } from "./CollapsibleTreeLeafContent";
import styles from "../styles/CollapsibleTreeLeafNode.module.less";

/** Свойства CollapsibleTreeLeafNode. */
export interface ICollapsibleTreeLeafNodeProps {
    /** Данные листа. */
    node: ICollapsibleTreeNodeLeaf;
    /** Идентификатор предыдущего соседнего узла (для клавиатурной навигации). */
    prevNodeId?: string;
    /** Идентификатор следующего соседнего узла (для клавиатурной навигации). */
    nextNodeId?: string;
}

const noop = () => undefined;

/**
 * Лист CollapsibleTree.
 * Конечный узел дерева, не имеет шеврона и не раскрывается. Рендерит произвольный контент через CollapsibleTreeLeafContent.
 */
export const CollapsibleTreeLeafNode: React.FC<ICollapsibleTreeLeafNodeProps> = ({ node, prevNodeId, nextNodeId }) => (
    <CollapsibleTreeExtended.Node
        className={styles.collapsibleTreeLeafNode}
        id={node.id}
        opened
        toggle={noop}
        prevNodeId={prevNodeId}
        nextNodeId={nextNodeId}
        renderHeader={() => <CollapsibleTreeLeafContent>{node.content}</CollapsibleTreeLeafContent>}
        renderBody={() => null}
    />
);

CollapsibleTreeLeafNode.displayName = "CollapsibleTreeLeafNode";
