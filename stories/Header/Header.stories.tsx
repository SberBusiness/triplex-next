import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import {
    Header,
    Button,
    EButtonTheme,
    EComponentSize,
    Title as TypographyTitle,
    ETitleSize,
    Text,
    ETextSize,
    EFontType,
    Gap,
} from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    WithTabs as WithTabsRender,
    WithTabsSource,
    WithSubhead as WithSubheadRender,
    WithSubheadSource,
    WithoutPaddings as WithoutPaddingsRender,
    WithoutPaddingsSource,
    WithLayoutSidebar as WithLayoutSidebarRender,
    WithLayoutSidebarSource,
    Example as ExampleRender,
    ExampleSource,
} from "./examples";

const meta = {
    title: "Components/Header",
    component: Header,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Header — контейнер верхнего блока. Собственных props нет: принимает `children` и стандартные " +
                    "HTML-атрибуты div, собственной визуальной оболочки не имеет (фон, рамку и отступы задаёт " +
                    "контейнер-родитель). Наполнение строится уровнями: `Header.Title` (заголовок и кнопки действий " +
                    "через `Header.Title.Content` и `Header.Title.Controls`), `Header.Tabs` (табы и кнопки действий " +
                    "через `Header.Tabs.Content` и `Header.Tabs.Controls`) и `Header.Subhead` (произвольный контент, " +
                    "вертикальные отступы снимаются свойством `withoutPaddings`). `Header.LayoutSidebar` добавляет " +
                    "боковую колонку через `Header.LayoutSidebar.Content` и `Header.LayoutSidebar.Sidebar`. " +
                    "На ширине экрана до 767px кнопки переносятся под контент, а sidebar скрывается.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;

export const Default: StoryObj<typeof Header> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithTabs: StoryObj<typeof Header> = {
    render: WithTabsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithTabsSource,
                language: "tsx",
            },
        },
    },
};

export const WithSubhead: StoryObj<typeof Header> = {
    render: WithSubheadRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithSubheadSource,
                language: "tsx",
            },
        },
    },
};

export const WithoutPaddings: StoryObj<typeof Header> = {
    render: WithoutPaddingsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithoutPaddingsSource,
                language: "tsx",
            },
        },
    },
};

export const WithLayoutSidebar: StoryObj<typeof Header> = {
    render: WithLayoutSidebarRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithLayoutSidebarSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof Header> = {
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof Header> = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Заголовок без кнопок действий. */}
            <Header>
                <Header.Title>
                    <Header.Title.Content>
                        <TypographyTitle tag="h2" size={ETitleSize.H2}>
                            Только заголовок
                        </TypographyTitle>
                    </Header.Title.Content>
                </Header.Title>
            </Header>

            {/* Длинный заголовок и несколько кнопок — проверка переноса и сжатия. */}
            <Header>
                <Header.Title>
                    <Header.Title.Content>
                        <TypographyTitle tag="h2" size={ETitleSize.H2}>
                            Очень длинный заголовок документа, который не помещается в одну строку рядом с кнопками
                            действий
                        </TypographyTitle>
                        <Gap size={8} />
                        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                            40702810300000012345 · Рубли РФ · Ожидает подписи
                        </Text>
                    </Header.Title.Content>
                    <Header.Title.Controls>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                            Отклонить
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                            Сохранить черновик
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Подписать
                        </Button>
                    </Header.Title.Controls>
                </Header.Title>
            </Header>

            {/* Subhead без соседних уровней. */}
            <Header>
                <Header.Subhead style={{ outline: "1px dashed currentColor" }}>
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Subhead с отступами по умолчанию
                    </Text>
                </Header.Subhead>
                <Header.Subhead withoutPaddings style={{ outline: "1px dashed currentColor" }}>
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Subhead без отступов
                    </Text>
                </Header.Subhead>
            </Header>

            {/* Sidebar с длинным контентом слева. */}
            <Header>
                <Header.LayoutSidebar>
                    <Header.LayoutSidebar.Content>
                        <Header.Title>
                            <Header.Title.Content>
                                <TypographyTitle tag="h2" size={ETitleSize.H2}>
                                    Заголовок рядом с боковой колонкой
                                </TypographyTitle>
                            </Header.Title.Content>
                        </Header.Title>
                    </Header.LayoutSidebar.Content>
                    <Header.LayoutSidebar.Sidebar style={{ paddingLeft: "24px" }}>
                        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                            Остаток
                        </Text>
                        <Gap size={4} />
                        <TypographyTitle tag="div" size={ETitleSize.H3}>
                            1 250 300,45 ₽
                        </TypographyTitle>
                    </Header.LayoutSidebar.Sidebar>
                </Header.LayoutSidebar>
            </Header>
        </div>
    ),
};
