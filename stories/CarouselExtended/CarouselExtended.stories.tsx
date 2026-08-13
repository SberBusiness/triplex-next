import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { CarouselExtended } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Example as ExampleRender,
    ExampleSource,
    IPlaygroundProps,
    Playground as PlaygroundRender,
    VisualTests as VisualTestsRender,
    WithShortContent as WithShortContentRender,
    WithShortContentSource,
} from "./examples";

const meta = {
    title: "Components/CarouselExtended",
    component: CarouselExtended,
    tags: ["autodocs"],
    // Обязательные props компонента. Все стори отрисовываются собственным render,
    // поэтому здесь заданы нейтральные заглушки.
    args: {
        buttonPrev: () => null,
        buttonNext: () => null,
        stepPrev: 200,
        stepNext: 200,
    },
    parameters: {
        docs: {
            description: {
                component: `
Горизонтально прокручиваемая лента произвольного контента. Разметку кнопок прокрутки рендерит потребитель — компонент передаёт им только состояние и обработчик клика.

## Особенности

- **buttonPrev** и **buttonNext** — рендер-функции. Каждая получает **disabled** (край ленты достигнут), **hidden** (контент помещается целиком, прокручивать нечего) и **onClick**.
- Корневой элемент — обычный div, который получает **className**, **style** и остальные HTML-атрибуты. Раскладку кнопок относительно ленты задаёт потребитель.
- **ref** указывает на прокручиваемый контейнер, а не на корневой элемент: по нему читается и задаётся позиция прокрутки.
- Состояние кнопок пересчитывается при прокрутке ленты, изменении размера окна, прокрутке страницы и смене **children**.
- Прокрутка по кнопке анимирована; **stepPrev** и **stepNext** задают величину шага в пикселях.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CarouselExtended} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CarouselExtended>;

export default meta;

const PLAYGROUND_ARGS: IPlaygroundProps = {
    stepPrev: 200,
    stepNext: 200,
    itemsCount: 12,
    width: 480,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        stepPrev: {
            control: { type: "number", min: 0 },
            description: "Величина (px) прокрутки при клике на кнопку «Назад».",
            table: {
                category: "Props",
                type: { summary: "number" },
            },
        },
        stepNext: {
            control: { type: "number", min: 0 },
            description: "Величина (px) прокрутки при клике на кнопку «Вперёд».",
            table: {
                category: "Props",
                type: { summary: "number" },
            },
        },
        itemsCount: {
            control: { type: "number", min: 0 },
            description: "Количество элементов в ленте. Уменьшите его, чтобы контент поместился и кнопки скрылись.",
            table: { category: "Settings" },
        },
        width: {
            control: { type: "number", min: 100, step: 20 },
            description: "Ширина ленты вместе с кнопками.",
            table: { category: "Settings" },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof CarouselExtended> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Лента шире видимой области: кнопки видны, кнопка «Назад» заблокирована, потому что лента в начальном положении.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithShortContent: StoryObj<typeof CarouselExtended> = {
    render: WithShortContentRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Контент помещается в ленту целиком: компонент передаёт в рендер-функции hidden, и кнопки не рендерятся.",
            },
            source: {
                code: WithShortContentSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof CarouselExtended> = {
    name: "Example: лента применённых фильтров",
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Прокручиваемая строка применённых фильтров. При удалении тега меняются children, и компонент пересчитывает состояние кнопок: когда оставшиеся фильтры помещаются в строку, кнопки скрываются.",
            },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof CarouselExtended> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
