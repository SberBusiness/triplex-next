import React, { useState } from "react";
import { ETabsExtendedType, Tabs } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Обзор" },
    { id: "tab-2", label: "Операции" },
    { id: "tab-3", label: "Документы" },
];

interface ITypeItemProps {
    caption: string;
    type: ETabsExtendedType;
}

const TypeItem = ({ caption, type }: ITypeItemProps) => {
    const [selectedId, setSelectedId] = useState("tab-1");

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{caption}</div>
            <Tabs
                tabs={TABS}
                type={type}
                selectedId={selectedId}
                onSelectTab={setSelectedId}
                buttonDropdownAttributes={{ "aria-label": "Ещё табы" }}
            />
        </div>
    );
};

export const Types = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <TypeItem caption="TYPE_1 — для белой страницы" type={ETabsExtendedType.TYPE_1} />
        <TypeItem caption="TYPE_2 — для затенённой страницы" type={ETabsExtendedType.TYPE_2} />
    </div>
);
