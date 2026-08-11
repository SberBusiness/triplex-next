import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { action } from "storybook/actions";
import { ComposedKeyDownListener, EVENT_KEY_CODES } from "@sberbusiness/triplex-next";
import {
    IPlaygroundProps,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    WithDynamicListeners as WithDynamicListenersRender,
    WithDynamicListenersSource,
    Example as ExampleRender,
    ExampleSource,
} from "./examples";

const meta = {
    title: "Components/ComposedKeyDownListener",
    component: ComposedKeyDownListener,
    tags: ["autodocs"],
    parameters: {
        // Компонент не имеет визуального интерфейса — собственной разметки он не рендерит,
        // на скриншот попадает только обвязка примеров. Скриншот-тесты для набора не нужны.
        testRunner: { skip: true },
        docs: {
            description: {
                component:
                    "Композитор слушателей нажатия клавиш. Рендерит по одному KeyDownListener на элемент keyDownListeners соседями к children — каждый слушатель подписывается на window независимо. Собственной разметки не добавляет.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ComposedKeyDownListener} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ComposedKeyDownListener>;

export default meta;

const KEY_CODE_LABELS = Object.fromEntries(
    Object.entries(EVENT_KEY_CODES).map(([keyName, keyCode]) => [keyCode, keyName]),
);

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        eventKeyCodes: [EVENT_KEY_CODES.ENTER, EVENT_KEY_CODES.ESCAPE],
        onMatch: action("onMatch"),
    },
    argTypes: {
        eventKeyCodes: {
            control: { type: "check", labels: KEY_CODE_LABELS },
            options: Object.values(EVENT_KEY_CODES),
            description: "Коды клавиш, на каждый из которых создаётся отдельный элемент keyDownListeners.",
            table: { category: "Settings", type: { summary: "number[]" } },
        },
        onMatch: {
            control: false,
            description: "Обработчик совпадения, общий для всех создаваемых слушателей.",
            table: { category: "Settings", type: { summary: "(event: KeyboardEvent) => void" } },
        },
    },
    parameters: {
        controls: { include: ["eventKeyCodes", "onMatch"] },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof ComposedKeyDownListener> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Несколько горячих клавиш с разными обработчиками задаются одним компонентом: Enter подтверждает, Esc отменяет.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithDynamicListeners: StoryObj<typeof ComposedKeyDownListener> = {
    render: WithDynamicListenersRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Набор слушателей может меняться между рендерами: слушатели рендерятся соседями к children, поэтому смена длины keyDownListeners не перемонтирует содержимое — введённый текст и фокус сохраняются.",
            },
            source: {
                code: WithDynamicListenersSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof ComposedKeyDownListener> = {
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Панель подтверждения: Enter сохраняет, Esc отменяет. Слушатели смонтированы вместе с панелью, поэтому горячие клавиши работают только пока она открыта, а те же действия доступны кнопками.",
            },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};
