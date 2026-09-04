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
} from "@sberbusiness/triplex-next";

export const WithSubhead = () => (
    <Header>
        <Header.Title>
            <Header.Title.Content>
                <Title tag="h1" size={ETitleSize.H1}>
                    Платёжное поручение № 145
                </Title>
            </Header.Title.Content>
            <Header.Title.Controls>
                <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                    Подписать
                </Button>
            </Header.Title.Controls>
        </Header.Title>

        <Header.Subhead>
            <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                Документ создан 12.05.2026 · Ожидает подписи
            </Text>
        </Header.Subhead>
    </Header>
);
