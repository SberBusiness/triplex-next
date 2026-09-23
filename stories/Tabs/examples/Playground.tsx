import React, { useState } from "react";
import { action } from "storybook/actions";
import { EComponentSize, ETabsExtendedType, Tabs } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Tab Name 1" },
    { id: "tab-2", label: "Tab Name 2" },
    { id: "tab-3", label: "Tab Name 3" },
    { id: "tab-4", label: "Tab Name 4" },
    { id: "tab-5", label: "Tab Name 5" },
    { id: "tab-6", label: "Tab Name 6" },
];

/** Свойства примера Playground. */
export interface IPlaygroundProps {
    /** Тип оформления табов. */
    type: ETabsExtendedType;
    /** Размер компонента. */
    size: EComponentSize;
    /** Количество табов. */
    tabsCount: number;
    /** Ширина контейнера в пикселях: чем она меньше, тем больше табов уезжает в выпадающий список. */
    containerWidth: number;
    /** Значок новых уведомлений на втором табе. */
    showNotificationIcon: boolean;
}

export const Playground = ({ type, size, tabsCount, containerWidth, showNotificationIcon }: IPlaygroundProps) => {
    const [selectedId, setSelectedId] = useState("tab-1");

    const tabs = TABS.slice(0, tabsCount).map((tab, index) => ({
        ...tab,
        showNotificationIcon: showNotificationIcon && index === 1,
    }));

    const handleSelectTab = (id: string) => {
        action("onSelectTab")(id);
        setSelectedId(id);
    };

    return (
        <div style={{ width: `${containerWidth}px` }}>
            <Tabs
                tabs={tabs}
                type={type}
                size={size}
                selectedId={selectedId}
                onSelectTab={handleSelectTab}
                buttonDropdownAttributes={{ "aria-label": "Ещё табы" }}
            />
        </div>
    );
};
