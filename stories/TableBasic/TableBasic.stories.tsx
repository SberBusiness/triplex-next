import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { MasterTable, TableBasic } from "@sberbusiness/triplex-next";
import {
    Alignments as AlignmentsRender,
    AlignmentsSource,
    CellTypes as CellTypesRender,
    CellTypesSource,
    ClickableRows as ClickableRowsRender,
    ClickableRowsSource,
    Default as DefaultRender,
    DefaultSource,
    ExampleProduction as ExampleProductionRender,
    ExampleProductionSource,
    Headless as HeadlessRender,
    HeadlessSource,
    HighlightRowOnHover as HighlightRowOnHoverRender,
    HighlightRowOnHoverSource,
    IPlaygroundArgs,
    Loading as LoadingRender,
    LoadingSource,
    NoColumns as NoColumnsRender,
    NoColumnsSource,
    NoData as NoDataRender,
    NoDataSource,
    Playground as PlaygroundRender,
    Sorting as SortingRender,
    SortingSource,
    TableSettingsColumn as TableSettingsColumnRender,
    TableSettingsColumnExtended as TableSettingsColumnExtendedRender,
    TableSettingsColumnExtendedSource,
    TableSettingsColumnSource,
    TableSpan as TableSpanRender,
    TableSpanSource,
    TableWithPagination as TableWithPaginationRender,
    TableWithPaginationExtended as TableWithPaginationExtendedRender,
    TableWithPaginationExtendedSource,
    TableWithPaginationLoading as TableWithPaginationLoadingRender,
    TableWithPaginationLoadingSource,
    TableWithPaginationSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/TableBasic",
    component: TableBasic,
    parameters: {
        docs: {
            description: {
                component:
                    "Компонент таблицы отображает структурированный набор данных, состоящий из строк и столбцов (табличных данных).\n\n`TableBasic` рендерит только `<table>` и подвал с заглушкой или лоадером. Обвязку — панель чипов, фильтры, настройки колонок, футер и пагинацию — добавляет родительский `MasterTable`, из его контекста берутся состояние загрузки и общий набор колонок.\n\n### Из чего состоит\n\n```\nMasterTable                    → контекст: loading + columns\n└── MasterTable.TableBasic     → <table>\n    ├── шапка                  → скрывается через headless\n    └── строки                 → columns × data по fieldKey\n```",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TableBasic} />
                    <Heading>Props родительского MasterTable</Heading>
                    <ArgTypes of={MasterTable} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof TableBasic>;

export default meta;

type Story = StoryObj<typeof TableBasic>;

// Состояние загрузки рисует LoaderMiddle с бесконечной анимацией и подложку с fadeIn.
// Test-runner ждёт тишины DOM, а CSS-анимация DOM не мутирует — кадр снялся бы в случайной фазе цикла.
const freezeAnimations: NonNullable<Story["decorators"]> = [
    (Story) => (
        <>
            <style>{`* { animation: none !important; }`}</style>
            <Story />
        </>
    ),
];

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    isLoading: false,
    isHeadless: false,
    withHighlightRowOnHover: false,
    withData: true,
    withHorizontalScroll: false,
    withButtons: false,
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        isLoading: {
            control: { type: "boolean" },
            description: "Состояние обновление данных",
            table: { category: "Settings", type: { summary: "boolean" } },
        },
        isHeadless: {
            control: { type: "boolean" },
            description: "Скрытие заголовка таблицы",
            table: { category: "Settings", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
        },
        withHighlightRowOnHover: {
            control: { type: "boolean" },
            description: "Подсвечивание строки при наведении",
            table: { category: "Settings", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
        },
        withData: {
            control: { type: "boolean" },
            description: "Отображение демо-данных",
            table: { category: "Settings", type: { summary: "boolean" } },
        },
        withHorizontalScroll: {
            control: { type: "boolean" },
            description:
                "Для корректного отображения горизонтального скролла необходимо обернуть компонент MasterTable.TableBasic в элемент с css-свойством overflow: auto hidden",
            table: { category: "Settings", type: { summary: "boolean" } },
        },
        withButtons: {
            control: { type: "boolean" },
            description: "Отображение кнопок",
            table: { category: "Settings", type: { summary: "boolean" } },
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
    render: (args) => <PlaygroundRender {...args} />,
};

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Минимальная таблица: `columns` описывают шапку, `data` — строки. Ячейка берётся из `rowData` по `fieldKey` колонки; если ключа в `rowData` нет, ячейка не рендерится вовсе. Обязательный `renderNoData` рисует заглушку для пустой таблицы.",
            },
            source: { code: DefaultSource, language: "tsx" },
        },
    },
};

export const Alignments: Story = {
    render: AlignmentsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Выравнивание содержимого ячеек задаётся на колонке: `horizontalAlign` (по умолчанию `LEFT`) и `verticalAlign`. Дефолт вертикального выравнивания зависит от типа ячейки: `BASELINE` для `ECellType.TEXT` и `TOP` для остальных.\n\nВысоту строки в примере задаёт длинный текст первой колонки, а короткое содержимое остальных выравнивается внутри этой высоты — так разница по вертикали становится видна. Поэтому сумма справа прижата к нижнему краю строки: у её колонки задан `verticalAlign: EVerticalAlign.BOTTOM`, а не потому, что суммы выравниваются так по умолчанию. Для колонки с суммой обычно нужен только `horizontalAlign: EHorizontalAlign.RIGHT`, чтобы разряды чисел выстроились друг под другом; вертикальное выравнивание задавайте осознанно.",
            },
            source: { code: AlignmentsSource, language: "tsx" },
        },
    },
};

