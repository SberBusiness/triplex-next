import React, { useState } from "react";
import { Tabs } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Tab Name 1" },
    { id: "tab-2", label: "Tab Name 2" },
    { id: "tab-3", label: "Tab Name 3" },
    { id: "tab-4", label: "Tab Name 4" },
    { id: "tab-5", label: "Tab Name 5" },
    { id: "tab-6", label: "Tab Name 6" },
];

export const WithDropdown = () => {
    const [selectedId, setSelectedId] = useState("tab-1");

    return (
        // Ширина контейнера ограничена, чтобы часть табов не поместилась в строку и уехала в выпадающий список.
        <div style={{ maxWidth: "420px" }}>
            <Tabs
                tabs={TABS}
                selectedId={selectedId}
                onSelectTab={setSelectedId}
                buttonDropdownAttributes={{ "aria-label": "Ещё табы" }}
            />
        </div>
    );
};
