import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TreeView } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    KeyboardNavigation as KeyboardNavigationRender,
    KeyboardNavigationSource,
    Nested as NestedRender,
    NestedSource,
    Playground as PlaygroundRender,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/TreeView",
    component: TreeView,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    'Базовый компонент визуального дерева. Задаёт семантику (`<ul role="tree">`, `<li role="treeitem">`, `aria-expanded`), строит по разметке абстрактное дерево нод и реализует перемещение активной ноды стрелками вверх/вниз. Собственного оформления у компонента нет — весь UI узла рисует потребитель.\n\n### Когда использовать\n\n| Сценарий | Компонент |\n| --- | --- |\n| Типовое дерево «папка/файл»: шеврон, hover, focus-visible | [`CollapsibleTree`](?path=/docs/components-collapsibletree--docs) |\n| Нестандартный UI узла, но нужна анимация раскрытия и controlled-состояние | [`CollapsibleTreeExtended`](?path=/docs/components-collapsibletreeextended--docs) |\n| Нужен только каркас дерева: семантика, регистрация нод, навигация стрелками | `TreeView` |\n\n### Из чего состоит\n\n```\nTreeView                → <ul role="tree">\n└── TreeView.Node       → <li role="treeitem" aria-expanded>\n    ├── children(props) → разметку узла рисует потребитель\n    └── TreeView.Group  → <ul role="group"> — обёртка вложенных нод\n```\n\n### Provide-props render-функции `TreeView.Node`\n\n| Поле | Описание |\n| --- | --- |\n| `activeNode` | Нода активна при перемещении с клавиатуры |\n| `openedNode` | Нода раскрыта |\n| `hasChildNodes` | У ноды есть зарегистрированные дочерние ноды |\n| `isLastNode` | Нода последняя в дереве (полезно для линий-коннекторов) |\n| `setOpenedNode(opened)` | Смена состояния раскрытия во внутреннем состоянии `TreeView` |',
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TreeView} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof TreeView>;

interface IPlaygroundArgs {
    /** Раскрыть все ветки по умолчанию. */
    defaultOpened: boolean;
    /** Добавить третий уровень вложенности. */
    withThirdLevel: boolean;
}

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    defaultOpened: false,
    withThirdLevel: false,
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        defaultOpened: {
            description: "Раскрыть все ветки по умолчанию.",
            control: "boolean",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
        },
        withThirdLevel: {
            description: "Добавить третий уровень вложенности.",
            control: "boolean",
            table: {
                category: "Settings",
                defaultValue: { summary: "false" },
            },
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
    render: ({ defaultOpened, withThirdLevel }) => (
        <PlaygroundRender defaultOpened={defaultOpened} withThirdLevel={withThirdLevel} />
    ),
};

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Минимальное дерево: `TreeView` и плоский список `TreeView.Node`. Разметку узла целиком задаёт render-функция `children`, семантику (`role`, `tabIndex`) добавляет сам компонент.",
            },
            source: { code: DefaultSource, language: "tsx" },
        },
    },
};

export const Nested: Story = {
    render: NestedRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Вложенное дерево: дочерние ноды оборачиваются в `TreeView.Group`, состояние раскрытия хранит потребитель и передаёт через prop `opened`. Группа остаётся в разметке и в свёрнутом состоянии — так вложенные ноды остаются зарегистрированными и родитель знает про `hasChildNodes`.",
            },
            source: { code: NestedSource, language: "tsx" },
        },
    },
};

export const KeyboardNavigation: Story = {
    name: "Keyboard navigation",
    render: KeyboardNavigationRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Перемещение активной ноды стрелками вверх/вниз. Активной нода становится по фокусу, дальше стрелки двигают `activeNode` по дереву и спускаются только в раскрытые ветки. Подсветку активной ноды рисует потребитель по provide-prop `activeNode`.",
            },
            source: { code: KeyboardNavigationSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    play: async ({ canvas }) => {
        // Активная нода появляется только по фокусу — снимаем ее в кадр.
        const items = await canvas.findAllByRole("treeitem");

        items[0].focus();
    },
};
