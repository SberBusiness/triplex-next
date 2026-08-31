import React, { useState } from "react";
import {
    Header,
    Island,
    EIslandType,
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
    { id: "account-tab-operations", label: "Операции" },
    { id: "account-tab-statements", label: "Выписки" },
    { id: "account-tab-requisites", label: "Реквизиты" },
];

export const Example = () => {
    const [selectedTabId, setSelectedTabId] = useState("account-tab-operations");

    return (
        <Island type={EIslandType.TYPE_1} size={EComponentSize.MD}>
            <Header>
                <Header.LayoutSidebar>
                    <Header.LayoutSidebar.Content>
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
                            <Header.Title.Controls>
                                <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                                    Выписка
                                </Button>
                                <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                                    Создать платёж
                                </Button>
                            </Header.Title.Controls>
                        </Header.Title>
                    </Header.LayoutSidebar.Content>

                    <Header.LayoutSidebar.Sidebar style={{ paddingLeft: "24px" }}>
                        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                            Остаток на счёте
                        </Text>
                        <Gap size={4} />
                        <Title tag="div" size={ETitleSize.H3}>
                            1 250 300,45 ₽
                        </Title>
                    </Header.LayoutSidebar.Sidebar>
                </Header.LayoutSidebar>

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
                </Header.Tabs>

                <Header.Subhead>
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Показаны операции за последние 30 дней
                    </Text>
                </Header.Subhead>
            </Header>
        </Island>
    );
};
