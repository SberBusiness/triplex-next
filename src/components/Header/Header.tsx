import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { HeaderTabs } from "@sber-business/triplex/components/Header/components/HeaderTabs/HeaderTabs";
import { HeaderTitle } from "@sber-business/triplex/components/Header/components/HeaderTitle/HeaderTitle";
import { HeaderSubheader } from "@sber-business/triplex/components/Header/components/HeaderSubheader/HeaderSubheader";
import { HeaderLink } from "@sber-business/triplex/components/Header/components/HeaderLink/HeaderLink";
import { HeaderLayoutSidebar } from "./components/HeaderLayoutSidebar/HeaderLayoutSidebar";

/** Свойства компонента Header. */
export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Header прилипает к верхней границе экрана при скролле.
     * Свойство работает на экранах высотой более 800px и шириной более 1024px.
     * */
    sticky?: boolean;
}

/** Заголовок. */
export const Header = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderProps>(function Header({ className, sticky, ...rest }, ref) {
        return (
            <div
                className={classnames("cssClass[header]", { "cssClass[sticky]": Boolean(sticky) }, className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            />
        );
    }),
    {
        LayoutSidebar: HeaderLayoutSidebar,
        Link: HeaderLink,
        Subhead: HeaderSubheader,
        Tabs: HeaderTabs,
        Title: HeaderTitle,
    },
);

Header.displayName = "Header";
