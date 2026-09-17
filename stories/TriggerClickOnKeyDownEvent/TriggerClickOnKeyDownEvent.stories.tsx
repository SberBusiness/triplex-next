import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { TriggerClickOnKeyDownEvent, EVENT_KEY_CODES } from "@sberbusiness/triplex-next";
import {
    IPlaygroundProps,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    WithMultipleKeys as WithMultipleKeysRender,
    WithMultipleKeysSource,
    WithHiddenTarget as WithHiddenTargetRender,
    WithHiddenTargetSource,
} from "./examples";

const meta = {
    title: "Components/TriggerClickOnKeyDownEvent",
    component: TriggerClickOnKeyDownEvent,
    tags: ["autodocs"],
    parameters: {
        // Компонент не имеет визуального интерфейса — собственной разметки он не рендерит,
        // на скриншот попадает только обвязка примеров. Скриншот-тесты для набора не нужны.
        testRunner: { skip: true },
        docs: {
            description: {
                component:
                    "Вызывает click на кнопке из targetRef при нажатии клавиши eventKeyCode. Клавиша слушается на window (через KeyDownListener), собственной разметки компонент не рендерит — children выводятся как есть. По скрытой кнопке (display: none) клик не выполняется.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TriggerClickOnKeyDownEvent} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof TriggerClickOnKeyDownEvent>;

export default meta;

const KEY_CODE_LABELS = Object.fromEntries(
    Object.entries(EVENT_KEY_CODES).map(([keyName, keyCode]) => [keyCode, keyName]),
);

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        eventKeyCode: EVENT_KEY_CODES.ESCAPE,
        targetHidden: false,
    },
    argTypes: {
        eventKeyCode: {
            control: { type: "select", labels: KEY_CODE_LABELS },
            options: Object.values(EVENT_KEY_CODES),
            description: "Код клавиши из EVENT_KEY_CODES или массив кодов, по нажатию которых выполняется клик.",
            table: { type: { summary: "number | number[]" } },
        },
        targetHidden: {
            control: "boolean",
            description: "Скрыть кнопку через display: none — по скрытой кнопке клик не выполняется.",
            table: { category: "Settings" },
        },
    },
    parameters: {
        controls: { include: ["eventKeyCode", "targetHidden"] },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof TriggerClickOnKeyDownEvent> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Кнопка закрытия панели кликается по Esc — типовой сценарий оверлеев." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithMultipleKeys: StoryObj<typeof TriggerClickOnKeyDownEvent> = {
    render: WithMultipleKeysRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "В eventKeyCode можно передать массив кодов — клик по кнопке выполняется на любую клавишу из массива.",
            },
            source: {
                code: WithMultipleKeysSource,
                language: "tsx",
            },
        },
    },
};

export const WithHiddenTarget: StoryObj<typeof TriggerClickOnKeyDownEvent> = {
    render: WithHiddenTargetRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Триггеры можно вкладывать друг в друга, чтобы одна клавиша обслуживала несколько кнопок. Клик выполняется только по видимой кнопке: скрытые через display: none пропускаются.",
            },
            source: {
                code: WithHiddenTargetSource,
                language: "tsx",
            },
        },
    },
};
