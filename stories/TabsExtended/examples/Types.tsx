import React, { useState } from "react";
import { ETabsExtendedType, TabsExtended } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Обзор" },
    { id: "tab-2", label: "Операции" },
    { id: "tab-3", label: "Документы" },
];

interface ITypeItemProps {
    type: ETabsExtendedType;
}

const TypeItem = ({ type }: ITypeItemProps) => {
    const [selectedId, setSelectedId] = useState("tab-1");

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{type}</div>
            <TabsExtended type={type} selectedId={selectedId} onSelectTab={setSelectedId}>
                <TabsExtended.Content>
                    <TabsExtended.Content.TabsWrapper>
                        {TABS.map(({ id, label }) => (
                            <TabsExtended.Content.Tab key={id} id={id}>
                                {({ selected }) => (
                                    <TabsExtended.Content.TabButton selected={selected}>
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

const TYPES = Object.values(ETabsExtendedType);

export const Types = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {TYPES.map((type) => (
            <TypeItem key={type} type={type} />
        ))}
    </div>
);
