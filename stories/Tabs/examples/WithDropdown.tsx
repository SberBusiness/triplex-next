import React, { useState } from "react";
import { Tabs } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Обзор" },
    { id: "tab-2", label: "Операции" },
    { id: "tab-3", label: "Документы" },
    { id: "tab-4", label: "Реквизиты" },
    { id: "tab-5", label: "Выписка" },
    { id: "tab-6", label: "Настройки" },
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
