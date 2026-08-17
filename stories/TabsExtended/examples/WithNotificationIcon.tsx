import React, { useState } from "react";
import { TabsExtended } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Обзор", showNotificationIcon: false },
    { id: "tab-2", label: "Операции", showNotificationIcon: true },
    { id: "tab-3", label: "Документы", showNotificationIcon: true },
];

export const WithNotificationIcon = () => {
    const [selectedId, setSelectedId] = useState("tab-1");

    return (
        <TabsExtended selectedId={selectedId} onSelectTab={setSelectedId}>
            <TabsExtended.Content>
                <TabsExtended.Content.TabsWrapper>
                    {TABS.map(({ id, label, showNotificationIcon }) => (
                        <TabsExtended.Content.Tab key={id} id={id}>
                            {({ selected }) => (
                                <TabsExtended.Content.TabButton
                                    selected={selected}
                                    showNotificationIcon={showNotificationIcon}
                                >
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
