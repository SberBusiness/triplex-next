import React from "react";
import {
    Page,
    EHeaderPageType,
    EComponentSize,
    Button,
    EButtonTheme,
    Title,
    ETitleSize,
    Text,
    ETextSize,
    EFontType,
    Gap,
} from "@sberbusiness/triplex-next";

export const Default = () => (
    <Page.Header type={EHeaderPageType.FIRST}>
        <Page.Header.Title>
            <Page.Header.Title.Content>
                <Title tag="h1" size={ETitleSize.H1}>
                    Заголовок страницы
                </Title>
                <Gap size={8} />
                <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                    Дополнительное описание страницы
                </Text>
            </Page.Header.Title.Content>
            <Page.Header.Title.Controls>
                <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                    Отмена
                </Button>
                <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                    Сохранить
                </Button>
            </Page.Header.Title.Controls>
        </Page.Header.Title>
    </Page.Header>
);
