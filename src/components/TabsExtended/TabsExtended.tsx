import React, { useState, useRef } from "react";
import clsx from "clsx";
import { TabsExtendedContext } from "./TabsExtendedContext";
import { TabsExtendedContent } from "./components/TabsExtendedContent";
import styles from "./styles/TabsExtended.module.less";
import { TTabsExtendedOnSelectTab } from "@sberbusiness/triplex-next/components/TabsExtended/types";
import { ETabsExtendedType } from "./enums";
import { mapTypeToClassName } from "./utils";

/** Свойства компонента TabsExtended. */
export interface ITabsExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Уникальный идентификатор выбранного таба. */
    selectedId: string;
    /** Обработчик выбора таба. */
    onSelectTab: TTabsExtendedOnSelectTab;
    /** Тип компонента. */
    type?: ETabsExtendedType;
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
    type = ETabsExtendedType.TYPE_1,
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
                type,
            }}
        >
            <div
                className={clsx(styles.tabsExtended, mapTypeToClassName(type, styles), className)}
                role="tablist"
                {...htmlDivAttributes}
            >
                {children}
            </div>
        </TabsExtendedContext.Provider>
    );
};

TabsExtended.Content = TabsExtendedContent;
