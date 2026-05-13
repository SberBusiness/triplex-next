import React from "react";
import clsx from "clsx";
import {
    CollapsibleTreeExtended,
    ICollapsibleTreeExtendedProps,
} from "../CollapsibleTreeExtended/CollapsibleTreeExtended";
import { CollapsibleTreeNode } from "./components/CollapsibleTreeNode";
import { ICollapsibleTreeNodeData } from "./types";
import styles from "./styles/CollapsibleTree.module.less";

/** Свойства CollapsibleTree. */
export interface ICollapsibleTreeProps extends Omit<ICollapsibleTreeExtendedProps, "children"> {
    children?: never;
    /** Дерево нод. */
    nodes: ICollapsibleTreeNodeData[];
}

/**
 * Дерево с раскрывающимися нодами.
 * Является оберткой над CollapsibleTreeExtended: рендерит заголовок с шевроном-индикатором
 * раскрытия, добавляет hover и focus-visible на интерактивную часть ноды.
 *
 * Леаф-ноды (без children) отображаются без шеврона и не реагируют на клик.
 */
export const CollapsibleTree: React.FC<ICollapsibleTreeProps> = ({ nodes, className, ...rest }) => (
    <CollapsibleTreeExtended {...rest} className={clsx(styles.collapsibleTree, className)}>
        {nodes.map((node, index) => (
            <CollapsibleTreeNode key={node.id} node={node} prevNode={nodes[index - 1]} nextNode={nodes[index + 1]} />
        ))}
    </CollapsibleTreeExtended>
);

CollapsibleTree.displayName = "CollapsibleTree";
