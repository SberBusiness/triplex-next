import React from "react";
import { CollapsibleTreeExtended } from "../../CollapsibleTreeExtended/CollapsibleTreeExtended";
import { ICollapsibleTreeNodeBranch, TCollapsibleTreeNode, isCollapsibleTreeNodeLeaf } from "../types";
import { CollapsibleTreeNodeHeader } from "./CollapsibleTreeNodeHeader";
import { CollapsibleTreeLeafNode } from "./CollapsibleTreeLeafNode";

/** Свойства CollapsibleTreeBranchNode. */
export interface ICollapsibleTreeBranchNodeProps {
    /** Данные ветки. */
    node: ICollapsibleTreeNodeBranch;
    /** Идентификатор предыдущего соседнего узла (для клавиатурной навигации). */
    prevNodeId?: string;
    /** Идентификатор следующего соседнего узла (для клавиатурной навигации). */
    nextNodeId?: string;
}

/**
 * Ветка CollapsibleTree.
 * Хранит локальное состояние раскрытия и рекурсивно рендерит дочерние узлы — ветки через себя же, листья через CollapsibleTreeLeafNode.
 */
export const CollapsibleTreeBranchNode: React.FC<ICollapsibleTreeBranchNodeProps> = ({
    node,
    prevNodeId,
    nextNodeId,
}) => {
    const [opened, setOpened] = React.useState<boolean>(node.defaultOpened ?? false);
    const children: TCollapsibleTreeNode[] = node.children ?? [];

    return (
        <CollapsibleTreeExtended.Node
            id={node.id}
            opened={opened}
            toggle={setOpened}
            prevNodeId={prevNodeId}
            nextNodeId={nextNodeId}
            renderHeader={(headerProps) => (
                <CollapsibleTreeNodeHeader {...headerProps}>{node.label}</CollapsibleTreeNodeHeader>
            )}
            renderBody={() =>
                children.map((child, index) => {
                    const childProps = {
                        prevNodeId: children[index - 1]?.id,
                        nextNodeId: children[index + 1]?.id,
                    };
                    return isCollapsibleTreeNodeLeaf(child) ? (
                        <CollapsibleTreeLeafNode key={child.id} node={child} {...childProps} />
                    ) : (
                        <CollapsibleTreeBranchNode key={child.id} node={child} {...childProps} />
                    );
                })
            }
        />
    );
};

CollapsibleTreeBranchNode.displayName = "CollapsibleTreeBranchNode";
