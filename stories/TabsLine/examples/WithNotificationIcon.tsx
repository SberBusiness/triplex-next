import React, { useState } from "react";
import { TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Все" },
    { id: "tabs-line-draft", label: "Черновики", showNotificationIcon: true },
    { id: "tabs-line-sign", label: "На подпись и отправку", showNotificationIcon: true },
    { id: "tabs-line-executed", label: "Исполненные" },
];

export const WithNotificationIcon = () => {
    const [selectedId, setSelectedId] = useState("tabs-line-all");

    return <TabsLine tabs={TABS} selectedId={selectedId} onChangeTab={setSelectedId} />;
};
