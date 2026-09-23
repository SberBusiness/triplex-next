import React, { useState } from "react";
import { EComponentSize, TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Tab Name 1" },
    { id: "tabs-line-draft", label: "Tab Name 2" },
    { id: "tabs-line-sign", label: "Tab Name 3" },
    { id: "tabs-line-executed", label: "Tab Name 4" },
    { id: "tabs-line-rejected", label: "Tab Name 5" },
];

/** Пятый таб уходит в дропдаун — так кнопка дропдауна попадает в кадр во всех трёх размерах. */
const MAX_VISIBLE = 4;

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [selectedId, setSelectedId] = useState("tabs-line-all");

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <TabsLine
                tabs={TABS}
                selectedId={selectedId}
                onChangeTab={setSelectedId}
                size={size}
                maxVisible={MAX_VISIBLE}
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
