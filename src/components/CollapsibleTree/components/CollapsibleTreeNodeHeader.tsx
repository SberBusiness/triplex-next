import React, { forwardRef } from "react";
import { CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { ICollapsibleTreeExtendedNodeHeaderProvideProps } from "../../CollapsibleTreeExtended/components/CollapsibleTreeExtendedNode";
import styles from "../styles/CollapsibleTreeNodeHeader.module.less";

/** Свойства кнопки заголовка, включая provide-пропсы из renderHeader у CollapsibleTreeExtended.Node. */
export interface ICollapsibleTreeNodeHeaderProps
    extends ICollapsibleTreeExtendedNodeHeaderProvideProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Содержимое кнопки. Для типовой типографики используй CollapsibleTreeNodeLabel. */
    children?: React.ReactNode;
}

/**
 * Кнопка заголовка CollapsibleTree с шевроном для узлов с детьми.
 * Получает состояние раскрытия и toggle из renderHeader у CollapsibleTreeExtended.Node;
 * для узлов без детей или при disabled кнопка неактивна.
 */
export const CollapsibleTreeNodeHeader = forwardRef<HTMLButtonElement, ICollapsibleTreeNodeHeaderProps>(
    (
        {
            children,
            className,
            opened,
            toggle,
            onClick,
            hasChildNodes,
            disabled,
            // Служебные поля дерева и анимации не являются атрибутами кнопки.
            activeNode,
            animating,
            isLastNode,
            ...props
        },
        ref,
    ) => {
        const interactive = hasChildNodes && !disabled;

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Нативный disabled блокирует click, поэтому дополнительная проверка не нужна.
            toggle(!opened);
            onClick?.(event);
        };

        return (
            <button
                {...props}
                ref={ref}
                type="button"
                // Глобальные классы @sberbusiness/icons-next "hoverable", "active" и "disabled" — задают цвет шеврона.
                className={clsx(styles.collapsibleTreeNodeHeader, "hoverable", className, {
                    [styles.interactive]: interactive,
                    // У леаф-нод opened всегда true (хак LeafNode), поэтому active только при наличии детей.
                    active: hasChildNodes && opened,
                    disabled,
                })}
                onClick={handleClick}
                aria-expanded={hasChildNodes ? opened : undefined}
                disabled={!interactive}
            >
                {hasChildNodes && (
                    <CaretrightStrokeSrvIcon24
                        paletteIndex={5}
                        className={clsx(styles.chevron, { [styles.opened]: opened })}
                        aria-hidden
                    />
                )}
                {children}
            </button>
        );
    },
);

CollapsibleTreeNodeHeader.displayName = "CollapsibleTreeNodeHeader";
