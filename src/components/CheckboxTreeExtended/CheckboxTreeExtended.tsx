import React from "react";
import {
    CollapsibleTreeExtended,
    ICollapsibleTreeExtendedProps,
} from "../CollapsibleTreeExtended/CollapsibleTreeExtended";
import { CheckboxTreeExtendedCheckbox } from "./components/CheckboxTreeExtendedCheckbox";
import { CheckboxTreeExtendedNode } from "./components/CheckboxTreeExtendedNode";
import { CheckboxTreeExtendedContext } from "./CheckboxTreeExtendedContext";
import clsx from "clsx";
import { EComponentSize } from "../../enums/EComponentSize";
import { EScreenWidth } from "../../helpers/breakpoints";
import { useMatchMedia } from "../MediaWidth/useMatchMedia";
import styles from "./styles/CheckboxTreeExtended.module.less";

/** Свойства CheckboxTreeExtended. */
export interface ICheckboxTreeExtendedProps extends ICollapsibleTreeExtendedProps {
    /** Размер дерева чекбоксов. */
    size?: EComponentSize;
}

export interface ICheckboxTreeExtendedSFC extends React.FC<ICheckboxTreeExtendedProps> {
    Checkbox: typeof CheckboxTreeExtendedCheckbox;
    Node: typeof CheckboxTreeExtendedNode;
}

/**
 * Декларативное дерево чекбоксов.
 * Является оберткой над CollapsibleTreeExtended.
 */
export const CheckboxTreeExtended: ICheckboxTreeExtendedSFC = ({ className, size = EComponentSize.MD, ...rest }) => {
    const adaptive = useMatchMedia(
        `(max-width: ${EScreenWidth.SM_MAX})`,
        window.innerWidth <= parseInt(EScreenWidth.SM_MAX),
    );

    return (
        <CheckboxTreeExtendedContext.Provider value={{ size: adaptive ? EComponentSize.MD : size }}>
            <CollapsibleTreeExtended className={clsx(styles.checkboxTreeExtended, className)} {...rest} />
        </CheckboxTreeExtendedContext.Provider>
    );
};

CheckboxTreeExtended.displayName = "CheckboxTreeExtended";
CheckboxTreeExtended.Checkbox = CheckboxTreeExtendedCheckbox;
CheckboxTreeExtended.Node = CheckboxTreeExtendedNode;
