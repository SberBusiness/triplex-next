import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { Header } from "../../src/components/Header";
import { Text, Title } from "../../src/components/Typography";
import { Button, EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { EFontType, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { Gap } from "../../src/components/Gap";
import { Link } from "../../src/components/Link";
import { HeaderPage } from "../../src/components/Page/components/HeaderPage";
import { EHeaderPageType } from "../../src/components/Page/components/enums";
import { DocumentNumberEdit } from "../../src/components/DocumentNumberEdit/DocumentNumberEdit";

export default {
    title: "Components/HeaderPage",
    component: Header,
    tags: ["autodocs"],
    globals: {
        backgrounds: { value: "gray" },
    },
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
        <HeaderPage type={EHeaderPageType.FIRST}>
            <HeaderPage.Title>
                <HeaderPage.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Title text
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Optional description about the page
                    </Text>
                </HeaderPage.Title.Content>
                <HeaderPage.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </HeaderPage.Title.Controls>
            </HeaderPage.Title>
        </HeaderPage>
    ),
    parameters: {
        docs: {
            description: { story: "Базовый Header с заголовком и кнопкой действия." },
        },
    },
};

export const TypeSecond: StoryObj<typeof Header> = {
    render: () => (
        <HeaderPage type={EHeaderPageType.SECOND}>
            <HeaderPage.Title>
                <HeaderPage.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Title text
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Optional description about the page
                    </Text>
                </HeaderPage.Title.Content>
                <HeaderPage.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </HeaderPage.Title.Controls>
            </HeaderPage.Title>
        </HeaderPage>
    ),
    parameters: {
        docs: {
            description: { story: "HeaderPage типа second. Не включает белый фон." },
        },
    },
};

export const WithLinkInTitle: StoryObj<typeof Header> = {
    render: () => (
        <HeaderPage type={EHeaderPageType.FIRST}>
            <HeaderPage.Title>
                <HeaderPage.Title.Content>
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
                </HeaderPage.Title.Content>
                <HeaderPage.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </HeaderPage.Title.Controls>
            </HeaderPage.Title>
        </HeaderPage>
    ),
    parameters: {
        docs: {
            description: { story: "Базовый Header с заголовком и кнопкой действия." },
        },
    },
};

export const DocumentNumberEditExample: StoryObj<typeof Header> = {
    render: () => {
        const [value, setValue] = useState("");

        const handleChange = (event) => setValue(event.target.value);
        return (
            <HeaderPage type={EHeaderPageType.FIRST}>
                <HeaderPage.Title>
                    <HeaderPage.Title.Content>
                        <Title tag="h1" size={ETitleSize.H1}>
                            Title text
                        </Title>
                        <Gap size={8} />
                        <DocumentNumberEdit
                            value={value}
                            buttonLabel="Изменить"
                            emptyNumberButtonLabel="Задать номер"
                            emptyNumberLabel="Номер документа будет присвоен автоматически"
                            numberLabel="Документ №"
                            onChange={handleChange}
                        />
                    </HeaderPage.Title.Content>
                    <HeaderPage.Title.Controls>
                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                            Button text
                        </Button>
                    </HeaderPage.Title.Controls>
                </HeaderPage.Title>
            </HeaderPage>
        );
    },
    parameters: {
        docs: {
            description: { story: "Базовый Header с полем для редактирования номера документа." },
        },
    },
};

export const WithTabsAndControls: StoryObj<typeof Header> = {
    render: () => (
        <HeaderPage type={EHeaderPageType.FIRST}>
            <HeaderPage.Title>
                <HeaderPage.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Title with tabs
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Optional description about the page
                    </Text>
                </HeaderPage.Title.Content>
            </HeaderPage.Title>

            <HeaderPage.Tabs>
                <HeaderPage.Tabs.Content>
                    <Text tag="div" size={ETextSize.B3}>
                        Tabs content
                    </Text>
                </HeaderPage.Tabs.Content>
                <HeaderPage.Tabs.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </HeaderPage.Tabs.Controls>
            </HeaderPage.Tabs>
        </HeaderPage>
    ),
    parameters: {
        docs: {
            description: { story: "Заголовок с табами и дополнительными контролами." },
        },
    },
};

export const WithSubheader: StoryObj<typeof Header> = {
    render: () => (
        <HeaderPage type={EHeaderPageType.FIRST}>
            <HeaderPage.Title>
                <HeaderPage.Title.Content>
                    <Title tag="h1" size={ETitleSize.H1}>
                        Title with tabs
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Optional description about the page
                    </Text>
                </HeaderPage.Title.Content>
                <HeaderPage.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </HeaderPage.Title.Controls>
            </HeaderPage.Title>
            <HeaderPage.Subhead withoutPaddings>
                <Text tag="div" size={ETextSize.B3}>
                    Subheader text
                </Text>
            </HeaderPage.Subhead>
        </HeaderPage>
    ),
    parameters: {
        docs: {
            description: { story: "Header с подзаголовком и произвольным контентом." },
        },
    },
};

export const LayoutWithSidebar: StoryObj<typeof Header> = {
    render: () => (
        <HeaderPage type={EHeaderPageType.FIRST}>
            <HeaderPage.LayoutSidebar>
                <HeaderPage.LayoutSidebar.Content>
                    <HeaderPage.Title>
                        <HeaderPage.Title.Content>
                            <Title tag="h1" size={ETitleSize.H1}>
                                Title text
                            </Title>
                            <Gap size={8} />
                            <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                                Optional description about the page
                            </Text>
                        </HeaderPage.Title.Content>
                    </HeaderPage.Title>
                </HeaderPage.LayoutSidebar.Content>
                <HeaderPage.LayoutSidebar.Sidebar>
                    <div style={{ width: 200 }}>
                        <Text tag="div" size={ETextSize.B3}>
                            Sidebar
                        </Text>
                    </div>
                </HeaderPage.LayoutSidebar.Sidebar>
            </HeaderPage.LayoutSidebar>
        </HeaderPage>
    ),
    parameters: {
        docs: {
            description: { story: "Пример layout с сайдбаром для Header." },
        },
    },
};
