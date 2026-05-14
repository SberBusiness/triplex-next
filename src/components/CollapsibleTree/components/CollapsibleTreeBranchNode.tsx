import React from "react";
import { CollapsibleTreeExtended } from "../../CollapsibleTreeExtended/CollapsibleTreeExtended";
import { ICollapsibleTreeNodeBranch, TCollapsibleTreeNode } from "../types";
import { CollapsibleTreeNodeHeader } from "./CollapsibleTreeNodeHeader";
import { CollapsibleTreeNode } from "./CollapsibleTreeNode";

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
 * Хранит локальное состояние раскрытия и рекурсивно рендерит дочерние узлы через диспетчер CollapsibleTreeNode.
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
                children.map((child, index) => (
                    <CollapsibleTreeNode
                        key={child.id}
                        node={child}
                        prevNodeId={children[index - 1]?.id}
                        nextNodeId={children[index + 1]?.id}
                    />
                ))
            }
        />
    );
};

CollapsibleTreeBranchNode.displayName = "CollapsibleTreeBranchNode";
