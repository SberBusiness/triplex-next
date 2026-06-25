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

interface IPlaygroundArgs {
    type: EHeaderPageType;
    size?: EComponentSize;
}

export const Playground = ({ type, size }: IPlaygroundArgs) => {
    const content = (
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
                <Button
                    size={EComponentSize.MD}
                    theme={type === EHeaderPageType.FIRST ? EButtonTheme.SECONDARY : EButtonTheme.SECONDARY_LIGHT}
                >
                    Отмена
                </Button>
                <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                    Сохранить
                </Button>
            </Page.Header.Title.Controls>
        </Page.Header.Title>
    );

    // size доступен только для типа FIRST; для SECOND проп size типизирован как never.
    return type === EHeaderPageType.FIRST ? (
        <Page.Header type={type} size={size}>
            {content}
        </Page.Header>
    ) : (
        <Page.Header type={type}>{content}</Page.Header>
    );
};
