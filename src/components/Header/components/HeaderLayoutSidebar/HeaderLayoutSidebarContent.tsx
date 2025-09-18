import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента HeaderLayoutSidebarContent. */
export interface IHeaderLayoutSidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок контента для Header с sidebar. */
export const HeaderLayoutSidebarContent = React.forwardRef<HTMLDivElement, IHeaderLayoutSidebarContentProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[headerLayoutSidebarContent]", className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

HeaderLayoutSidebarContent.displayName = "HeaderLayoutSidebarContent";
