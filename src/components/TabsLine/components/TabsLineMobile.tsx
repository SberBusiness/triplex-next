import React from "react";
import clsx from "clsx";
import { ITabsLineBaseProps } from "../types";
import { ITabsLineItemProps, TabsLineItem } from "./TabsLineItem";
import styles from "../styles/TabsLineMobile.module.less";

/** Свойства компонента TabsLineMobile. */
interface ITabsLineMobileProps extends ITabsLineBaseProps {}

/**
 * Мобильный вариант TabsLine: табы в одну строку с горизонтальной прокруткой, без дропдауна.
 * Размер таба здесь всегда дефолтный: prop size мобильным вариантом не поддерживается.
 */
export const TabsLineMobile = React.forwardRef<HTMLDivElement, ITabsLineMobileProps>(
    // size намеренно не используется — он исключён из спреда, чтобы не уйти на <div> как невалидный атрибут.
    ({ className, onChangeTab, selectedId, size, tabs, ...htmlDivAttributes }, ref) => {
        const renderTab = ({ selected, onClick, ...item }: ITabsLineItemProps) => {
            const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
                onChangeTab(item.id);
                onClick?.(event);
            };

            return <TabsLineItem key={item.id} selected={selectedId === item.id} {...item} onClick={handleClick} />;
        };

        if (tabs.length === 0) {
            return null;
        }

        return (
            <div {...htmlDivAttributes} className={clsx(styles.tabsLineMobileWrapper, className)} ref={ref}>
                <div className={styles.tabsLineMobile}>{tabs.map(renderTab)}</div>
            </div>
        );
    },
);

TabsLineMobile.displayName = "TabsLineMobile";
