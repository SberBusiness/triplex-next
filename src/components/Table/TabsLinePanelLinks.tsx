import React from "react";
import { clsx } from "clsx";
import styles from "./styles/TabsLinePanelLinks.module.less";
import { ITabsLinePanelLinksProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

/** Компонент TabsLinePanelLinks. */
export const TabsLinePanelLinks: React.FC<ITabsLinePanelLinksProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={clsx(className, styles.tabsLinePanelLinks)} {...htmlDivAttributes}>
        {children}
    </div>
);

TabsLinePanelLinks.displayName = "TabsLinePanelLinks";
