import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { action } from "storybook/actions";
import { KeyDownListener, EVENT_KEY_CODES } from "@sberbusiness/triplex-next";
import {
    IPlaygroundProps,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    WithMultipleKeys as WithMultipleKeysRender,
    WithMultipleKeysSource,
} from "./examples";

const meta = {
    title: "Components/KeyDownListener",
    component: KeyDownListener,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Слушатель нажатия клавиш. Пока компонент смонтирован, слушает keydown на window и вызывает onMatch при совпадении кода нажатой клавиши с eventKeyCode. Собственной разметки не рендерит — children выводятся как есть.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={KeyDownListener} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof KeyDownListener>;

export default meta;

const KEY_CODE_LABELS = Object.fromEntries(
    Object.entries(EVENT_KEY_CODES).map(([keyName, keyCode]) => [keyCode, keyName]),
);

/** Рендер VisualTests: состояние после срабатывания слушателя фиксируется play-функцией. */
const VisualTestsRender = () => {
    const [matched, setMatched] = useState(false);

    return (
        <KeyDownListener eventKeyCode={EVENT_KEY_CODES.ESCAPE} onMatch={() => setMatched(true)}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
                <div>Слушатель Esc</div>
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    {matched ? "onMatch сработал" : "Ожидание нажатия Esc"}
                </div>
            </div>
        </KeyDownListener>
    );
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        eventKeyCode: EVENT_KEY_CODES.ESCAPE,
        onMatch: action("onMatch"),
    },
    argTypes: {
        eventKeyCode: {
            control: { type: "select", labels: KEY_CODE_LABELS },
            options: Object.values(EVENT_KEY_CODES),
            description: "Код клавиши из EVENT_KEY_CODES или массив кодов, на которые реагирует слушатель.",
            table: { type: { summary: "number | number[]" } },
        },
        onMatch: {
            control: false,
            description: "Обработчик совпадения нужной клавиши.",
            table: { type: { summary: "(event: KeyboardEvent) => void" } },
        },
    },
    parameters: {
        controls: { include: ["eventKeyCode", "onMatch"] },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof KeyDownListener> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Слушатель одной клавиши: по Esc скрывается панель." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithMultipleKeys: StoryObj<typeof KeyDownListener> = {
    render: WithMultipleKeysRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "В eventKeyCode можно передать массив кодов — onMatch вызывается на любую клавишу из массива, различить её можно по event.keyCode.",
            },
            source: {
                code: WithMultipleKeysSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof KeyDownListener> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => <VisualTestsRender />,
    play: async ({ canvas }) => {
        // userEvent не проставляет legacy-поле keyCode в KeyboardEvent, а KeyDownListener сравнивает
        // именно его, поэтому событие диспатчится напрямую на window с нужным кодом клавиши.
        window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape", keyCode: EVENT_KEY_CODES.ESCAPE, bubbles: true }),
        );

        await canvas.findByText("onMatch сработал");
    },
};