export const CellTypes: Story = {
    render: CellTypesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "`cellType` задаёт внутренние отступы ячейки и способ вывода контента. `ECellType.TEXT` (по умолчанию) оборачивает значение в `Text`, `ECellType.COMPONENTS` и `ECellType.CHECKBOX` выводят переданную разметку как есть.",
            },
            source: { code: CellTypesSource, language: "tsx" },
        },
    },
};

export const Sorting: Story = {
    render: SortingRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Сортировка включается для колонки, у которой задан `orderDirection`, при наличии обработчика `onOrderBy`. Компонент не сортирует данные сам: он вызывает `onOrderBy` со следующим направлением по циклу `none → asc → desc → none`, а сортировку выполняет потребитель.",
            },
            source: { code: SortingSource, language: "tsx" },
        },
    },
};

export const Headless: Story = {
    render: HeadlessRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "`headless` убирает шапку таблицы — остаются только строки." },
            source: { code: HeadlessSource, language: "tsx" },
        },
    },
};

export const HighlightRowOnHover: Story = {
    render: HighlightRowOnHoverRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "`highlightRowOnHover` подсвечивает строку под курсором. Отдельно передавать его не нужно, если задан `onClickRow` — кликабельные строки подсвечиваются всегда.",
            },
            source: { code: HighlightRowOnHoverSource, language: "tsx" },
        },
    },
};

export const ClickableRows: Story = {
    render: ClickableRowsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "`onClickRow` получает `rowKey` строки. Выделение строки — это флаг `selected` в данных строки, компонент сам его не проставляет.",
            },
            source: { code: ClickableRowsSource, language: "tsx" },
        },
    },
};

export const NoData: Story = {
    render: NoDataRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Когда `data` пустой, вместо строк выводится результат обязательного `renderNoData`.",
            },
            source: { code: NoDataSource, language: "tsx" },
        },
    },
};

export const NoColumns: Story = {
    render: NoColumnsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Если пользователь скрыл все колонки (каждый элемент `columns` имеет `hidden`), вместо таблицы выводится `renderNoColumns`. Без этого prop'а таблица остаётся на месте, но не рендерит ни одной ячейки.",
            },
            source: { code: NoColumnsSource, language: "tsx" },
        },
    },
};

