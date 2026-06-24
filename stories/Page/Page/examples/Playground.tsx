import React from "react";
import {
    Page,
    EHeaderPageType,
    EBodyPageType,
    EBodyPageVerticalMargin,
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

interface IPlaygroundArgs {
    headerType: EHeaderPageType;
    footerType: EFooterPageType;
    verticalMargin: EBodyPageVerticalMargin;
}

// Тип FIRST рисуется на карточке (Island), поэтому кнопки в нём — SECONDARY; для SECOND фон отсутствует, кнопки — SECONDARY_LIGHT.
const headerTypeToControlButtonThemeMap = {
    [EHeaderPageType.FIRST]: EButtonTheme.SECONDARY,
    [EHeaderPageType.SECOND]: EButtonTheme.SECONDARY_LIGHT,
};

const footerTypeToControlButtonThemeMap = {
    [EFooterPageType.FIRST]: EButtonTheme.SECONDARY,
    [EFooterPageType.SECOND]: EButtonTheme.SECONDARY_LIGHT,
};

export const Playground = ({ headerType, footerType, verticalMargin }: IPlaygroundArgs) => (
    <Page>
        <Page.Header type={headerType}>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Title text
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Description text
                    </Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button theme={headerTypeToControlButtonThemeMap[headerType]} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>

        <Page.Body type={EBodyPageType.SECOND} verticalMargin={verticalMargin}>
            <Text tag="div" size={ETextSize.B3}>
                Page content
            </Text>
        </Page.Body>

        <Page.Footer type={footerType}>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>
                    <Text size={ETextSize.B3}>Footer page text</Text>
                </Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button size={EComponentSize.MD} theme={footerTypeToControlButtonThemeMap[footerType]}>
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
