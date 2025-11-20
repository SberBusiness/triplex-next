import React from "react";
import { StoryObj } from "@storybook/react";
import { Page, EHeaderPageType, EFooterPageType } from "../../src/components/Page";
import { Button, EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Text, Title } from "../../src/components/Typography";
import { EFontType, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { Gap } from "../../src/components/Gap";

export default {
    title: "Components/Page",
    component: Page,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент Page — каркас страницы. Принимает только компоненты \`Page.Header\`, \`Page.Body\` и \`Page.Footer\`.

## Особенности

- **Типы**: headerPage и footerPage могут быть двух типов: \`first\` (без стилей) и \`second\` (с фоном и возможностью фиксирования)

## Возможности

- **Структура**: фиксированные области Header/Body/Footer
- **Гибкость**: произвольный контент внутри каждой области
- **Совместимость**: использует те же подкомпоненты, что и \`Header\` и \`Footer\`
                `,
            },
        },
    },
} as const;

interface IWithTypeControlsArgs {
    headerType: EHeaderPageType;
    footerType: EFooterPageType;
}

export const Playground: StoryObj<IWithTypeControlsArgs> = {
    args: {
        headerType: EHeaderPageType.FIRST,
        footerType: EFooterPageType.FIRST,
    },
    argTypes: {
        headerType: {
            control: { type: "select" },
            options: [EHeaderPageType.FIRST, EHeaderPageType.SECOND],
            description: "Тип заголовка страницы",
            table: {
                type: { summary: "EHeaderPageType" },
                defaultValue: { summary: "first" },
            },
        },
        footerType: {
            control: { type: "select" },
            options: [EFooterPageType.FIRST, EFooterPageType.SECOND],
            description: "Тип футера страницы",
            table: {
                type: { summary: "EFooterPageType" },
                defaultValue: { summary: "first" },
            },
        },
    },
    render: (args: IWithTypeControlsArgs) => (
        <div className="page-example" style={{ maxHeight: "400px", overflow: "auto" }}>
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
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                Button text
                            </Button>
                        </Page.Header.Title.Controls>
                    </Page.Header.Title>
                </Page.Header>

                <Page.Body>
                    <div style={{ height: 800 }} />
                </Page.Body>

                <Page.Footer type={args.footerType}>
                    <Page.Footer.Description>
                        <Page.Footer.Description.Content>
                            <Text size={ETextSize.B3}>Footer page text</Text>
                        </Page.Footer.Description.Content>
                        <Page.Footer.Description.Controls>
                            <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY} style={{ marginRight: 8 }}>
                                Button text
                            </Button>
                            <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                                Button text
                            </Button>
                        </Page.Footer.Description.Controls>
                    </Page.Footer.Description>
                </Page.Footer>
            </Page>
        </div>
    ),
};

export const Default: StoryObj<typeof Page> = {
    render: () => (
        <div className="page-example">
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

                <Page.Body>
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
                            <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY} style={{ marginRight: 8 }}>
                                Button text
                            </Button>
                            <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                                Button text
                            </Button>
                        </Page.Footer.Description.Controls>
                    </Page.Footer.Description>
                </Page.Footer>
            </Page>
        </div>
    ),
    parameters: {
        docs: {
            description: { story: "Базовая страница с заголовком, контентом и футером." },
        },
    },
};
