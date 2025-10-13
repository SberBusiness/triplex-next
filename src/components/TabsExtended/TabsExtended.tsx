import React, { useState, useRef } from "react";
import clsx from "clsx";
import { TabsExtendedContext } from "./TabsExtendedContext";
import { TabsExtendedContent } from "./components/TabsExtendedContent";
import styles from "./styles/TabsExtended.module.less";
import { TTabsExtendedOnSelectTab } from "@sberbusiness/triplex-next/components/TabsExtended/types";

/** Свойства компонента TabsExtended. */
export interface ITabsExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Уникальный идентификатор выбранного таба. */
    selectedId: string;
    /** Обработчик выбора таба. */
    onSelectTab: TTabsExtendedOnSelectTab;
}

/** Внутренние составляющие компонента TabsExtended. */
interface ITabsExtendedComposition {
    Content: typeof TabsExtendedContent;
}

/** Базовый компонент табов. На его основе можно рендерить табы любого дизайна. */
export const TabsExtended: React.FC<ITabsExtendedProps> & ITabsExtendedComposition = ({
    children,
    className,
    selectedId,
    onSelectTab,
    ...htmlDivAttributes
}) => {
    const [inlineItemsIds, setInlineItemsIds] = useState<string[]>([]);
    const [dropdownItemsIds, setDropdownItemsIds] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelectTab = (id: string) => {
        if (selectedId !== id) {
            onSelectTab(id);
        }
    };

    return (
        <TabsExtendedContext.Provider
            value={{
                dropdownItemsIds,
                dropdownRef,
                inlineItemsIds,
                onSelectTab: handleSelectTab,
                selectedId,
                setDropdownItemsIds,
                setInlineItemsIds,
            }}
        >
            <div className={clsx(styles.tabsExtended, className)} role="tablist" {...htmlDivAttributes}>
                {children}
            </div>
        </TabsExtendedContext.Provider>
    );
};

TabsExtended.Content = TabsExtendedContent;
