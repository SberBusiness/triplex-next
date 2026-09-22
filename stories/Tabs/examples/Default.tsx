import React, { useState } from "react";
import { Tabs } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Обзор" },
    { id: "tab-2", label: "Операции" },
    { id: "tab-3", label: "Документы" },
];

export const Default = () => {
    const [selectedId, setSelectedId] = useState("tab-1");

    return (
        <Tabs
            tabs={TABS}
            selectedId={selectedId}
            onSelectTab={setSelectedId}
            buttonDropdownAttributes={{ "aria-label": "Ещё табы" }}
        />
    );
};
