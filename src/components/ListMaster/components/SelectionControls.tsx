import React from "react";
import clsx from "clsx";
import styles from "../styles/SelectionControls.module.less";

/** Свойства компонента SelectionControls. */
export interface ISelectionControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контент SelectionControls. */
export const SelectionControls = React.forwardRef<HTMLDivElement, ISelectionControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div
            className={clsx(styles.selectionControls, className)}
            {...rest}
            data-tx={process.env.npm_package_version}
            ref={ref}
        >
            {children}
        </div>
    )
);

SelectionControls.displayName = "SelectionControls";
