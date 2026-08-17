import React, { useState } from "react";
import { EComponentSize, TabsExtended } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Обзор" },
    { id: "tab-2", label: "Операции" },
    { id: "tab-3", label: "Документы" },
];

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [selectedId, setSelectedId] = useState("tab-1");

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <TabsExtended selectedId={selectedId} onSelectTab={setSelectedId}>
                {/* size задаётся отдельно: на Content — отступы и скругление контейнера, на TabButton — высота кнопки. */}
                <TabsExtended.Content size={size}>
                    <TabsExtended.Content.TabsWrapper>
                        {TABS.map(({ id, label }) => (
                            <TabsExtended.Content.Tab key={id} id={id}>
                                {({ selected }) => (
                                    <TabsExtended.Content.TabButton selected={selected} size={size}>
                                        {label}
                                    </TabsExtended.Content.TabButton>
                                )}
                            </TabsExtended.Content.Tab>
                        ))}
                    </TabsExtended.Content.TabsWrapper>
                </TabsExtended.Content>
            </TabsExtended>
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
