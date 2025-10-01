import React from "react";
import { StoryObj } from "@storybook/react";
import { Page, EHeaderPageType } from "../../src/components/Page";
import { Button, EButtonSize, EButtonTheme } from "../../src/components/Button";
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
    sticky: boolean;
}

export const Playground: StoryObj<IWithTypeControlsArgs> = {
    args: {
        headerType: EHeaderPageType.FIRST,
        sticky: false,
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
        sticky: {
            control: { type: "boolean" },
            description: "Фиксирование заголовка при скролле страницы",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
            if: { arg: "headerType", eq: EHeaderPageType.SECOND },
        },
    },
    render: (args: IWithTypeControlsArgs) => (
        <div className="page-example" style={{ height: 400, overflow: "auto", border: "1px solid #eee" }}>
            <Page>
                <Page.Header
                    type={args.headerType}
                    {...(args.headerType === EHeaderPageType.SECOND && { sticky: args.sticky })}
                >
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
                            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                                Button text
                            </Button>
                        </Page.Header.Title.Controls>
                    </Page.Header.Title>
                </Page.Header>

                <Page.Body>
                    <div style={{ height: 800 }} />
                </Page.Body>

                <Page.Footer>
                    <Page.Footer.Description>
                        <Page.Footer.Description.Content>
                            <Text size={ETextSize.B3}>Footer page text</Text>
                        </Page.Footer.Description.Content>
                        <Page.Footer.Description.Controls>
                            <Button size={EButtonSize.MD} theme={EButtonTheme.SECONDARY} style={{ marginRight: 8 }}>
                                Button text
                            </Button>
                            <Button size={EButtonSize.MD} theme={EButtonTheme.GENERAL}>
                                Button text
                            </Button>
                        </Page.Footer.Description.Controls>
                    </Page.Footer.Description>
                </Page.Footer>
            </Page>
        </div>
    ),
};

export const Basic: StoryObj<typeof Page> = {
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
                            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
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

                <Page.Footer>
                    <Page.Footer.Description>
                        <Page.Footer.Description.Content>
                            <Text size={ETextSize.B3}>Footer page text</Text>
                        </Page.Footer.Description.Content>
                        <Page.Footer.Description.Controls>
                            <Button size={EButtonSize.MD} theme={EButtonTheme.SECONDARY} style={{ marginRight: 8 }}>
                                Button text
                            </Button>
                            <Button size={EButtonSize.MD} theme={EButtonTheme.GENERAL}>
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

export const StickyHeaderAndFooter: StoryObj<typeof Page> = {
    render: () => (
        <div style={{ height: 400, overflow: "auto", border: "1px solid #eee" }}>
            <Page>
                <Page.Header type={EHeaderPageType.SECOND} sticky>
                    <Page.Header.Title>
                        <Page.Header.Title.Content>
                            <Title tag="h1" size={ETitleSize.H1}>
                                Sticky Page header
                            </Title>
                            <Gap size={8} />
                            <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                                Header прилипает при скролле контейнера
                            </Text>
                        </Page.Header.Title.Content>
                        <Page.Header.Title.Controls>
                            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                                Button text
                            </Button>
                        </Page.Header.Title.Controls>
                    </Page.Header.Title>
                </Page.Header>

                <Page.Body>
                    <div style={{ height: 800 }} />
                </Page.Body>

                <Page.Footer sticky>
                    <Page.Footer.Description>
                        <Page.Footer.Description.Content>
                            <Text size={ETextSize.B3}>Footer прилипает при скролле контейнера</Text>
                        </Page.Footer.Description.Content>
                        <Page.Footer.Description.Controls>
                            <Button size={EButtonSize.MD} theme={EButtonTheme.SECONDARY} style={{ marginRight: 8 }}>
                                Button text
                            </Button>
                            <Button size={EButtonSize.MD} theme={EButtonTheme.GENERAL}>
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
            description: { story: "Sticky Header и Footer внутри скролл-контейнера страницы." },
        },
    },
};
