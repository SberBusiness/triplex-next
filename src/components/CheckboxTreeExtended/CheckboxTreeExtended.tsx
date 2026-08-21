import React from "react";
import clsx from "clsx";
import { EComponentSize } from "../../enums/EComponentSize";
import {
    CollapsibleTreeExtended,
    ICollapsibleTreeExtendedProps,
} from "../CollapsibleTreeExtended/CollapsibleTreeExtended";
import { useMobileView } from "../MobileView";
import { CheckboxTreeExtendedContext } from "./CheckboxTreeExtendedContext";
import { CheckboxTreeExtendedCheckbox } from "./components/CheckboxTreeExtendedCheckbox";
import { CheckboxTreeExtendedNode } from "./components/CheckboxTreeExtendedNode";
import styles from "./styles/CheckboxTreeExtended.module.less";

/** Свойства CheckboxTreeExtended. */
export interface ICheckboxTreeExtendedProps extends ICollapsibleTreeExtendedProps {
    /** Размер дерева чекбоксов. По умолчанию EComponentSize.MD. В мобильном представлении всегда EComponentSize.MD. */
    size?: EComponentSize;
}

/** CheckboxTreeExtended вместе с составными частями. */
export interface ICheckboxTreeExtendedSFC extends React.FC<ICheckboxTreeExtendedProps> {
    /** Чекбокс ноды дерева. */
    Checkbox: typeof CheckboxTreeExtendedCheckbox;
    /** Нода дерева. */
    Node: typeof CheckboxTreeExtendedNode;
}

/**
 * Декларативное дерево чекбоксов.
 * Является оберткой над CollapsibleTreeExtended.
 */
export const CheckboxTreeExtended: ICheckboxTreeExtendedSFC = ({ className, size = EComponentSize.MD, ...rest }) => {
    const adaptive = useMobileView();
    // В мобильном представлении размер зафиксирован, чтобы область нажатия оставалась достаточной.
    const contextValue = React.useMemo(() => ({ size: adaptive ? EComponentSize.MD : size }), [adaptive, size]);

    return (
        <CheckboxTreeExtendedContext.Provider value={contextValue}>
            <CollapsibleTreeExtended className={clsx(styles.checkboxTreeExtended, className)} {...rest} />
        </CheckboxTreeExtendedContext.Provider>
    );
};

CheckboxTreeExtended.displayName = "CheckboxTreeExtended";
CheckboxTreeExtended.Checkbox = CheckboxTreeExtendedCheckbox;
CheckboxTreeExtended.Node = CheckboxTreeExtendedNode;
