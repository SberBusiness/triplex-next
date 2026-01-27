import React from "react";
import { CollapsableTree, ICollapsableTreeProps } from "../CollapsableTree/CollapsableTree";
import { CheckboxTreeExtendedCheckbox } from "./components/CheckboxTreeExtendedCheckbox";
import { CheckboxTreeExtendedNode } from "./components/CheckboxTreeExtendedNode";
import { CheckboxTreeExtendedContext } from "./CheckboxTreeExtendedContext";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import styles from "./styles/CheckboxTreeExtended.module.less";

/** Свойства CheckboxTreeExtended. */
export interface ICheckboxTreeExtendedProps extends ICollapsableTreeProps {
    /** Размер дерева чекбоксов. */
    size?: EComponentSize;
}

export interface ICheckboxTreeExtendedSFC extends React.FC<ICheckboxTreeExtendedProps> {
    Checkbox: typeof CheckboxTreeExtendedCheckbox;
    Node: typeof CheckboxTreeExtendedNode;
}

/**
 * Декларативное дерево чекбоксов.
 * Является оберткой над CollapsableTree.
 */
export const CheckboxTreeExtended: ICheckboxTreeExtendedSFC = ({ className, size = EComponentSize.MD, ...rest }) => (
    <CheckboxTreeExtendedContext.Provider value={{ size }}>
        <CollapsableTree className={clsx(styles.checkboxTreeExtended, className)} {...rest} />
    </CheckboxTreeExtendedContext.Provider>
);

CheckboxTreeExtended.displayName = "CheckboxTreeExtended";
CheckboxTreeExtended.Checkbox = CheckboxTreeExtendedCheckbox;
CheckboxTreeExtended.Node = CheckboxTreeExtendedNode;
