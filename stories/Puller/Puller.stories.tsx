import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Puller } from "@sberbusiness/triplex-next";
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

const meta = {
    title: "Components/Puller",
    component: Puller,
    tags: ["autodocs"],
    // Заглушки обязательных props: все стори рендерятся собственным render.
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

const openPuller: TPlay = async ({ canvas, userEvent, viewMode }) => {
    // На docs-странице открытые шторки перекрыли бы страницу и заблокировали её скролл.
    if (viewMode === "docs") {
        return;
    }

    await userEvent.click(await canvas.findByRole("button", { name: "Open" }));
};

const PLAYGROUND_ARGS: IPlaygroundProps = {
    // Закрыт: через <Primary /> Playground рендерится и на docs-странице (см. openPuller).
    opened: false,
    title: "Title",
    listLoading: false,
    withFooter: true,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
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
        listLoading: {
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
                story: "Список опций: выбранный элемент подсвечивается (selected), showNotificationIcon показывает значок новых уведомлений, loading показывает лоадер в конце списка.",
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
