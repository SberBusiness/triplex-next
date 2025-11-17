import React from "react";
import { StoryObj } from "@storybook/react";
import { Header } from "../../src/components/Header";
import { Text, Title } from "../../src/components/Typography";
import { Button, EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { EFontType, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { Gap } from "../../src/components/Gap";
import { Link } from "../../src/components/Link";

export default {
    title: "Components/Header",
    component: Header,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент Header — верхний блок страницы/контейнера с заголовком, табами и произвольным подзаголовком.

## Возможности

- **Прилипающий хедер**: опционально фиксируется у верхней границы экрана (\`sticky\`)
- **Композиция уровней**: \`Header.Title\` (\`Content\`, \`Controls\`), \`Header.Tabs\` (\`Content\`, \`Controls\`), \`Header.Subhead\`
- **Гибкость**: можно передавать любой произвольный контент
                `,
            },
        },
    },
} as const;

export const Basic: StoryObj<typeof Header> = {
    render: () => (
        <Header>
            <Header.Title>
                <Header.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Title text
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Optional description about the page
                    </Text>
                </Header.Title.Content>
                <Header.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </Header.Title.Controls>
            </Header.Title>
        </Header>
    ),
    parameters: {
        docs: {
            description: { story: "Базовый Header с заголовком и кнопкой действия." },
        },
    },
};

export const WithLinkInTitle: StoryObj<typeof Header> = {
    render: () => (
        <Header>
            <Header.Title>
                <Header.Title.Content>
                    <Text size={ETextSize.B2}>
                        <Link href="#">Link text</Link>
                    </Text>
                    <Gap size={4} />
                    <Title tag="h1" size={ETitleSize.H1}>
                        Title text
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Optional description about the page
                    </Text>
                </Header.Title.Content>
                <Header.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </Header.Title.Controls>
            </Header.Title>
        </Header>
    ),
    parameters: {
        docs: {
            description: { story: "Базовый Header с заголовком и кнопкой действия." },
        },
    },
};

export const WithTabsAndControls: StoryObj<typeof Header> = {
    render: () => (
        <Header>
            <Header.Title>
                <Header.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Title with tabs
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Optional description about the page
                    </Text>
                </Header.Title.Content>
            </Header.Title>

            <Header.Tabs>
                <Header.Tabs.Content>
                    <Text tag="div" size={ETextSize.B3}>
                        Tabs content
                    </Text>
                </Header.Tabs.Content>
                <Header.Tabs.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </Header.Tabs.Controls>
            </Header.Tabs>
        </Header>
    ),
    parameters: {
        docs: {
            description: { story: "Заголовок с табами и дополнительными контролами." },
        },
    },
};

export const WithSubheader: StoryObj<typeof Header> = {
    render: () => (
        <Header>
            <Header.Title>
                <Header.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Title with tabs
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Optional description about the page
                    </Text>
                </Header.Title.Content>
                <Header.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </Header.Title.Controls>
            </Header.Title>
            <Header.Subhead withoutPaddings>
                <Text tag="div" size={ETextSize.B3}>
                    Subheader text
                </Text>
            </Header.Subhead>
        </Header>
    ),
    parameters: {
        docs: {
            description: { story: "Header с подзаголовком и произвольным контентом." },
        },
    },
};

export const LayoutWithSidebar: StoryObj<typeof Header> = {
    render: () => (
        <Header>
            <Header.LayoutSidebar>
                <Header.LayoutSidebar.Content>
                    <Header.Title>
                        <Header.Title.Content>
                            <Title tag="h1" size={ETitleSize.H1}>
                                Title text
                            </Title>
                            <Gap size={8} />
                            <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                                Optional description about the page
                            </Text>
                        </Header.Title.Content>
                    </Header.Title>
                </Header.LayoutSidebar.Content>
                <Header.LayoutSidebar.Sidebar>
                    <div style={{ width: 200 }}>
                        <Text tag="div" size={ETextSize.B3}>
                            Sidebar
                        </Text>
                    </div>
                </Header.LayoutSidebar.Sidebar>
            </Header.LayoutSidebar>
        </Header>
    ),
    parameters: {
        docs: {
            description: { story: "Пример layout с сайдбаром для Header." },
        },
    },
};
