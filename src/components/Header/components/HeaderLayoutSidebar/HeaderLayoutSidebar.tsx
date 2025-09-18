import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { HeaderLayoutSidebarContent } from "./HeaderLayoutSidebarContent";
import { HeaderLayoutSidebarSidebar } from "./HeaderLayoutSidebarSidebar";

/** Свойства компонента HeaderLayoutSidebar. */
export interface IHeaderLayoutSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Layout для Header с sidebar. */
export const HeaderLayoutSidebar = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderLayoutSidebarProps>(function HeaderLayoutSidebar(
        { children, className, ...rest },
        ref,
    ) {
        return (
            <div className={classnames("cssClass[headerLayoutSidebar]", className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Content: HeaderLayoutSidebarContent,
        Sidebar: HeaderLayoutSidebarSidebar,
    },
);

HeaderLayoutSidebar.displayName = "HeaderLayoutSidebar";
