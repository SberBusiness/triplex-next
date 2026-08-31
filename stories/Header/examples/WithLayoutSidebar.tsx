import React from "react";
import {
    Header,
    Button,
    EButtonTheme,
    EComponentSize,
    Title,
    ETitleSize,
    Text,
    ETextSize,
    EFontType,
    Gap,
} from "@sberbusiness/triplex-next";

export const WithLayoutSidebar = () => (
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
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Создать платёж
                        </Button>
                    </Header.Title.Controls>
                </Header.Title>
            </Header.LayoutSidebar.Content>

            {/* Отступ от контента задаёт потребитель — своя раскладка у Sidebar отсутствует. */}
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
    </Header>
);
