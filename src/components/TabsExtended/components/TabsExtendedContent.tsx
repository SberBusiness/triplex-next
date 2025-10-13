import React from "react";
import clsx from "clsx";
import { TabsExtendedTabsWrapper } from "./TabsExtendedTabsWrapper";
import { TabsExtendedTab } from "./TabsExtendedTab";
import { TabsExtendedTabButton } from "./TabsExtendedTabButton";
import { TabsExtendedDropdownWrapper } from "./TabsExtendedDropdownWrapper";
import styles from "../styles/TabsExtended.module.less";

/** Свойства компонента TabsExtendedContent. */
export interface ITabsExtendedContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Внутренние составляющие TabsExtendedContent. */
export interface ITabsExtendedContentComposition {
    TabsWrapper: typeof TabsExtendedTabsWrapper;
    Tab: typeof TabsExtendedTab;
    TabButton: typeof TabsExtendedTabButton;
    DropdownWrapper: typeof TabsExtendedDropdownWrapper;
}

export const TabsExtendedContent: React.FC<ITabsExtendedContentProps> & ITabsExtendedContentComposition = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={clsx(styles.tabsExtendedContent, className)} {...htmlDivAttributes}>
        {children}
    </div>
);

TabsExtendedContent.TabsWrapper = TabsExtendedTabsWrapper;
TabsExtendedContent.Tab = TabsExtendedTab;
TabsExtendedContent.TabButton = TabsExtendedTabButton;
TabsExtendedContent.DropdownWrapper = TabsExtendedDropdownWrapper;
