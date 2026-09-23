import React, { useState } from "react";
import { action } from "storybook/actions";
import { EComponentSize, TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Tab Name 1" },
    { id: "tabs-line-draft", label: "Tab Name 2" },
    { id: "tabs-line-sign", label: "Tab Name 3" },
    { id: "tabs-line-executed", label: "Tab Name 4" },
    { id: "tabs-line-rejected", label: "Tab Name 5" },
];

/** Свойства примера Playground. */
export interface IPlaygroundProps {
    /** Горизонтальный отступ от первого таба слева и последнего таба справа. */
    paddingX: 0 | 8 | 16 | 24;
    /** Максимальное число элементов строки, включая кнопку дропдауна. */
    maxVisible: number;
    /** Размер компонента. */
    size: EComponentSize;
    /** Значок новых уведомлений на втором табе. */
    showNotificationIcon: boolean;
    /** Разделитель в виде нижнего бордера. */
    withSeparator: boolean;
}

export const Playground = ({ paddingX, maxVisible, size, showNotificationIcon, withSeparator }: IPlaygroundProps) => {
    const [selectedId, setSelectedId] = useState("tabs-line-all");

    const tabs = TABS.map((tab, index) => ({
        ...tab,
        showNotificationIcon: showNotificationIcon && index === 1,
    }));

    const handleChangeTab = (tabId: string) => {
        action("onChangeTab")(tabId);
        setSelectedId(tabId);
    };

    return (
        <TabsLine
            tabs={tabs}
            selectedId={selectedId}
            onChangeTab={handleChangeTab}
            paddingX={paddingX}
            maxVisible={maxVisible}
            size={size}
            withSeparator={withSeparator}
            dropdownTargetHtmlAttributes={{ "data-test-id": "TabsLine__DropdownTarget" }}
        />
    );
};