export const Loading: Story = {
    render: LoadingRender,
    decorators: freezeAnimations,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Состояние загрузки задаётся на `MasterTable` и доходит до таблицы через контекст. Поверх уже загруженных данных показывается полупрозрачный лоадер, при пустой таблице — лоадер вместо заглушки.",
            },
            source: { code: LoadingSource, language: "tsx" },
        },
    },
};

export const TableSpan: Story = {
    render: TableSpanRender,
    parameters: {
        docs: {
            description: { story: "Пример таблицы с объединёнными ячейками." },
            source: { code: TableSpanSource, language: "tsx" },
        },
        controls: { disable: true },
    },
};

export const TableSettingsColumn: Story = {
    render: TableSettingsColumnRender,
    parameters: {
        docs: {
            description: {
                story: "Базовая настройка колонок. Реализуется через компоненты TableBasicSettings, ColumnSettings и CheckboxYGroup. Отображение колонки зависит от свойства hidden в объекте, описывающем column.",
            },
            source: { code: TableSettingsColumnSource, language: "tsx" },
        },
        controls: { disable: true },
    },
};

export const TableSettingsColumnExtended: Story = {
    render: TableSettingsColumnExtendedRender,
    parameters: {
        docs: {
            description: {
                story: "Расширенная настройка колонок. Позволяет скрывать/показывать не только колонки, но и элементы внутри колонок. Отображение колонки зависит от свойства hidden в объекте, описывающем column. Логика отображения элементов внутри колонок всегда кастомная, это только один из возможных вариантов.",
            },
            source: { code: TableSettingsColumnExtendedSource, language: "tsx" },
        },
        controls: { disable: true },
    },
};

export const TableWithPagination: Story = {
    render: TableWithPaginationRender,
    parameters: {
        docs: {
            description: {
                story: "Таблица с пагинацией, когда известно количество данных, в текущей реализации это 300 строк. Реализуется через компоненты PaginationPanel и Pagination.",
            },
            source: { code: TableWithPaginationSource, language: "tsx" },
        },
        controls: { disable: true },
    },
};

export const TableWithPaginationLoading: Story = {
    render: TableWithPaginationLoadingRender,
    decorators: freezeAnimations,
    parameters: {
        docs: {
            description: {
                story: "Фильтры, таблица и пагинация в одном MasterTable, зафиксированные в состоянии загрузки. Лоадер перекрывает только таблицу: фильтры остаются доступны, а пагинация остаётся видимой, но её кнопки и селект становятся disabled.",
            },
            source: { code: TableWithPaginationLoadingSource, language: "tsx" },
        },
        controls: { disable: true },
    },
};

export const TableWithPaginationExtended: Story = {
    render: TableWithPaginationExtendedRender,
    parameters: {
        docs: {
            description: {
                story: "Таблица с PaginationExtended, можно использовать, когда заранее неизвестно количество данных.",
            },
            source: { code: TableWithPaginationExtendedSource, language: "tsx" },
        },
        controls: { disable: true },
    },
};

export const ExampleProduction: Story = {
    name: "Example: production",
    render: ExampleProductionRender,
    parameters: {
        docs: {
            description: {
                story: "Пример, приближённый к production. Статусная панель чипов (ChipPanel) работает как segmented control — активен только один чип. Ниже расположены быстрые фильтры (ChipMultiselect «Статус» и поле «Получатель»), а ссылка «Фильтры» раскрывает дополнительные поля — выбор получателя из списка и номер документа. Дополнительные фильтры применяются только по кнопке «Применить»: панель закрывается, а применённые значения показываются тегами, каждый из которых можно снять. Кнопка «Сбросить» очищает поля панели, а ссылка «Сбросить всё» появляется только при применённых дополнительных фильтрах и сбрасывает все фильтры.",
            },
            source: { code: ExampleProductionSource, language: "tsx" },
        },
        controls: { disable: true },
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
};
