import React, { useState } from "react";
import { TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Tab Name 1" },
    { id: "tabs-line-draft", label: "Tab Name 2" },
    { id: "tabs-line-sign", label: "Tab Name 3" },
    { id: "tabs-line-executed", label: "Tab Name 4" },
    { id: "tabs-line-rejected", label: "Tab Name 5" },
];

export const WithDropdown = () => {
    const [selectedId, setSelectedId] = useState("tabs-line-all");

    return (
        // maxVisible считает и кнопку дропдауна: в строке остаются два таба, остальные уезжают в список.
        <TabsLine tabs={TABS} selectedId={selectedId} onChangeTab={setSelectedId} maxVisible={3} />
    );
};
