import React from "react";
import { clsx } from "clsx";
import styles from "./styles/TabsLinePanel.module.less";
import { TabsLinePanelLinks } from "@sberbusiness/triplex-next/components/Table/TabsLinePanelLinks";
import { ITabsLinePanelProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

/** Внутренние составляющие панели табличных фильтров. */
export interface ITabsLinePanelComposition extends React.FC<ITabsLinePanelProps> {
    Links: typeof TabsLinePanelLinks;
}

/** Компонент TabsLinePanel. */
export const TabsLinePanel: ITabsLinePanelComposition = ({ children, className, ...htmlDivAttributes }) => (
    <div className={clsx(styles.tabsLinePanel, className)} {...htmlDivAttributes}>
        {children}
    </div>
);

TabsLinePanel.Links = TabsLinePanelLinks;
TabsLinePanel.displayName = "TabsLinePanel";
