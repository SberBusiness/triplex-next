import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { SwipeableArea } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Example as ExampleRender,
    ExampleSource,
    ImperativeApi as ImperativeApiRender,
    ImperativeApiSource,
    IPlaygroundProps,
    Playground as PlaygroundRender,
    VisualTests as VisualTestsRender,
    WithBothAreas as WithBothAreasRender,
    WithBothAreasSource,
} from "./examples";

const meta = {
    title: "Components/SwipeableArea",
    component: SwipeableArea,
    parameters: {
        docs: {
            description: {
                component: `Контейнер карточки с реализацией свайпа: горизонтальное движение пальца сдвигает контент и открывает боковую область с действиями. Свайп влево открывает **rightSwipeableArea**, свайп вправо — **leftSwipeableArea**.

### Как это работает

Первое перемещение пальца определяет тип жеста: если вертикальная составляющая больше горизонтальной, это скролл, и контент не двигается. Горизонтальный жест двигает контент вслед за пальцем, но не дальше ширины открываемой области; на время свайпа вертикальный скролл контента блокируется.

При отпускании пальца область открывается или закрывается только если свайп был длиннее 24px, иначе контент возвращается в положение, с которого начинался жест. **onSwipeLeft** и **onSwipeRight** вызываются только на открытии области — закрывающий свайп их не вызывает.

Открытая область закрывается тапом за пределами компонента.

### Управление без свайпа

Свайп — тач-жест, мышью и с клавиатуры его не выполнить. Для программного управления есть императивный ref **ISwipeableAreaRef**: **swipeLeft** открывает правую область, **swipeRight** — левую, **closeSwipe** закрывает открытую. Так же устроен **ListTableItem**, который принимает **swipeableAreaRef** и пробрасывает его в **SwipeableArea**.

### Доступность

Собственных ARIA-атрибутов компонент не выставляет. Боковые области всегда присутствуют в DOM, поэтому их кнопки доступны по Tab и в закрытом состоянии — дублировать действия для клавиатуры не нужно, но и скрыть их от скринридера компонент сам не может.`,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SwipeableArea} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SwipeableArea>;

export default meta;

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        withLeftSwipeableArea: true,
        withRightSwipeableArea: true,
    },
    argTypes: {
        withLeftSwipeableArea: {
            control: "boolean",
            description: "Передать leftSwipeableArea — область, открывающуюся свайпом вправо.",
            table: { category: "Settings" },
        },
        withRightSwipeableArea: {
            control: "boolean",
            description: "Передать rightSwipeableArea — область, открывающуюся свайпом влево.",
            table: { category: "Settings" },
        },
    },
    parameters: {
        controls: { include: ["withLeftSwipeableArea", "withRightSwipeableArea"] },
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof SwipeableArea> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Карточка с одной боковой областью: свайп влево открывает кнопки действий. `ListItemTailRight` подсказывает пользователю, что карточку можно свайпнуть.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithBothAreas: StoryObj<typeof SwipeableArea> = {
    name: "With both areas",
    render: WithBothAreasRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Обе боковые области сразу. Свайп в каждую сторону открывает свою область, открыть их одновременно нельзя.",
            },
            source: {
                code: WithBothAreasSource,
                language: "tsx",
            },
        },
        // Закрытое состояние повторяет Default, открытые состояния снимаются в VisualTests.
        testRunner: { skip: true },
    },
};

export const ImperativeApi: StoryObj<typeof SwipeableArea> = {
    name: "Imperative API",
    render: ImperativeApiRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Управление через `ISwipeableAreaRef`: `swipeLeft` открывает правую область, `swipeRight` — левую, `closeSwipe` закрывает открытую. Единственный способ открыть область без тач-жеста.",
            },
            source: {
                code: ImperativeApiSource,
                language: "tsx",
            },
        },
        // Закрытое состояние повторяет Default, открытые состояния снимаются в VisualTests.
        testRunner: { skip: true },
    },
};

export const Example: StoryObj<typeof SwipeableArea> = {
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список платежей, где открытой остаётся только одна карточка: в `onSwipeLeft` остальные закрываются через `closeSwipe`.",
            },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof SwipeableArea> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
    play: async ({ canvas, userEvent }) => {
        const openButtons = await canvas.findAllByRole("button", { name: /^Открыть / });

        for (const button of openButtons) {
            await userEvent.click(button);
        }
    },
};
