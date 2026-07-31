import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import {
    Dropdown,
    EComponentSize,
    EDropdownAlignment,
    EDropdownDirection,
    EDropdownWidth,
} from "@sberbusiness/triplex-next";
import {
    Alignments as AlignmentsRender,
    AlignmentsSource,
    Default as DefaultRender,
    DefaultSource,
    Directions as DirectionsRender,
    DirectionsSource,
    IPlaygroundProps,
    Loading as LoadingRender,
    LoadingSource,
    MobileView as MobileViewRender,
    MobileViewSource,
    Playground as PlaygroundRender,
    Sizes as SizesRender,
    SizesSource,
    VisualTests as VisualTestsRender,
    Widths as WidthsRender,
    WidthsSource,
    WithSelectedOption as WithSelectedOptionRender,
    WithSelectedOptionSource,
} from "./examples";

const meta = {
    title: "Components/Dropdown",
    component: Dropdown,
    tags: ["autodocs"],
    // Обязательные props компонента. Все стори отрисовываются собственным render,
    // поэтому здесь заданы нейтральные заглушки.
    args: {
        opened: false,
        setOpened: () => {},
        targetRef: { current: null },
    },
    parameters: {
        docs: {
            description: {
                component: `
Выпадающее меню, которое рендерится через **Portal** в document.body и позиционируется относительно управляющего элемента (**targetRef**).

## Особенности

- Состоянием открытости управляет потребитель — через **opened** и **setOpened**.
- Положение пересчитывается при скролле, ресайзе окна и изменении размеров меню или управляющего элемента.
- Пока меню открыто, скролл страницы вне меню заблокирован.
- Содержимое произвольное. Для списка опций с навигацией с клавиатуры используется **DropdownList** и **DropdownList.Item**.
- При заданном **mobileViewProps** на мобильной ширине экрана вместо десктопного меню открывается полноэкранная мобильная версия.
- Закрытие по Escape, по Tab и по клику вне меню компонент не реализует — используйте **ButtonDropdownExtended** или собственные обработчики.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Dropdown} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Dropdown>;

export default meta;

type TPlay = NonNullable<StoryObj<typeof Dropdown>["play"]>;

/**
 * Раскрывает все меню на канвасе.
 * Документационные примеры стартуют закрытыми — иначе на странице autodocs все стори
 * рендерятся разом, и каждое открытое меню блокирует скролл страницы и перекрывает текст.
 */
const openAllDropdowns: TPlay = async ({ canvas, userEvent }) => {
    const triggers = await canvas.findAllByRole("button", { name: /Button text/ });

    for (const trigger of triggers) {
        await userEvent.click(trigger);
    }
};

const PLAYGROUND_ARGS: IPlaygroundProps = {
    size: EComponentSize.MD,
    direction: EDropdownDirection.AUTO,
    alignment: EDropdownAlignment.LEFT,
    width: EDropdownWidth.CONTENT,
    loading: false,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер дропдауна.",
            table: {
                category: "Props",
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        direction: {
            control: { type: "select" },
            options: Object.values(EDropdownDirection),
            description: "Направление выпадающего меню.",
            table: {
                category: "Props",
                type: { summary: "EDropdownDirection" },
                defaultValue: { summary: "EDropdownDirection.AUTO" },
            },
        },
        alignment: {
            control: { type: "select" },
            options: Object.values(EDropdownAlignment),
            description: "Выравнивание списка относительно управляющего элемента.",
            table: {
                category: "Props",
                type: { summary: "EDropdownAlignment" },
                defaultValue: { summary: "EDropdownAlignment.LEFT" },
            },
        },
        width: {
            control: { type: "select" },
            options: Object.values(EDropdownWidth),
            description: "Вариант расчёта ширины выпадающего списка.",
            table: {
                category: "Props",
                type: { summary: "EDropdownWidth" },
                defaultValue: { summary: "EDropdownWidth.CONTENT" },
            },
        },
        loading: {
            control: "boolean",
            description: "Состояние загрузки списка (prop компонента DropdownList).",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof Dropdown> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Меню открывается и закрывается по клику на управляющий элемент." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
    play: openAllDropdowns,
};

export const Sizes: StoryObj<typeof Dropdown> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Размеры SM / MD / LG. Размер задаётся и меню, и вложенному списку." },
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
    play: openAllDropdowns,
};

export const Directions: StoryObj<typeof Dropdown> = {
    render: DirectionsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Направление раскрытия. Значение по умолчанию AUTO раскрывает меню вниз, а если места снизу не хватает — вверх.",
            },
            source: {
                code: DirectionsSource,
                language: "tsx",
            },
        },
    },
    play: openAllDropdowns,
};

export const Alignments: StoryObj<typeof Dropdown> = {
    render: AlignmentsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Выравнивание меню относительно управляющего элемента. Если меню не помещается на экране, оно смещается внутрь области просмотра.",
            },
            source: {
                code: AlignmentsSource,
                language: "tsx",
            },
        },
    },
    play: openAllDropdowns,
};

export const Widths: StoryObj<typeof Dropdown> = {
    render: WidthsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Расчёт ширины: по содержимому (CONTENT), по ширине управляющего элемента (TARGET) или не уже управляющего элемента (MIN_TARGET).",
            },
            source: {
                code: WidthsSource,
                language: "tsx",
            },
        },
    },
    play: openAllDropdowns,
};

export const Loading: StoryObj<typeof Dropdown> = {
    render: LoadingRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Подгрузка опций: DropdownList дополняет список элементом с лоадером." },
            source: {
                code: LoadingSource,
                language: "tsx",
            },
        },
    },
    play: openAllDropdowns,
};

export const WithSelectedOption: StoryObj<typeof Dropdown> = {
    render: WithSelectedOptionRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Выбранная опция подсвечивается и становится активной при открытии меню.",
            },
            source: {
                code: WithSelectedOptionSource,
                language: "tsx",
            },
        },
    },
    play: openAllDropdowns,
};

export const MobileView: StoryObj<typeof Dropdown> = {
    name: "Example: mobile view",
    render: MobileViewRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "С mobileViewProps на ширине экрана до 768px вместо десктопного меню открывается полноэкранная мобильная версия.",
            },
            source: {
                code: MobileViewSource,
                language: "tsx",
            },
        },
    },
    play: openAllDropdowns,
};

export const VisualTests: StoryObj<typeof Dropdown> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: async ({ canvas, userEvent }) => {
        await userEvent.click(await canvas.findByRole("button", { name: /Открыть список/ }));
    },
};
