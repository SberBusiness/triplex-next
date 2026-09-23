import React, { useState } from "react";
import { Tabs } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Tab Name 1" },
    { id: "tab-2", label: "Tab Name 2" },
    { id: "tab-3", label: "Tab Name 3" },
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
