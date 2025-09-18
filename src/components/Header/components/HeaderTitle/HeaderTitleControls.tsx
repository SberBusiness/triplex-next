import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента HeaderTitleControls. */
export interface IHeaderTitleControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок с кнопками действий HeaderTitle. */
export const HeaderTitleControls = React.forwardRef<HTMLDivElement, IHeaderTitleControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[globalHeaderTitleControls]", className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

HeaderTitleControls.displayName = "HeaderTitleControls";
