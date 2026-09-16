import React, { useState } from "react";
import { TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Все" },
    { id: "tabs-line-draft", label: "Черновики" },
    { id: "tabs-line-sign", label: "На подпись и отправку" },
    { id: "tabs-line-executed", label: "Исполненные" },
];

export const Default = () => {
    const [selectedId, setSelectedId] = useState("tabs-line-all");

    return <TabsLine tabs={TABS} selectedId={selectedId} onChangeTab={setSelectedId} />;
};
