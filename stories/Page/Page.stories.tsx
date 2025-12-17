import React from "react";
import { Controls, Description, Stories, Subtitle, Title as SBTitle } from "@storybook/addon-docs/blocks";
import { StoryObj } from "@storybook/react";
import { Page, EHeaderPageType, EFooterPageType } from "../../src/components/Page";
import { Button, EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Text, Title } from "../../src/components/Typography";
import { EFontType, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { Gap } from "../../src/components/Gap";
import { EBodyPageType, EBodyPageVerticalMargin } from "../../src/components/Page/components/enums";

export default {
    title: "Components/Page",
    component: Page,
    tags: ["autodocs"],
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        docs: {
            description: {
                component: `
Компонент Page — каркас страницы. Принимает только компоненты \`Page.Header\`, \`Page.Body\` и \`Page.Footer\`.

## Особенности

- **Типы**: Page.Header, Page.Body и Page.Footer могут быть двух типов: \`first\` (на основе острова) и \`second\` (без фона)
                `,
            },
            page: () => (
                <>
                    <SBTitle />
                    <Subtitle />
                    <Description />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} as const;

interface IWithTypeControlsArgs {
    headerType: EHeaderPageType;
    footerType: EFooterPageType;
    verticalMargin: EBodyPageVerticalMargin;
}

const headerTypeToControlButtonThemeMap = {
    [EHeaderPageType.FIRST]: EButtonTheme.SECONDARY,
    [EHeaderPageType.SECOND]: EButtonTheme.SECONDARY_LIGHT,
};

const footerTypeToControlButtonThemeMap = {
    [EFooterPageType.FIRST]: EButtonTheme.SECONDARY,
    [EFooterPageType.SECOND]: EButtonTheme.SECONDARY_LIGHT,
};

export const Playground: StoryObj<IWithTypeControlsArgs> = {
    args: {
        headerType: EHeaderPageType.FIRST,
        footerType: EFooterPageType.FIRST,
        verticalMargin: EBodyPageVerticalMargin.LARGE,
    },
    argTypes: {
        headerType: {
            control: { type: "select" },
            options: Object.values(EHeaderPageType),
            description: "Тип заголовка страницы",
            table: {
                type: { summary: "EHeaderPageType" },
                defaultValue: { summary: "first" },
            },
        },
        footerType: {
            control: { type: "select" },
            options: Object.values(EFooterPageType),
            description: "Тип футера страницы",
            table: {
                type: { summary: "EFooterPageType" },
                defaultValue: { summary: "first" },
            },
        },
        verticalMargin: {
            control: { type: "select" },
            options: Object.values(EBodyPageVerticalMargin),
            description: "Вертикальные отступы у компонента Body",
            table: {
                type: { summary: "EBodyPageVerticalMargin" },
                defaultValue: { summary: EBodyPageVerticalMargin.LARGE },
            },
        },
    },
    parameters: {
        controls: {
            include: ["headerType", "footerType", "verticalMargin"],
        },
    },
    render: (args: IWithTypeControlsArgs) => (
        <Page>
            <Page.Header type={args.headerType}>
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
                        <Button theme={headerTypeToControlButtonThemeMap[args.headerType]} size={EComponentSize.MD}>
                            Button text
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                            Button text
                        </Button>
                    </Page.Header.Title.Controls>
                </Page.Header.Title>
            </Page.Header>

            <Page.Body type={EBodyPageType.SECOND} verticalMargin={args.verticalMargin}>
                <Text tag="div" size={ETextSize.B3}>
                    Page content
                </Text>
            </Page.Body>

            <Page.Footer type={args.footerType}>
                <Page.Footer.Description>
                    <Page.Footer.Description.Content>
                        <Text size={ETextSize.B3}>Footer page text</Text>
                    </Page.Footer.Description.Content>
                    <Page.Footer.Description.Controls>
                        <Button size={EComponentSize.MD} theme={footerTypeToControlButtonThemeMap[args.footerType]}>
                            Button text
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Button text
                        </Button>
                    </Page.Footer.Description.Controls>
                </Page.Footer.Description>
            </Page.Footer>
        </Page>
    ),
};

export const Default: StoryObj<typeof Page> = {
    render: () => (
        <Page>
            <Page.Header type={EHeaderPageType.FIRST}>
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
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
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

            <Page.Footer type={EFooterPageType.FIRST}>
                <Page.Footer.Description>
                    <Page.Footer.Description.Content>
                        <Text size={ETextSize.B3}>Footer page text</Text>
                    </Page.Footer.Description.Content>
                    <Page.Footer.Description.Controls>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                            Button text
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Button text
                        </Button>
                    </Page.Footer.Description.Controls>
                </Page.Footer.Description>
            </Page.Footer>
        </Page>
    ),
    parameters: {
        docs: {
            description: {
                story: "Базовая страница с заголовком, контентом и футером. Это дефолтная Page для использования в LightBox. Если контента мало, рекомендуется использовать Page.Body типа FIRST, чтобы не было пустого пространства.",
            },
        },
        controls: { disable: true },
    },
};

export const WithoutIslands: StoryObj<typeof Page> = {
    render: () => (
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
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
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
                        <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                            Button text
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Button text
                        </Button>
                    </Page.Footer.Description.Controls>
                </Page.Footer.Description>
            </Page.Footer>
        </Page>
    ),
    parameters: {
        docs: {
            description: {
                story: "Страница, где header, body и footer не являются островами. Используется в layout, а не в LightBox.",
            },
        },
        controls: { disable: true },
    },
};

export const Withlands: StoryObj<typeof Page> = {
    render: () => (
        <Page>
            <Page.Header type={EHeaderPageType.FIRST}>
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
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                            Button text
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                            Button text
                        </Button>
                    </Page.Header.Title.Controls>
                </Page.Header.Title>
            </Page.Header>

            <Page.Body type={EBodyPageType.FIRST}>
                <Text tag="div" size={ETextSize.B3}>
                    Page content
                </Text>
            </Page.Body>

            <Page.Footer type={EFooterPageType.FIRST}>
                <Page.Footer.Description>
                    <Page.Footer.Description.Content>
                        <Text size={ETextSize.B3}>Footer page text</Text>
                    </Page.Footer.Description.Content>
                    <Page.Footer.Description.Controls>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                            Button text
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Button text
                        </Button>
                    </Page.Footer.Description.Controls>
                </Page.Footer.Description>
            </Page.Footer>
        </Page>
    ),
    parameters: {
        docs: {
            description: {
                story: "Страница, где header, body и footer являются островами. Используется в LightBox.",
            },
        },
        controls: { disable: true },
    },
};
