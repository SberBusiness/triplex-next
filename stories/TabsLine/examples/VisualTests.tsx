import React from "react";
import { TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Все" },
    { id: "tabs-line-draft", label: "Черновики", showNotificationIcon: true },
    { id: "tabs-line-sign", label: "На подпись и отправку" },
    { id: "tabs-line-executed", label: "Исполненные" },
    { id: "tabs-line-rejected", label: "Отклоненные" },
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
