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

/**
 * Прилипающий футер (`sticky`) работает только для типа FIRST внутри контейнера прокрутки
 * (на практике — внутри LightBox). При прокрутке футер остаётся у нижней границы, а его нижние
 * углы плавно обнуляются и появляется тень (логика useStickyCornerRadius).
 */
export const Sticky = () => (
    <div style={{ height: "320px", overflowY: "auto", border: "1px solid #d0d3da", borderRadius: "12px" }}>
        <div style={{ padding: "24px" }}>
            {Array.from({ length: 12 }).map((_, index) => (
                <Text key={index} tag="p" size={ETextSize.B2}>
                    Прокрутите контент вниз — футер прилипнет к нижней границе контейнера.
                </Text>
            ))}
        </div>
        <Page.Footer type={EFooterPageType.FIRST} sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>
                    <Text size={ETextSize.B3}>Прилипающий футер</Text>
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
    </div>
);
