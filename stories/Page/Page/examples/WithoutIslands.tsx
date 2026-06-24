import React from "react";
import {
    Page,
    EHeaderPageType,
    EBodyPageType,
    EFooterPageType,
    Button,
    EButtonTheme,
    EComponentSize,
    Title,
    Text,
    ETitleSize,
    ETextSize,
    EFontType,
    Gap,
} from "@sberbusiness/triplex-next";

// Header, Body и Footer типа SECOND — без Island (без карточек). Используется в layout, а не в LightBox.
export const WithoutIslands = () => (
    <Page>
        <Page.Header type={EHeaderPageType.SECOND}>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Title text
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Optional description about the page
                    </Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>

        <Page.Body type={EBodyPageType.SECOND}>
            <Text tag="div" size={ETextSize.B3}>
                Page content
            </Text>
        </Page.Body>

        <Page.Footer type={EFooterPageType.SECOND}>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>
                    <Text size={ETextSize.B3}>Footer page text</Text>
                </Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY_LIGHT}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                        Button text
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);
