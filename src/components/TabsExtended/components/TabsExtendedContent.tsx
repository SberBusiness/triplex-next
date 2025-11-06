import React from "react";
import clsx from "clsx";
import { TabsExtendedTabsWrapper } from "./TabsExtendedTabsWrapper";
import { TabsExtendedTab } from "./TabsExtendedTab";
import { TabsExtendedTabButton } from "./TabsExtendedTabButton";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { TabsExtendedDropdownWrapper } from "./TabsExtendedDropdownWrapper";
import styles from "../styles/TabsExtended.module.less";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";

/** Свойства компонента TabsExtendedContent. */
export interface ITabsExtendedContentProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: EComponentSize;
}

/** Внутренние составляющие TabsExtendedContent. */
export interface ITabsExtendedContentComposition {
    TabsWrapper: typeof TabsExtendedTabsWrapper;
    Tab: typeof TabsExtendedTab;
    TabButton: typeof TabsExtendedTabButton;
    DropdownWrapper: typeof TabsExtendedDropdownWrapper;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

export const TabsExtendedContent: React.FC<ITabsExtendedContentProps> & ITabsExtendedContentComposition = ({
    children,
    className,
    size = EComponentSize.MD,
    ...htmlDivAttributes
}) => {
    return (
        <div className={clsx(styles.tabsExtendedContent, sizeToClassNameMap[size], className)} {...htmlDivAttributes}>
            {children}
        </div>
    );
};

TabsExtendedContent.TabsWrapper = TabsExtendedTabsWrapper;
TabsExtendedContent.Tab = TabsExtendedTab;
TabsExtendedContent.TabButton = TabsExtendedTabButton;
TabsExtendedContent.DropdownWrapper = TabsExtendedDropdownWrapper;
