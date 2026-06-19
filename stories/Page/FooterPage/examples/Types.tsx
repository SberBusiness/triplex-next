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

const controls = (type: EFooterPageType) => (
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

export const Types = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>FIRST</div>
            <Page.Footer type={EFooterPageType.FIRST}>{controls(EFooterPageType.FIRST)}</Page.Footer>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>SECOND</div>
            <Page.Footer type={EFooterPageType.SECOND}>{controls(EFooterPageType.SECOND)}</Page.Footer>
        </div>
    </div>
);
