import React, { useState } from "react";
import { action } from "storybook/actions";
import { EComponentSize, ETabsExtendedType, Tabs } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Обзор" },
    { id: "tab-2", label: "Операции" },
    { id: "tab-3", label: "Документы" },
    { id: "tab-4", label: "Реквизиты" },
    { id: "tab-5", label: "Выписка" },
    { id: "tab-6", label: "Настройки" },
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
