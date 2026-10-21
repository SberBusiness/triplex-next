import React from "react";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { EFontType, EScreenWidth, ETextSize, MobileView, Puller, Text } from "@sberbusiness/triplex-next";
import {
    DefaultRender,
    DefaultSource,
    IPlaygroundProps,
    PlaygroundRender,
    SMSPullerRender,
    SMSPullerSource,
    VisualTestsRender,
    WithInputRender,
    WithInputSource,
    WithListRender,
    WithListSource,
} from "./examples";

/**
 * Puller рассчитан на узкие экраны: на широком шторка растягивается на всю ширину и выглядит не так,
 * как в продукте. Поэтому на ширине от 768px (в том числе на docs-странице) вместо примера выводится подсказка.
 * Декоратор не попадает в исходный код примеров — они остаются копируемыми.
 */
const withNarrowScreen: Decorator = (Story) => (
    <MobileView
        fallback={
            <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                Puller рассчитан на экраны уже 768px. Откройте пример отдельно — он показывается во viewport XS, — или
                сузьте окно браузера.
            </Text>
        }
    >
        <Story />
    </MobileView>
);

const meta = {
    title: "Components/Puller",
    component: Puller,
    tags: ["autodocs"],
    decorators: [withNarrowScreen],
    // Отдельно открытая стори сразу показывается во viewport XS. На docs-странице viewport не применяется.
    globals: {
        viewport: { value: "XS" },
    },
    // Обязательные props компонента. Все стори отрисовываются собственным render,
    // поэтому здесь заданы нейтральные заглушки.
    args: {
        opened: false,
        setOpened: () => {},
    },
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Puller} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Puller>;

export default meta;

type TPlay = NonNullable<StoryObj<typeof Puller>["play"]>;

/**
 * Документационные примеры стартуют закрытыми — иначе на странице autodocs все стори
 * рендерятся разом, и каждая открытая шторка перекрывает страницу и блокирует её скролл.
 */
const openPuller: TPlay = async ({ canvas, userEvent }) => {
    // На широком экране withNarrowScreen показывает подсказку вместо примера — открывать нечего.
    if (!window.matchMedia(`(max-width: ${EScreenWidth.SM_MAX})`).matches) {
        return;
    }

    await userEvent.click(await canvas.findByRole("button", { name: "Open" }));
};

const PLAYGROUND_ARGS: IPlaygroundProps = {
    // Стартует закрытым: Playground попадает на docs-страницу через <Primary />, и открытая шторка
    // заблокировала бы скролл всей страницы (pullerScrollLock на body).
    opened: false,
    title: "Title",
    loading: false,
    withFooter: true,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Описание и тип — из JSDoc IPullerProps.
        opened: {
            control: "boolean",
            table: { category: "Props" },
        },
        title: {
            control: "text",
            description: "Заголовок в шапке (children компонента PullerHeader).",
            table: {
                category: "Settings",
                defaultValue: { summary: "Title" },
            },
        },
        loading: {
            control: "boolean",
            description: "Состояние загрузки списка (prop компонента PullerList).",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
        withFooter: {
            control: "boolean",
            description: "С футером (PullerFooter).",
            table: {
                category: "Settings",
                defaultValue: { summary: "true" },
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

export const Default: StoryObj<typeof Puller> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Шапка с заголовком и кнопкой закрытия в controlButtons, тело и футер с кнопкой.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
    play: openPuller,
};

export const WithList: StoryObj<typeof Puller> = {
    render: WithListRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список опций: выбранный элемент подсвечивается (selected), showNotificationIcon показывает значок новых уведомлений, loading дополняет список элементом с лоадером.",
            },
            source: {
                code: WithListSource,
                language: "tsx",
            },
        },
    },
    play: openPuller,
};

export const WithInput: StoryObj<typeof Puller> = {
    render: WithInputRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Поле ввода в шапке — например, для поиска по подсказкам. PullerLoader в controlButtons показывает загрузку.",
            },
            source: {
                code: WithInputSource,
                language: "tsx",
            },
        },
    },
    play: openPuller,
};

export const SMSPuller: StoryObj<typeof Puller> = {
    name: "Example: SMSPuller",
    render: SMSPullerRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Подтверждение операции СМС-кодом: при открытии шторки запускается отсчёт до повторного запроса, отправка кода закрывает шторку.",
            },
            source: {
                code: SMSPullerSource,
                language: "tsx",
            },
        },
        // Обратный отсчёт меняет иконку SMSField.Refresh каждую секунду — скриншот был бы нестабильным.
        testRunner: { skip: true },
    },
    play: openPuller,
};

export const VisualTests: StoryObj<typeof Puller> = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: openPuller,
};
