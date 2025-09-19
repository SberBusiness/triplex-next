import React from "react";
import { clsx } from "clsx";
import { HeaderTabs } from "./components/HeaderTabs/HeaderTabs";
import { HeaderTitle } from "./components/HeaderTitle/HeaderTitle";
import { HeaderSubheader } from "./components/HeaderSubheader/HeaderSubheader";
import { HeaderLayoutSidebar } from "./components/HeaderLayoutSidebar/HeaderLayoutSidebar";
import styles from "./styles/Header.module.less";

/** Свойства компонента Header. */
export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Header прилипает к верхней границе экрана при скролле.
     * */
    sticky?: boolean;
}

/** Заголовок. */
export const Header = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderProps>(function Header({ className, sticky, ...rest }, ref) {
        return (
            <div
                className={clsx(styles.header, { [styles.sticky]: Boolean(sticky) }, className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            />
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
