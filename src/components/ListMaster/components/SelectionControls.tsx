import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента SelectionControls. */
export interface ISelectionControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контент SelectionControls. */
export const SelectionControls = React.forwardRef<HTMLDivElement, ISelectionControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div
            className={classnames("cssClass[selectionControls]", className)}
            {...rest}
            data-tx={process.env.npm_package_version}
            ref={ref}
        >
            {children}
        </div>
    )
);

SelectionControls.displayName = "SelectionControls";
