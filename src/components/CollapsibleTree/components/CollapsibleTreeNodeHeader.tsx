import React, { forwardRef } from "react";
import { CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { ICollapsibleTreeExtendedNodeHeaderProvideProps } from "../../CollapsibleTreeExtended/components/CollapsibleTreeExtendedNode";
import styles from "../styles/CollapsibleTreeNodeHeader.module.less";

/** Свойства CollapsibleTreeNodeHeader. */
export interface ICollapsibleTreeNodeHeaderProps
    extends ICollapsibleTreeExtendedNodeHeaderProvideProps, React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Заголовок ноды CollapsibleTree.
 * Рендерит кнопку с шевроном-индикатором раскрытия для нод с детьми
 * и неактивную кнопку без шеврона для леаф-нод. Типографику заголовка задавай
 * через {@link CollapsibleTreeNodeLabel} в `children`.
 */
export const CollapsibleTreeNodeHeader = forwardRef<HTMLButtonElement, ICollapsibleTreeNodeHeaderProps>(
    ({ children, className, opened, toggle, onClick, hasChildNodes, ...props }, ref) => {
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (hasChildNodes) {
                toggle(!opened);
            }
            onClick?.(event);
        };

        return (
            <button
                {...props}
                ref={ref}
                type="button"
                className={clsx(styles.collapsibleTreeNodeHeader, className, { [styles.interactive]: hasChildNodes })}
                onClick={handleClick}
                aria-expanded={hasChildNodes ? opened : undefined}
                disabled={!hasChildNodes}
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
