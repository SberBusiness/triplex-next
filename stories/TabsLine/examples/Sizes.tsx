import React, { useState } from "react";
import { EComponentSize, TabsLine } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tabs-line-all", label: "Все" },
    { id: "tabs-line-draft", label: "Черновики" },
    { id: "tabs-line-sign", label: "На подпись" },
    { id: "tabs-line-executed", label: "Исполненные" },
    { id: "tabs-line-rejected", label: "Отклоненные" },
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
