import React, { useState } from "react";
import {
    Header,
    Button,
    EButtonTheme,
    EComponentSize,
    Tabs,
    Title,
    ETitleSize,
    Text,
    ETextSize,
    EFontType,
    Gap,
} from "@sberbusiness/triplex-next";

const tabs = [
    { id: "header-tab-overview", label: "Обзор" },
    { id: "header-tab-operations", label: "Операции" },
    { id: "header-tab-documents", label: "Документы" },
];

export const WithTabs = () => {
    const [selectedTabId, setSelectedTabId] = useState("header-tab-overview");

    return (
        <Header>
            <Header.Title>
                <Header.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Расчётный счёт
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        40702810300000012345 · Рубли РФ
                    </Text>
                </Header.Title.Content>
            </Header.Title>

            <Header.Tabs>
                <Header.Tabs.Content>
                    <Tabs
                        tabs={tabs}
                        selectedId={selectedTabId}
                        onSelectTab={setSelectedTabId}
                        size={EComponentSize.MD}
                        buttonDropdownAttributes={{ "aria-label": "Другие вкладки" }}
                    />
                </Header.Tabs.Content>
                <Header.Tabs.Controls>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                        Реквизиты
                    </Button>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                        Создать платёж
                    </Button>
                </Header.Tabs.Controls>
            </Header.Tabs>
        </Header>
    );
};
