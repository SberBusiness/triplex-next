import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { EComponentSize, TabsLine } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    IPlaygroundProps,
    Paddings as PaddingsRender,
    PaddingsSource,
    Playground as PlaygroundRender,
    Sizes as SizesRender,
    SizesSource,
    VisualTests as VisualTestsRender,
    WithDropdown as WithDropdownRender,
    WithDropdownSource,
    WithNotificationIcon as WithNotificationIconRender,
    WithNotificationIconSource,
    WithSeparator as WithSeparatorRender,
    WithSeparatorSource,
} from "./examples";

const meta = {
    title: "Components/TabsLine",
    component: TabsLine,
    tags: ["autodocs"],
    argTypes: {
        // Playground хранит выбранный таб во внутреннем состоянии, поэтому управлять этими props
        // из Controls нечем. В таблице Props (ArgTypes of={TabsLine}) они остаются.
        tabs: { table: { disable: true } },
        selectedId: { table: { disable: true } },
        onChangeTab: { table: { disable: true } },
    },
    parameters: {
        docs: {
            description: {
                component: `
Линейка табов-подчёркиваний для переключения разделов внутри страницы.

## Особенности

- Компонент управляемый: выбранный таб задаётся через **selectedId**, смену запрашивает **onChangeTab**.
- Состав табов задаётся массивом **tabs**, а не дочерними элементами: каждый таб — объект с **id**, **label** и, при необходимости, **showNotificationIcon**.
- На десктопе **maxVisible** ограничивает число элементов строки вместе с кнопкой дропдауна: не поместившиеся табы уезжают в выпадающий список.
- На мобильной ширине (<768px) дропдаун не строится — все табы остаются в строке с горизонтальной прокруткой.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TabsLine} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof TabsLine>;

export default meta;

const PLAYGROUND_ARGS: IPlaygroundProps = {
    paddingX: 0,
    maxVisible: 3,
    size: EComponentSize.MD,
    showNotificationIcon: true,
    withSeparator: false,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    render: PlaygroundRender,
    argTypes: {
        paddingX: {
            control: { type: "select" },
            options: [0, 8, 16, 24],
            description: "Горизонтальный отступ от первого таба слева и последнего таба справа.",
            table: {
                category: "Props",
                type: { summary: "0 | 8 | 16 | 24" },
            },
        },
        size: {
            control: { type: "inline-radio" },
            options: Object.values(EComponentSize),
            description: "Размер компонента.",
            table: {
                category: "Props",
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        withSeparator: {
            control: "boolean",
            description: "Разделитель в виде нижнего бордера.",
            table: {
                category: "Props",
                defaultValue: { summary: "false" },
            },
        },
        maxVisible: {
            control: { type: "range", min: 1, max: 5, step: 1 },
            description: "Максимальное число элементов строки, включая кнопку дропдауна.",
            table: { category: "Props" },
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

export const Default: StoryObj<typeof TabsLine> = {
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

export const Sizes: StoryObj<typeof TabsLine> = {
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

export const Paddings: StoryObj<typeof TabsLine> = {
    render: PaddingsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: PaddingsSource,
                language: "tsx",
            },
        },
    },
};

export const WithSeparator: StoryObj<typeof TabsLine> = {
    render: WithSeparatorRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithSeparatorSource,
                language: "tsx",
            },
        },
    },
};

export const WithNotificationIcon: StoryObj<typeof TabsLine> = {
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

export const WithDropdown: StoryObj<typeof TabsLine> = {
    render: WithDropdownRender,
    parameters: {
        controls: { disable: true },
        // Скриншоты не снимаем: закрытая кнопка дропдауна уже покрыта в Sizes (все три размера),
        // раскрытый список — в Visual tests. Отдельный baseline ничего не добавляет.
        testRunner: { skip: true },
        docs: {
            source: {
                code: WithDropdownSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof TabsLine> = {
    tags: ["!autodocs"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: async ({ userEvent }) => {
        // Первый Tab ведёт на первый таб строки, второй — на кнопку дропдауна:
        // остальные табы строки выключены из порядка обхода (roving tabIndex).
        await userEvent.tab();
        await userEvent.tab();
        // ArrowDown раскрывает список с клавиатуры, поэтому на кнопке остаётся :focus-visible.
        await userEvent.keyboard("{ArrowDown}");
    },
};
