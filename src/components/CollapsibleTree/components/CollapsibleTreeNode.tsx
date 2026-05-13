import React from "react";
import { CollapsibleTreeExtended } from "../../CollapsibleTreeExtended/CollapsibleTreeExtended";
import { ICollapsibleTreeNodeData } from "../types";
import { CollapsibleTreeNodeHeader } from "./CollapsibleTreeNodeHeader";

/** Свойства CollapsibleTreeNode. */
export interface ICollapsibleTreeNodeProps {
    /** Данные текущей ноды. */
    node: ICollapsibleTreeNodeData;
    /** Данные предыдущей ноды на том же уровне (для клавиатурной навигации). */
    prevNode?: ICollapsibleTreeNodeData;
    /** Данные следующей ноды на том же уровне (для клавиатурной навигации). */
    nextNode?: ICollapsibleTreeNodeData;
}

/**
 * Нода CollapsibleTree.
 * Хранит локальное состояние раскрытия и рекурсивно рендерит детей.
 */
export const CollapsibleTreeNode: React.FC<ICollapsibleTreeNodeProps> = ({ node, prevNode, nextNode }) => {
    const hasChildren = Boolean(node.children?.length);
    const [opened, setOpened] = React.useState<boolean>(node.defaultOpened ?? false);

    return (
        <CollapsibleTreeExtended.Node
            id={node.id}
            opened={opened}
            toggle={setOpened}
            prevNodeId={prevNode?.id}
            nextNodeId={nextNode?.id}
            renderHeader={(headerProps) => (
                <CollapsibleTreeNodeHeader {...headerProps}>{node.label}</CollapsibleTreeNodeHeader>
            )}
            renderBody={() =>
                hasChildren
                    ? node.children!.map((child, index) => (
                          <CollapsibleTreeNode
                              key={child.id}
                              node={child}
                              prevNode={node.children![index - 1]}
                              nextNode={node.children![index + 1]}
                          />
                      ))
                    : null
            }
        />
    );
};

CollapsibleTreeNode.displayName = "CollapsibleTreeNode";
