import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента HeaderTabsControls. */
export interface IHeaderTabsControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок с кнопками действий HeaderTabs. */
export const HeaderTabsControls = React.forwardRef<HTMLDivElement, IHeaderTabsControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[headerTabsControls]", className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

HeaderTabsControls.displayName = "HeaderTabsControls";
