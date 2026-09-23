import React, { useState } from "react";
import { EComponentSize, Tabs } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Tab Name 1" },
    { id: "tab-2", label: "Tab Name 2" },
    { id: "tab-3", label: "Tab Name 3" },
];

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [selectedId, setSelectedId] = useState("tab-1");

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <Tabs
                tabs={TABS}
                size={size}
                selectedId={selectedId}
                onSelectTab={setSelectedId}
                buttonDropdownAttributes={{ "aria-label": "Ещё табы" }}
            />
        </div>
    );
};

const SIZES = Object.values(EComponentSize);

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
