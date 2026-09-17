import React, { useState } from "react";
import { TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Все" },
    { id: "tabs-line-draft", label: "Черновики" },
    { id: "tabs-line-sign", label: "На подпись и отправку" },
    { id: "tabs-line-executed", label: "Исполненные" },
];

const PADDINGS: Array<0 | 8 | 16 | 24> = [0, 8, 16, 24];

interface IPaddingItemProps {
    paddingX: 0 | 8 | 16 | 24;
}

const PaddingItem = ({ paddingX }: IPaddingItemProps) => {
    const [selectedId, setSelectedId] = useState("tabs-line-all");

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{paddingX}</div>
            <TabsLine tabs={TABS} selectedId={selectedId} onChangeTab={setSelectedId} paddingX={paddingX} />
        </div>
    );
};

export const Paddings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {PADDINGS.map((paddingX) => (
            <PaddingItem key={paddingX} paddingX={paddingX} />
        ))}
    </div>
);
