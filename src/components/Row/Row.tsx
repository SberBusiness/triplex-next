import React, { useEffect } from "react";
import clsx from "clsx";
import { isComponentType, isReactElement } from "../../utils/reactChild";
import styles from "./Row.module.less";

/** Свойства компонента Row. */
export interface IRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Вертикальный нижний отступ. */
    paddingBottom?: boolean;
}

/**
 * Строка с нижним отступом, принимающая в children только колонки Col.
 */
export const Row: React.FC<IRowProps> = ({ children, className, paddingBottom = true, ...htmlDivAttributes }) => {
    /**
     * Проверка children-компонентов на нужный тип.
     * @param {React.ReactNode} [childrenToCheck] Чилдрены для проверки по названиям компонента.
     */
    const checkChildren = (childrenToCheck: React.ReactNode) => {
        React.Children.forEach(childrenToCheck, (child) => {
            if (isReactElement(child) && isComponentType(child.type) && child.type.displayName !== "Col") {
                throw new Error("You can use only < Col /> elements");
            }
        });
    };

    useEffect(() => {
        checkChildren(children);
    }, [children]);

    const cn = clsx(className, styles.row, { [styles.noPaddingBottom]: !paddingBottom });

    return (
        <div className={cn} {...htmlDivAttributes}>
            {children}
        </div>
    );
};

Row.displayName = "Row";
