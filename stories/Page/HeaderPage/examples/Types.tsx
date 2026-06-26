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

const title = (type: EHeaderPageType) => (
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

export const Types = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>FIRST</div>
            <Page.Header type={EHeaderPageType.FIRST}>{title(EHeaderPageType.FIRST)}</Page.Header>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>SECOND</div>
            <Page.Header type={EHeaderPageType.SECOND}>{title(EHeaderPageType.SECOND)}</Page.Header>
        </div>
    </div>
);
