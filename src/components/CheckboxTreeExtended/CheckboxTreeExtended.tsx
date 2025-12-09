import React from "react";
import { CollapsableTree, ICollapsableTreeProps } from "../CollapsableTree/CollapsableTree";
import { CheckboxTreeExtendedCheckbox } from "./components/CheckboxTreeExtendedCheckbox";
import { CheckboxTreeExtendedNode } from "./components/CheckboxTreeExtendedNode";
import clsx from "clsx";
import styles from "./styles/CheckboxTreeExtended.module.less";

/** Свойства CheckboxTreeExtended. */
export interface ICheckboxTreeExtendedProps extends ICollapsableTreeProps {}

export interface ICheckboxTreeExtendedSFC extends React.FC<ICheckboxTreeExtendedProps> {
    Checkbox: typeof CheckboxTreeExtendedCheckbox;
    Node: typeof CheckboxTreeExtendedNode;
}

/**
 * Декларативное дерево чекбоксов.
 * Является оберткой над CollapsableTree.
 */
export const CheckboxTreeExtended: ICheckboxTreeExtendedSFC = ({ className, ...rest }) => (
    <CollapsableTree className={clsx(styles.checkboxTreeExtended, className)} {...rest} />
);

CheckboxTreeExtended.displayName = "CheckboxTreeExtended";
CheckboxTreeExtended.Checkbox = CheckboxTreeExtendedCheckbox;
CheckboxTreeExtended.Node = CheckboxTreeExtendedNode;
