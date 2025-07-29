import React from "react";
import clsx from "clsx";
import styles from "./Row.module.less";

/** Свойства компонента Row. */
export interface IRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Вертикальный нижний отступ. */
    paddingBottom?: boolean;
}

/**
 * Validates that all children are Col components.
 * @param children - React children to validate
 * @throws Error if any child is not a Col component
 */
const validateChildren = (children: React.ReactNode): void => {
    if (!children) return;

    const validateChild = (child: React.ReactNode): void => {
        if (!child) return;

        if (Array.isArray(child)) {
            child.forEach(validateChild);
            return;
        }

        if (typeof child === "object" && "type" in child) {
            const componentType = child.type as React.ComponentType<unknown>;

            // Check if it's a Col component by displayName or name
            if (componentType?.displayName === "Col" || componentType?.name === "Col") {
                return;
            }

            // If it's a React element with children, validate the children
            if (child.props?.children) {
                validateChild(child.props.children);
                return;
            }

            throw new Error("You can use only < Col /> elements");
        }
    };

    validateChild(children);
};

/**
 * Строка с нижним отступом, принимающая в children только колонки Col.
 */
export const Row: React.FC<IRowProps> = ({ children, className, paddingBottom = true, ...htmlDivAttributes }) => {
    // Validate children in development mode
    if (process.env.NODE_ENV === "development") {
        validateChildren(children);
    }

    const cn = clsx(className, styles.row, { [styles.noPaddingBottom]: !paddingBottom });

    return (
        <div className={cn} {...htmlDivAttributes}>
            {children}
        </div>
    );
};

Row.displayName = "Row";
