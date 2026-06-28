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

interface IPlaygroundArgs {
    type: EFooterPageType;
    size?: EComponentSize;
}

export const Playground = ({ type, size }: IPlaygroundArgs) => {
    const content = (
        <Page.Footer.Description>
            <Page.Footer.Description.Content>
                <Text size={ETextSize.B3}>Контент футера страницы</Text>
            </Page.Footer.Description.Content>
            <Page.Footer.Description.Controls>
                <Button
                    size={EComponentSize.MD}
                    theme={type === EFooterPageType.FIRST ? EButtonTheme.SECONDARY : EButtonTheme.SECONDARY_LIGHT}
                >
                    Отмена
                </Button>
                <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                    Сохранить
                </Button>
            </Page.Footer.Description.Controls>
        </Page.Footer.Description>
    );

    // size доступен только для типа FIRST; для SECOND проп size типизирован как never.
    return type === EFooterPageType.FIRST ? (
        <Page.Footer type={type} size={size}>
            {content}
        </Page.Footer>
    ) : (
        <Page.Footer type={type}>{content}</Page.Footer>
    );
};
