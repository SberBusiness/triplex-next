import React from "react";
import clsx from "clsx";
import {
    CollapsibleTreeExtended,
    ICollapsibleTreeExtendedProps,
} from "../CollapsibleTreeExtended/CollapsibleTreeExtended";
import { CollapsibleTreeBranchNode } from "./components/CollapsibleTreeBranchNode";
import { ICollapsibleTreeNodeBranch } from "./types";
import styles from "./styles/CollapsibleTree.module.less";

/** Свойства CollapsibleTree. */
export interface ICollapsibleTreeProps extends Omit<ICollapsibleTreeExtendedProps, "children"> {
    children?: never;
    /** Дерево узлов. На верхнем уровне допустимы только ветки; листья — внутри children ветки. */
    nodes: ICollapsibleTreeNodeBranch[];
}

/**
 * Готовое дерево с раскрывающимися ветками. Принимает данные узлов (`nodes`) и рендерит дерево с типовым UI:
 * заголовок ветки с шевроном-индикатором раскрытия, hover и focus-visible на интерактивной строке.
 *
 * Узлы описываются двумя типами:
 * - {@link ICollapsibleTreeNodeBranch} — ветка с `label`, может содержать дочерние узлы (ветки и листья);
 * - {@link ICollapsibleTreeNodeLeaf} — лист с произвольным `content`, не раскрывается и не имеет шеврона.
 *
 * Используй этот компонент в большинстве случаев — он закрывает типовой UI дерева. Если требуется нестандартный
 * header (своя иконка раскрытия, кастомное поведение клика, нестандартная разметка) — используй низкоуровневый
 * {@link CollapsibleTreeExtended}.
 *
 * @see CollapsibleTreeExtended — декларативная база с произвольным `renderHeader`/`renderBody`.
 */
export const CollapsibleTree: React.FC<ICollapsibleTreeProps> = ({ nodes, className, ...rest }) => (
    <CollapsibleTreeExtended {...rest} className={clsx(styles.collapsibleTree, className)}>
        {nodes.map((node, index) => (
            <CollapsibleTreeBranchNode
                key={node.id}
                node={node}
                prevNodeId={nodes[index - 1]?.id}
                nextNodeId={nodes[index + 1]?.id}
            />
        ))}
    </CollapsibleTreeExtended>
);

CollapsibleTree.displayName = "CollapsibleTree";
