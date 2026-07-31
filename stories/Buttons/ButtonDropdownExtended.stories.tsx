import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ButtonDropdownExtended } from "@sberbusiness/triplex-next";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import {
    CloseOnTab as CloseOnTabRender,
    CloseOnTabSource,
    Controlled as ControlledRender,
    ControlledSource,
    Default as DefaultRender,
    DefaultSource,
    Playground as PlaygroundRender,
    VisualTests as VisualTestsRender,
    WithCustomContent as WithCustomContentRender,
    WithCustomContentSource,
} from "./examples/ButtonDropdownExtended";

const meta = {
    title: "Components/Buttons/ButtonDropdownExtended",
    component: ButtonDropdownExtended,
    tags: ["autodocs"],
    // Обязательные props компонента — render-функции и ref. Все стори отрисовываются
    // собственным render, поэтому здесь заданы нейтральные заглушки.
    args: {
        renderButton: () => null,
        renderDropdown: () => null,
        dropdownRef: { current: null },
    },
    parameters: {
        docs: {
            description: {
                component: `
Низкоуровневая кнопка с выпадающим блоком: сама кнопка и содержимое блока задаются render-функциями.

## Особенности

- Управляет состоянием открытости и отдаёт его в **renderButton** и **renderDropdown**.
- Работает в неконтролируемом режиме или в контролируемом — через **opened** и **setOpened**.
- Пока блок открыт, закрывает его по Escape, по клику вне кнопки и блока, а при **closeOnTab** — ещё и по Tab.
- Готовый вариант со списком действий — **ButtonDropdown**.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ButtonDropdownExtended} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ButtonDropdownExtended>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    render: PlaygroundRender,
    argTypes: {
        closeOnTab: {
            control: { type: "boolean" },
            description: "Закрытие выпадающего блока при нажатии клавиши Tab",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        opened: { table: { disable: true } },
        setOpened: { table: { disable: true } },
        renderButton: { table: { disable: true } },
        renderDropdown: { table: { disable: true } },
        dropdownRef: { table: { disable: true } },
    },
    args: {
        closeOnTab: false,
    },
    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        controls: {
            include: ["closeOnTab"],
        },
        testRunner: { skip: true },
    },
};

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Неконтролируемый режим: состояние открытости хранит сам компонент.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Controlled: Story = {
    render: ControlledRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Контролируемый режим через `opened` и `setOpened`. Значение `opened` должно быть определено уже на первом рендере — режим управления фиксируется на монтировании.",
            },
            source: {
                code: ControlledSource,
                language: "tsx",
            },
        },
        // Закрытое состояние визуально повторяет Default — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const CloseOnTab: Story = {
    render: CloseOnTabRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "С `closeOnTab` выпадающий блок закрывается не только по Escape и клику вне блока, но и по Tab.",
            },
            source: {
                code: CloseOnTabSource,
                language: "tsx",
            },
        },
        // Закрытое состояние визуально повторяет Default — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const WithCustomContent: Story = {
    render: WithCustomContentRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "В выпадающем блоке может быть любой контент, а не только список действий.",
            },
            source: {
                code: WithCustomContentSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    // Раскрывает список действий; блок с произвольным контентом уже раскрыт в контролируемом режиме.
    play: async ({ canvas, userEvent }) => {
        // Доступное имя кнопки включает скрытый лоадер ("Открыть список loading"), поэтому ищем по подстроке.
        await userEvent.click(await canvas.findByRole("button", { name: /Открыть список/ }));
    },
};
