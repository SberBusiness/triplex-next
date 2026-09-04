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

export const Default = () => (
    <Header>
        <Header.Title>
            <Header.Title.Content>
                <Title tag="h1" size={ETitleSize.H1}>
                    Заголовок страницы
                </Title>
                <Gap size={8} />
                <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                    Дополнительное описание страницы
                </Text>
            </Header.Title.Content>
            <Header.Title.Controls>
                <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                    Отмена
                </Button>
                <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                    Сохранить
                </Button>
            </Header.Title.Controls>
        </Header.Title>
    </Header>
);
