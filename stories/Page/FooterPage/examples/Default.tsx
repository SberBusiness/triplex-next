import React from "react";
import {
    Page,
    EFooterPageType,
    EComponentSize,
    Button,
    EButtonTheme,
    Text,
    ETextSize,
} from "@sberbusiness/triplex-next";

export const Default = () => (
    <Page.Footer type={EFooterPageType.FIRST}>
        <Page.Footer.Description>
            <Page.Footer.Description.Content>
                <Text size={ETextSize.B3}>Контент футера страницы</Text>
            </Page.Footer.Description.Content>
            <Page.Footer.Description.Controls>
                <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                    Отмена
                </Button>
                <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                    Сохранить
                </Button>
            </Page.Footer.Description.Controls>
        </Page.Footer.Description>
    </Page.Footer>
);
