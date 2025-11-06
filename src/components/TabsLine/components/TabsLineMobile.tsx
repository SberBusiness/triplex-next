import React from "react";
import { ITabsLineItemProps, TabsLineItem } from "./TabsLineItem";
import { ITabsLineBaseProps } from "../types";
import styles from "../styles/TabsLineMobile.module.less";

/** Свойства компонента ITabsLineMobileProps. */
interface ITabsLineMobileProps extends ITabsLineBaseProps {}

/** Компонент TabsLineMobile. */
export const TabsLineMobile: React.FC<ITabsLineMobileProps> = ({ onChangeTab, selectedTabId, tabs }) => {
    if (!tabs.length) {
        return null;
    }

    const renderTab = ({ selected, ...item }: ITabsLineItemProps) => {
        const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
            onChangeTab(item.id);
            item.onClick?.(event as React.MouseEvent<HTMLButtonElement>);
        };

        return <TabsLineItem key={item.id} selected={selectedTabId === item.id} {...item} onClick={handleClick} />;
    };

    return (
        <div className={styles.tabsLineMobileWrapper}>
            <div className={styles.tabsLineMobile}>{tabs.map(renderTab)}</div>
        </div>
    );
};
