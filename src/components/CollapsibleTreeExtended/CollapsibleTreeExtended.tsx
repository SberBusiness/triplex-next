import React from "react";
import { ITreeViewProps, TreeView } from "../TreeView/TreeView";
import { CollapsibleTreeExtendedNode } from "./components/CollapsibleTreeExtendedNode";

/**
 * Свойства CollapsibleTreeExtended.
 *
 */
export interface ICollapsibleTreeExtendedProps extends ITreeViewProps {}

export interface ICollapsibleTreeExtendedSFC extends React.FC<ICollapsibleTreeExtendedProps> {
    Node: typeof CollapsibleTreeExtendedNode;
}

/**
 * Дерево, ноды которого могут сворачиваться/разворачиваться.
 * Является оберткой TreeView.
 */
const CollapsibleTreeExtended: ICollapsibleTreeExtendedSFC = (props) => <TreeView {...props} />;

CollapsibleTreeExtended.displayName = "CollapsibleTreeExtended";
CollapsibleTreeExtended.Node = CollapsibleTreeExtendedNode;

export { CollapsibleTreeExtended };
