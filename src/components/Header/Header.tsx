import React from "react";
import { HeaderTabs } from "./components/HeaderTabs/HeaderTabs";
import { HeaderTitle } from "./components/HeaderTitle/HeaderTitle";
import { HeaderSubheader } from "./components/HeaderSubheader/HeaderSubheader";
import { HeaderLayoutSidebar } from "./components/HeaderLayoutSidebar/HeaderLayoutSidebar";

/** Свойства компонента Header. */
export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Заголовок. */
export const Header = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderProps>(function Header({ children, ...rest }, ref) {
        return (
            <div {...rest} data-tx={process.env.npm_package_version} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        LayoutSidebar: HeaderLayoutSidebar,
        Subhead: HeaderSubheader,
        Tabs: HeaderTabs,
        Title: HeaderTitle,
    },
);

Header.displayName = "Header";
