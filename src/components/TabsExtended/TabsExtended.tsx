import React, { useCallback, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { TabsExtendedContext } from "./TabsExtendedContext";
import { TabsExtendedContent } from "./components/TabsExtendedContent";
import { ETabsExtendedType } from "./enums";
import { TTabsExtendedOnSelectTab } from "./types";
import { TABS_EXTENDED_TYPE_TO_CLASS_NAME_MAP } from "./utils";
import styles from "./styles/TabsExtended.module.less";

/** Свойства компонента TabsExtended. */
export interface ITabsExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Уникальный идентификатор выбранного таба. */
    selectedId: string;
    /** Обработчик выбора таба. Не вызывается, если выбирается уже выбранный таб. */
    onSelectTab: TTabsExtendedOnSelectTab;
    /** Тип оформления, выбирается по фону страницы. По умолчанию ETabsExtendedType.TYPE_1 — серый фон контейнера для белой страницы. */
    type?: ETabsExtendedType;
}

/** Базовый компонент табов. На его основе можно рендерить табы любого дизайна. */
export const TabsExtended = Object.assign(
    React.forwardRef<HTMLDivElement, ITabsExtendedProps>(
        (
            { children, className, selectedId, onSelectTab, type = ETabsExtendedType.TYPE_1, ...htmlDivAttributes },
            ref,
        ) => {
            const [inlineItemsIds, setInlineItemsIds] = useState<string[]>([]);
            const [dropdownItemsIds, setDropdownItemsIds] = useState<string[]>([]);
            const dropdownRef = useRef<HTMLDivElement | null>(null);

            const handleSelectTab = useCallback(
                (id: string) => {
                    if (selectedId !== id) {
                        onSelectTab(id);
                    }
                },
                [onSelectTab, selectedId],
            );

            const contextValue = useMemo(
                () => ({
                    dropdownItemsIds,
                    dropdownRef,
                    inlineItemsIds,
                    onSelectTab: handleSelectTab,
                    selectedId,
                    setDropdownItemsIds,
                    setInlineItemsIds,
                    type,
                }),
                [dropdownItemsIds, handleSelectTab, inlineItemsIds, selectedId, type],
            );

            return (
                <TabsExtendedContext.Provider value={contextValue}>
                    <div
                        className={clsx(styles.tabsExtended, TABS_EXTENDED_TYPE_TO_CLASS_NAME_MAP[type], className)}
                        role="tablist"
                        {...htmlDivAttributes}
                        ref={ref}
                    >
                        {children}
                    </div>
                </TabsExtendedContext.Provider>
            );
        },
    ),
    { Content: TabsExtendedContent },
);

TabsExtended.displayName = "TabsExtended";
