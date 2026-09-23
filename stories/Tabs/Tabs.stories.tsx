import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { EComponentSize, ETabsExtendedType, Tabs } from "@sberbusiness/triplex-next";
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
    VisualTestsOpen as VisualTestsOpenRender,
    WithDropdown as WithDropdownRender,
    WithDropdownSource,
    WithNotificationIcon as WithNotificationIconRender,
    WithNotificationIconSource,
} from "./examples";

const meta = {
    title: "Components/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    // Фон страницы отличается от белого: type2 использует белый фон контейнера и на белом не читается.
    globals: {
        backgrounds: { value: "gray" },
    },
    argTypes: {
        // Playground хранит выбранный таб и состав табов во внутреннем состоянии, поэтому управлять этими
        // props из Controls нечем. В таблице Props (ArgTypes of={Tabs}) они остаются.
        selectedId: { table: { disable: true } },
        onSelectTab: { table: { disable: true } },
        tabs: { table: { disable: true } },
    },
    parameters: {
        docs: {
            description: {
                component: `
Готовые табы-переключатели: принимают массив табов и сами собирают разметку. Табы, которые не помещаются в строку, уезжают в выпадающий список — его компонент рендерит сам. Для табов с нестандартным содержимым есть базовый **TabsExtended**.

## Использование

Состав задаётся массивом **tabs** (\`id\` + \`label\`), выбранный таб — **selectedId**, смену запрашивает **onSelectTab**. Компонент управляемый: собственного состояния выбора у него нет.

## Особенности

- Ширина строки считается по факту: не поместившиеся табы скрываются и попадают в выпадающий список. Если выбранный таб уехал туда, кнопка списка подсвечивается как выбранная.
- Навигация стрелками: в таб-порядок страницы попадает только один таб, между табами строки фокус переносится клавишами ArrowLeft / ArrowRight.
- Кнопке выпадающего списка нужен доступный текст — задайте его через **buttonDropdownAttributes** (\`aria-label\`): библиотека мультиязычная и своих текстов не хардкодит.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Tabs} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Tabs>;

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
            description: "Размер контейнера, кнопок табов и кнопки выпадающего списка.",
            table: {
                category: "Props",
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
            description: "Ширина контейнера: чем она меньше, тем больше табов уезжает в выпадающий список.",
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

export const Default: StoryObj<typeof Tabs> = {
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

export const Types: StoryObj<typeof Tabs> = {
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

export const Sizes: StoryObj<typeof Tabs> = {
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

export const WithNotificationIcon: StoryObj<typeof Tabs> = {
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

export const WithDropdown: StoryObj<typeof Tabs> = {
    render: WithDropdownRender,
    parameters: {
        // То же состояние снимается в VisualTests, отдельный baseline здесь дублировал бы покрытие.
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

export const VisualTests: StoryObj<typeof Tabs> = {
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

export const VisualTestsOpen: StoryObj<typeof Tabs> = {
    tags: ["!autodocs"],
    render: VisualTestsOpenRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: async ({ canvas, userEvent }) => {
        await userEvent.click(await canvas.findByRole("button", { name: "Ещё табы" }));
    },
};
