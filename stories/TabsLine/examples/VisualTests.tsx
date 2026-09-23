import React from "react";
import { TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Tab Name 1" },
    { id: "tabs-line-draft", label: "Tab Name 2", showNotificationIcon: true },
    { id: "tabs-line-sign", label: "Tab Name 3" },
    { id: "tabs-line-executed", label: "Tab Name 4" },
    { id: "tabs-line-rejected", label: "Tab Name 5" },
];

/**
 * Единственный набор табов в стори — иначе клавиатурная последовательность play промахнётся:
 * первый Tab должен попадать именно в этот компонент.
 * Выбранный таб зафиксирован, состояние не меняется — скриншот стабилен.
 * Отступ снизу оставлен под раскрытый список: он рендерится через Portal поверх страницы.
 */
export const VisualTests = () => (
    <div style={{ paddingBottom: "220px" }}>
        <TabsLine tabs={TABS} selectedId="tabs-line-all" onChangeTab={() => {}} maxVisible={3} withSeparator />
    </div>
);
