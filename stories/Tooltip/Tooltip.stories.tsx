import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { ETooltipAlign, ETooltipPreferPlace, ETooltipSize, Tooltip } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    DifferentPlaces as DifferentPlacesRender,
    DifferentPlacesSource,
    IPlaygroundProps,
    MobileHeader as MobileHeaderRender,
    MobileHeaderSource,
    Playground as PlaygroundRender,
    RenderContainer as RenderContainerRender,
    RenderContainerSource,
    Sizes as SizesRender,
    SizesSource,
    VisualTests as VisualTestsRender,
    WithCloseButton as WithCloseButtonRender,
    WithCloseButtonSource,
    WithLink as WithLinkRender,
    WithLinkSource,
} from "./examples";

const meta = {
    title: "Components/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    // Обязательные props компонента. Все стори отрисовываются собственным render,
    // поэтому здесь заданы нейтральные заглушки.
    args: {
        size: ETooltipSize.SM,
        targetRef: { current: null },
    },
    parameters: {
        docs: {
            description: {
                component: `
Всплывающая подсказка, привязанная к целевому элементу (**Tooltip.Target**). Рендерится через **Portal** — по умолчанию в document.body, либо в контейнер из **renderContainer**.

## Использование

Состав задаётся субкомпонентами: **Tooltip.Target** (обязателен), **Tooltip.Body**, **Tooltip.Link**, **Tooltip.XButton**, **Tooltip.MobileHeader**. Порядок субкомпонентов в разметке не важен — компонент разбирает children по типу.

## Особенности

- **targetRef** обязателен: от границ целевого элемента считается положение подсказки. Ref нужно передать и в **targetRef**, и в сам целевой элемент.
- Открытие: по наведению или по клику — **toggleType**. Закрытие — по Escape, по Tab с целевого элемента и по действию мышью вне подсказки.
- Состоянием можно управлять снаружи через **isOpen** и **toggle**; без **isOpen** компонент хранит состояние сам.
- **preferPlace** — предпочитаемое расположение. Если подсказка там не помещается, она встанет туда, где помещается.
- На мобильной ширине экрана (<768px) вместо всплывающей подсказки открывается полноэкранный оверлей снизу. Отключается через **disableAdaptiveMode**.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Tooltip} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Tooltip>;

export default meta;

type TPlay = NonNullable<StoryObj<typeof Tooltip>["play"]>;

/**
 * Открывает подсказку кликом по целевому элементу.
 * Документационные примеры стартуют закрытыми: клик открывает подсказку и на десктопе
 * (курсор при этом оказывается над целевым элементом), и в адаптивном режиме.
 */
const openTooltip: TPlay = async ({ canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole("button", { name: "Показать подсказку" }));
};

const PLAYGROUND_ARGS: IPlaygroundProps = {
    size: ETooltipSize.SM,
    toggleType: "hover",
    preferPlace: ETooltipPreferPlace.BELOW,
    alignTip: undefined,
    disableAdaptiveMode: false,
    text: "Текст подсказки",
    mobileHeader: "Заголовок для адаптивного режима",
    linkText: "",
    withCloseButton: false,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        size: {
            control: { type: "inline-radio" },
            options: Object.values(ETooltipSize),
            description: "Размер подсказки.",
            table: {
                category: "Props",
                type: { summary: "ETooltipSize" },
            },
        },
        toggleType: {
            control: { type: "inline-radio" },
            options: ["hover", "click"],
            description: "Подсказка появляется по наведению или по клику.",
            table: {
                category: "Props",
                type: { summary: "TTooltipToggleType" },
            },
        },
        preferPlace: {
            control: { type: "select" },
            options: Object.values(ETooltipPreferPlace),
            description: "Предпочитаемое место расположения подсказки.",
            table: {
                category: "Props",
                type: { summary: "ETooltipPreferPlace" },
            },
        },
        alignTip: {
            control: { type: "select" },
            options: Object.values(ETooltipAlign),
            description: "Расположение указателя (стрелочки) относительно целевого элемента.",
            table: {
                category: "Props",
                type: { summary: "ETooltipAlign" },
            },
        },
        disableAdaptiveMode: {
            control: "boolean",
            description: "Отключить адаптивный режим — подсказка останется всплывающей и на узком экране.",
            table: {
                category: "Props",
                defaultValue: { summary: "false" },
            },
        },
        text: {
            control: "text",
            description: "Текст в Tooltip.Body.",
            table: { category: "Settings" },
        },
        mobileHeader: {
            control: "text",
            description: "Заголовок Tooltip.MobileHeader. Пустая строка — без заголовка.",
            table: { category: "Settings" },
        },
        linkText: {
            control: "text",
            description: "Текст Tooltip.Link. Пустая строка — без ссылки.",
            table: { category: "Settings" },
        },
        withCloseButton: {
            control: "boolean",
            description: "Добавить Tooltip.XButton — кнопку закрытия.",
            table: { category: "Settings" },
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

export const Default: StoryObj<typeof Tooltip> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Минимальный состав: целевой элемент и текст. Подсказка открывается по наведению курсора.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
    play: openTooltip,
};

export const Sizes: StoryObj<typeof Tooltip> = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Размеры SM (192px) и LG (384px). Размер задаёт ширину тела подсказки в десктопной версии.",
            },
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const DifferentPlaces: StoryObj<typeof Tooltip> = {
    name: "Different places",
    render: DifferentPlacesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Все варианты preferPlace. Если подсказка не помещается в предпочитаемое место, она встанет туда, где помещается.",
            },
            source: {
                code: DifferentPlacesSource,
                language: "tsx",
            },
        },
    },
};

export const WithLink: StoryObj<typeof Tooltip> = {
    render: WithLinkRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Tooltip.Link — гиперссылка под текстом подсказки. При target="_blank" компонент сам подставляет rel="noopener".',
            },
            source: {
                code: WithLinkSource,
                language: "tsx",
            },
        },
    },
};

export const WithCloseButton: StoryObj<typeof Tooltip> = {
    render: WithCloseButtonRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Tooltip.XButton — кнопка закрытия в углу подсказки. Содержимое получает дополнительный отступ справа.",
            },
            source: {
                code: WithCloseButtonSource,
                language: "tsx",
            },
        },
    },
};

export const MobileHeader: StoryObj<typeof Tooltip> = {
    name: "Mobile Header",
    render: MobileHeaderRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Tooltip.MobileHeader — заголовок полноэкранной версии подсказки. Виден только на мобильной ширине экрана, где подсказка открывается по клику.",
            },
            source: {
                code: MobileHeaderSource,
                language: "tsx",
            },
        },
    },
    play: openTooltip,
};

export const RenderContainer: StoryObj<typeof Tooltip> = {
    name: "Render container",
    render: RenderContainerRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Рендер подсказки в заданный DOM-элемент вместо document.body. Предупреждение: position или transform контейнера и его родителей влияют на позиционирование подсказки.",
            },
            source: {
                code: RenderContainerSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof Tooltip> = {
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
