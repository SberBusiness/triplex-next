import React, { useState } from "react";
import {
    Page,
    EHeaderPageType,
    EComponentSize,
    Button,
    EButtonTheme,
    Tabs,
    Title,
    ETitleSize,
    Text,
    ETextSize,
    EFontType,
    Gap,
} from "@sberbusiness/triplex-next";

const tabs = [
    { id: "header-page-tab-overview", label: "Обзор" },
    { id: "header-page-tab-operations", label: "Операции" },
];

export const ExampleWithTabs = () => {
    const [selectedTabId, setSelectedTabId] = useState("header-page-tab-overview");

    return (
        <Page.Header type={EHeaderPageType.FIRST}>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Расчётный счёт
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        40702810300000012345 · Рубли РФ
                    </Text>
                </Page.Header.Title.Content>
            </Page.Header.Title>

            <Page.Header.Tabs>
                <Page.Header.Tabs.Content>
                    <Tabs
                        tabs={tabs}
                        selectedId={selectedTabId}
                        onSelectTab={setSelectedTabId}
                        size={EComponentSize.MD}
                        buttonDropdownAttributes={{ "aria-label": "Другие вкладки" }}
                    />
                </Page.Header.Tabs.Content>
                <Page.Header.Tabs.Controls>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                        Реквизиты
                    </Button>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                        Создать платёж
                    </Button>
                </Page.Header.Tabs.Controls>
            </Page.Header.Tabs>
        </Page.Header>
    );
};
