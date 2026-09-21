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

/**
 * CheckboxTreeExtended вместе с составными частями.
 *
 * Явная аннотация снимает проверку лишних свойств у Object.assign, поэтому при добавлении
 * или удалении статики этот интерфейс нужно править синхронно: иначе новая статика окажется
 * в рантайме, но не попадёт в публичный тип, и TypeScript промолчит.
 */
export interface ICheckboxTreeExtendedFC extends React.ForwardRefExoticComponent<
    ICheckboxTreeExtendedProps & React.RefAttributes<HTMLUListElement>
> {
    /** Чекбокс ноды дерева. */
    Checkbox: typeof CheckboxTreeExtendedCheckbox;
    /** Нода дерева. */
    Node: typeof CheckboxTreeExtendedNode;
}

/**
 * @deprecated Используйте ICheckboxTreeExtendedFC. Алиас сохранён, чтобы не ломать существующие импорты.
 */
export type ICheckboxTreeExtendedSFC = ICheckboxTreeExtendedFC;

/**
 * Декларативное дерево чекбоксов.
 * Является оберткой над CollapsibleTreeExtended.
 *
 * ref указывает на корневой <ul role="tree">.
 */
export const CheckboxTreeExtended: ICheckboxTreeExtendedFC = Object.assign(
    React.forwardRef<HTMLUListElement, ICheckboxTreeExtendedProps>(
        ({ className, size = EComponentSize.MD, ...rest }, ref) => {
            const adaptive = useMobileView();
            // В мобильном представлении размер зафиксирован, чтобы область нажатия оставалась достаточной.
            const contextValue = React.useMemo(() => ({ size: adaptive ? EComponentSize.MD : size }), [adaptive, size]);

            return (
                <CheckboxTreeExtendedContext.Provider value={contextValue}>
                    <CollapsibleTreeExtended
                        className={clsx(styles.checkboxTreeExtended, className)}
                        {...rest}
                        ref={ref}
                    />
                </CheckboxTreeExtendedContext.Provider>
            );
        },
    ),
    {
        Checkbox: CheckboxTreeExtendedCheckbox,
        Node: CheckboxTreeExtendedNode,
    },
);

CheckboxTreeExtended.displayName = "CheckboxTreeExtended";
