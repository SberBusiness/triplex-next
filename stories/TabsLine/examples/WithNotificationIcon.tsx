import React, { useState } from "react";
import { TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Tab Name 1" },
    { id: "tabs-line-draft", label: "Tab Name 2", showNotificationIcon: true },
    { id: "tabs-line-sign", label: "Tab Name 3", showNotificationIcon: true },
    { id: "tabs-line-executed", label: "Tab Name 4" },
];

export const WithNotificationIcon = () => {
    const [selectedId, setSelectedId] = useState("tabs-line-all");

    return <TabsLine tabs={TABS} selectedId={selectedId} onChangeTab={setSelectedId} />;
};
