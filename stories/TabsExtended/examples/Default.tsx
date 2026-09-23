import React, { useState } from "react";
import { TabsExtended } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Tab Name 1" },
    { id: "tab-2", label: "Tab Name 2" },
    { id: "tab-3", label: "Tab Name 3" },
];

export const Default = () => {
    const [selectedId, setSelectedId] = useState("tab-1");

    return (
        <TabsExtended selectedId={selectedId} onSelectTab={setSelectedId}>
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
    );
};
