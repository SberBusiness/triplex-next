import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента HeaderLayoutSidebarSidebar. */
export interface IHeaderLayoutSidebarSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Header sidebar. */
export const HeaderLayoutSidebarSidebar = React.forwardRef<HTMLDivElement, IHeaderLayoutSidebarSidebarProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[headerLayoutSidebarSidebar]", className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

HeaderLayoutSidebarSidebar.displayName = "HeaderLayoutSidebarSidebar";
