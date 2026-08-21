import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { EComponentSize, ETabsExtendedType, TabsExtended } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    IPlaygroundProps,
    Playground as PlaygroundRender,
    Sizes as SizesRender,
    SizesSource,
    Types as TypesRender,
    TypesSource,
    VisualTests as VisualTestsRender,
    WithDropdown as WithDropdownRender,
    WithDropdownSource,
    WithNotificationIcon as WithNotificationIconRender,
    WithNotificationIconSource,
} from "./examples";

const meta = {
    title: "Components/TabsExtended",
    component: TabsExtended,
    tags: ["autodocs"],
    // Фон страницы отличается от белого: type2 использует белый фон контейнера и на белом не читается.
    globals: {
        backgrounds: { value: "gray" },
    },
    argTypes: {
        // Playground хранит выбранный таб во внутреннем состоянии, поэтому управлять этими props
        // из Controls нечем. В таблице Props (ArgTypes of={TabsExtended}) они остаются.
        selectedId: { table: { disable: true } },
        onSelectTab: { table: { disable: true } },
    },
    parameters: {
        docs: {
            description: {
                component: `
Базовый компонент табов: сам он задаёт только контекст и корневой контейнер, а разметку табов собирает потребитель из субкомпонентов. Готовый компонент табов на его основе — **Tabs**.

## Использование

Состав задаётся субкомпонентами: **TabsExtended.Content** → **TabsExtended.Content.TabsWrapper** (табы) и **TabsExtended.Content.DropdownWrapper** (выпадающий список для не поместившихся табов). Каждый таб — **TabsExtended.Content.Tab** с render-prop; внутри обычно рендерится **TabsExtended.Content.TabButton**.

## Особенности

- Компонент неуправляемый только внутри себя: выбранный таб задаётся через **selectedId**, смену запрашивает **onSelectTab**. Повторный выбор уже выбранного таба обработчик не вызывает.
- **TabsWrapper** рендерит скрытую копию табов и по её замерам решает, какие табы не помещаются в строку. Их id приходят в render-prop **DropdownWrapper**, а сами табы скрываются из строки.
- Размер задаётся на **TabsExtended.Content** (отступы и скругление контейнера) и на **TabsExtended.Content.TabButton** (размер кнопки) — эти props независимы.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TabsExtended} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof TabsExtended>;

export default meta;

const PLAYGROUND_ARGS: IPlaygroundProps = {
    type: ETabsExtendedType.TYPE_1,
    size: EComponentSize.MD,
    tabsCount: 6,
    containerWidth: 420,
    showNotificationIcon: false,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    render: PlaygroundRender,
    argTypes: {
        type: {
            control: { type: "inline-radio" },
            options: Object.values(ETabsExtendedType),
            description:
                "Тип оформления, выбирается по фону страницы: TYPE_1 — серый фон контейнера (для белой страницы), TYPE_2 — белый фон контейнера (для затенённой страницы).",
            table: {
                category: "Props",
                type: { summary: "ETabsExtendedType" },
                defaultValue: { summary: "ETabsExtendedType.TYPE_1" },
            },
        },
        size: {
            control: { type: "inline-radio" },
            options: Object.values(EComponentSize),
            description: "Размер TabsExtended.Content и кнопок таба.",
            table: {
                category: "Settings",
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        tabsCount: {
            control: { type: "range", min: 1, max: 6, step: 1 },
            description: "Количество табов.",
            table: { category: "Settings" },
        },
        containerWidth: {
            control: { type: "range", min: 240, max: 900, step: 20 },
            description: "Ширина контейнера: чем она меньше, тем больше табов уезжает в Dropdown.",
            table: { category: "Settings" },
        },
        showNotificationIcon: {
            control: "boolean",
            description: "Значок новых уведомлений на втором табе.",
            table: { category: "Settings" },
        },
    },
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: StoryObj<typeof TabsExtended> = {
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

export const Types: StoryObj<typeof TabsExtended> = {
    render: TypesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: TypesSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof TabsExtended> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const WithNotificationIcon: StoryObj<typeof TabsExtended> = {
    render: WithNotificationIconRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithNotificationIconSource,
                language: "tsx",
            },
        },
    },
};

export const WithDropdown: StoryObj<typeof TabsExtended> = {
    render: WithDropdownRender,
    parameters: {
        // Раскрытый Dropdown снимается в VisualTests, отдельный baseline здесь дублировал бы покрытие.
        testRunner: { skip: true },
        controls: { disable: true },
        docs: {
            source: {
                code: WithDropdownSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof TabsExtended> = {
    tags: ["!autodocs"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: async ({ canvas, userEvent }) => {
        const tabs = await canvas.findAllByRole("tab");

        // Клик задаёт точку отсчёта, переход по Tab включает :focus-visible на следующем табе.
        await userEvent.click(tabs[0]);
        await userEvent.tab();
    },
};
