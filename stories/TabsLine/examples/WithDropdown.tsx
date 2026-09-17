import React, { useState } from "react";
import { TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Все" },
    { id: "tabs-line-draft", label: "Черновики" },
    { id: "tabs-line-sign", label: "На подпись и отправку" },
    { id: "tabs-line-executed", label: "Исполненные" },
    { id: "tabs-line-rejected", label: "Отклоненные" },
];

export const WithDropdown = () => {
    const [selectedId, setSelectedId] = useState("tabs-line-all");

    return (
        // maxVisible считает и кнопку дропдауна: в строке остаются два таба, остальные уезжают в список.
        <TabsLine tabs={TABS} selectedId={selectedId} onChangeTab={setSelectedId} maxVisible={3} />
    );
};
