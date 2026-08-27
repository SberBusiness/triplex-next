import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { MasterTable } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Example as ExampleRender,
    ExampleSource,
    IPlaygroundProps,
    Loading as LoadingRender,
    LoadingSource,
    NoColumns as NoColumnsRender,
    NoColumnsSource,
    NoData as NoDataRender,
    NoDataSource,
    Playground as PlaygroundRender,
    VisualTests as VisualTestsRender,
} from "./examples";

/** Декоратор отключает анимации: вращающийся лоадер делает скриншоты нестабильными. */
const withoutAnimation = (Story: React.ComponentType) => (
    <>
        <style>{`* { animation: none !important; }`}</style>
        <Story />
    </>
);

const meta = {
    title: "Components/MasterTable",
    component: MasterTable,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Контейнер таблицы. Сам по себе рисует только позиционирующую обёртку, а его задача — собрать вокруг таблицы панели и раздать им общее состояние через `MasterTableContext`.\n\n### Из чего состоит\n\n```\nMasterTable                   → <div> с контекстом\n├── MasterTable.FilterPanel        → панель фильтров над таблицей\n├── MasterTable.ChipPanel          → панель чипов; .Links — ссылки справа\n├── MasterTable.TableBasicSettings → выпадающие настройки колонок\n├── MasterTable.TableBasic         → сама таблица\n├── MasterTable.NoColumns          → заглушка, когда все колонки скрыты\n├── MasterTable.TableFooter        → подвал: .Summary и .Controls\n└── MasterTable.PaginationPanel    → панель пагинации под таблицей\n```\n\n### Что раздаёт контекст\n\n| Поле | Кто пишет | Кто читает |\n| --- | --- | --- |\n| `loading` | `MasterTable` из props | `MasterTable.TableBasic` (лоадер поверх таблицы), `Pagination` (блокирует навигацию и селект) |\n| `columns` | `MasterTable.TableBasic` из своего props `columns` | `ColumnSettings` (настройки видимости колонок) |",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={MasterTable} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof MasterTable>;

export default meta;

const PLAYGROUND_ARGS: IPlaygroundProps = {
    // Props
    loading: false,
    // Settings
    withFilterPanel: false,
    withTableFooter: false,
    withPaginationPanel: false,
    empty: false,
};

export const Playground: StoryObj<IPlaygroundProps> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        loading: {
            description: "Состояние загрузки. Раздаётся дочерним компонентам через MasterTableContext.",
            control: "boolean",
            table: {
                category: "Props",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        withFilterPanel: {
            description: "Показать панель фильтров.",
            control: "boolean",
            table: { category: "Settings", defaultValue: { summary: "false" } },
        },
        withTableFooter: {
            description: "Показать подвал таблицы.",
            control: "boolean",
            table: { category: "Settings", defaultValue: { summary: "false" } },
        },
        withPaginationPanel: {
            description: "Показать панель пагинации.",
            control: "boolean",
            table: { category: "Settings", defaultValue: { summary: "false" } },
        },
        empty: {
            description: "Оставить таблицу без данных.",
            control: "boolean",
            table: { category: "Settings", defaultValue: { summary: "false" } },
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
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof MasterTable> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Loading: StoryObj<typeof MasterTable> = {
    decorators: [withoutAnimation],
    render: LoadingRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Свойство `loading` включает лоадер поверх таблицы. Оно раздаётся через `MasterTableContext` и всем дочерним компонентам — например, элементы пагинации становятся недоступны; это видно в story `Visual tests`.",
            },
            source: {
                code: LoadingSource,
                language: "tsx",
            },
        },
    },
};

export const NoData: StoryObj<typeof MasterTable> = {
    render: NoDataRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Когда `data` пустой, таблица показывает результат `renderNoData`.",
            },
            source: {
                code: NoDataSource,
                language: "tsx",
            },
        },
    },
};

export const NoColumns: StoryObj<typeof MasterTable> = {
    render: NoColumnsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Когда каждая колонка имеет `hidden`, таблица показывает результат `renderNoColumns` — обычно это `MasterTable.NoColumns`.",
            },
            source: {
                code: NoColumnsSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof MasterTable> = {
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Полная композиция: фильтры, настройки колонок, сортировка, выбор строк, подвал с подытогом и пагинация.",
            },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof MasterTable> = {
    name: "Visual tests",
    tags: ["!autodocs"],
    decorators: [withoutAnimation],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
