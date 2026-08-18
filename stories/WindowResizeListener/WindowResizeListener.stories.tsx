import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { action } from "storybook/actions";
import { WindowResizeListener } from "@sberbusiness/triplex-next";
import {
    IPlaygroundProps,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    ThrottleDelay as ThrottleDelayRender,
    ThrottleDelaySource,
} from "./examples";

const meta = {
    title: "Components/WindowResizeListener",
    component: WindowResizeListener,
    tags: ["autodocs"],
    parameters: {
        // Компонент не имеет визуального интерфейса — собственной разметки он не рендерит,
        // на скриншот попадает только обвязка примеров. Скриншот-тесты для набора не нужны.
        testRunner: { skip: true },
        docs: {
            description: {
                component:
                    "Слушатель изменения размеров окна браузера. Пока компонент смонтирован, слушает resize на window и вызывает onResize не чаще, чем раз в throttleDelay миллисекунд. Собственной разметки не рендерит — children выводятся как есть.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={WindowResizeListener} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof WindowResizeListener>;

export default meta;

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        throttleDelay: 100,
        onResize: action("onResize"),
    },
    argTypes: {
        throttleDelay: {
            control: { type: "number", min: 0, step: 50 },
            description: "Задержка throttle между вызовами onResize, в миллисекундах.",
            table: {
                type: { summary: "number" },
                defaultValue: { summary: "100" },
            },
        },
        onResize: {
            control: false,
            description: "Обработчик изменения размеров окна.",
            table: { type: { summary: "(event: UIEvent) => void" } },
        },
    },
    parameters: {
        controls: { include: ["throttleDelay", "onResize"] },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof WindowResizeListener> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Минимальный пример: обработчик читает актуальные размеры окна. Обработчик обёрнут в useCallback — при смене его ссылки слушатель переподписывается заново.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const ThrottleDelay: StoryObj<typeof WindowResizeListener> = {
    render: ThrottleDelayRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "throttleDelay задаёт минимальный интервал между вызовами onResize. Значение по умолчанию — 100 мс.",
            },
            source: {
                code: ThrottleDelaySource,
                language: "tsx",
            },
        },
    },
};
