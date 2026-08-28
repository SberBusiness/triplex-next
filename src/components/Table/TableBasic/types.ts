import React from "react";
import { TAriaHTMLAttributes } from "@sberbusiness/triplex-next/utils/html/AriaAttributes";
import { TDataHTMLAttributes } from "@sberbusiness/triplex-next/utils/html/DataAttributes";
import { IButtonDropdownExtendedProps } from "@sberbusiness/triplex-next/components/Button/ButtonDropdownExtended";
import {
    ECellType,
    EHorizontalAlign,
    EOrderDirection,
    EVerticalAlign,
} from "@sberbusiness/triplex-next/components/Table/TableBasic/enums";
import { IListProps } from "@sberbusiness/triplex-next/components/List/List";
import { IListItemProps } from "@sberbusiness/triplex-next/components/List/components/ListItem";
import { IListSortableProps } from "@sberbusiness/triplex-next/components/List/ListSortable";

/** Интерфейс колонки. */
export interface ITableBasicColumn {
    /** Ключ поля в rowData, значение которого выводится в ячейках этого столбца. */
    fieldKey: string;
    /** Контент заголовка столбца. */
    label?: string | React.ReactNode;
    /** Заголовок столбца при наведении указателя. */
    title?: string;
    /** Текущее направление сортировки. Наличие значения включает кнопку сортировки, если передан onOrderBy. */
    orderDirection?: EOrderDirection;
    /** Горизонтальное выравнивание. По умолчанию EHorizontalAlign.LEFT. */
    horizontalAlign?: EHorizontalAlign;
    /** Вертикальное выравнивание. По умолчанию BASELINE для ECellType.TEXT и TOP для остальных типов. */
    verticalAlign?: EVerticalAlign;
    /** Тип ячейки, задаёт внутренние отступы и обёртку контента. По умолчанию ECellType.TEXT. */
    cellType?: ECellType;
    /** Ширина колонки (включая боковые внутренние отступы), пример значений 10|'10%'. */
    width?: string | number;
    /** Столбец скрыт. */
    hidden?: boolean;
    /** Функция рендера ячейки. Получает значение поля fieldKey из rowData текущей строки. */
    // Тип значения ячейки задаёт потребитель в rowData, библиотека его не знает. Сужение до unknown — breaking change.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderCell?: (param: any) => React.ReactNode;
    /** Data-атрибуты. */
    dataAttributes?: TDataHTMLAttributes;
    /** Aria-атрибуты. */
    ariaAttributes?: TAriaHTMLAttributes;
}

/** Порядок сортировки. */
export interface ISortOrder {
    /** По какому столбцу производить сортировку. */
    fieldKey: string;
    /** Направление сортировки. */
    direction: EOrderDirection;
}

/** Свойства объединенной ячейки в строке. */
export interface ITableRowCellSpanProps {
    /** Число ячеек для объединения по вертикали. */
    rowSpan?: number;
    /** Число ячеек для объединения по горизонтали. */
    colSpan?: number;
}

/** Интерфейс данных для строки. */
export interface ITableBasicRow {
    /** Уникальный ключ строки. Передаётся в onClickRow и используется как React-key. */
    rowKey: string;
    /** Данные строки в виде объекта: ключ — fieldKey колонки, значение — содержимое ячейки. */
    // TODO пока нет архитектурного понимания о его структуре/типизации.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rowData: any;
    /** Информация об объединенных ячейках в виде объекта. Ключ — fieldKey колонки. */
    rowLayout?: Record<string, ITableRowCellSpanProps>;
    /** Выбрана ли строка для массового действия. */
    selected?: boolean;
    /** Data-атрибуты строки. */
    dataAttributes?: TDataHTMLAttributes;
    /** Aria-атрибуты строки. */
    ariaAttributes?: TAriaHTMLAttributes;
}

/** Свойства компонента TableBasic. Остальные HTML-атрибуты попадают на элемент table. */
export interface ITableBasicProps extends React.HTMLAttributes<HTMLTableElement> {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Массив значений для вывода в таблице, если пустой - выводится сообщение. */
    data: ITableBasicRow[];
    /** Функция рендера при отсутствии данных в таблице. */
    renderNoData: () => React.ReactNode;
    /**
     * Функция рендера при скрытии пользователем всех колонок в таблице.
     * Вызывается вместо таблицы, когда каждый элемент columns имеет свойство hidden.
     * */
    renderNoColumns?: () => React.ReactNode;
    /** Подсветка строк при наведении мышки. По умолчанию false; при заданном onClickRow подсветка включена всегда. */
    highlightRowOnHover?: boolean;
    /** Обработчик сортировки. Вызывается со следующим направлением сортировки по циклу none → asc → desc → none. */
    onOrderBy?: (order: ISortOrder) => void;
    /** Функция обработки клика по строке таблицы. Получает rowKey строки. */
    onClickRow?: (rowKey: string) => void;
    /** Скрытие шапки таблицы. По умолчанию false. */
    headless?: boolean;
}

/** Свойства компонента MasterTable. */
export interface IMasterTableProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние загрузки. */
    loading?: boolean;
}

/** Свойства компонента NoColumns. */
export interface INoColumnsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента FilterPanel. */
export interface IFilterPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента ChipPanel. */
export interface IChipPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ITableBasicSettingsProps extends Omit<
    IButtonDropdownExtendedProps,
    "renderDropdown" | "renderButton" | "dropdownRef"
> {
    /** Название кнопки. */
    linkTitle: string;
    children?: React.ReactNode;
}

/** Свойства компонента TableFooter. */
export interface ITableFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента PaginationPanel. */
export interface IPaginationPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента ChipPanelLinks. */
export interface IChipPanelLinksProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

/** Свойства компонента FooterDescriptionControls. */
export interface IFooterDescriptionControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента TableFooterSummary. */
export interface ITableFooterSummaryProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента TableBasicSettingsHeader. */
export interface ITableBasicSettingsHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

/** Свойства компонента TableBasicSettingsFooter. */
export interface ITableBasicSettingsFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента ColumnSettings. */
export interface IColumnSettingsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Дочерние элементы. */
    children?: React.ReactNode | (({ columns }: { columns: ITableBasicColumn[] }) => React.ReactNode);
}

/** Свойства компонента ColumnSettingsStaticList */
export interface IColumnSettingsStaticListProps extends IListProps {
    /** Глубина списка. */
    depth?: number;
}

/** Свойства компонента ColumnSettingsStaticList. */
export interface IColumnSettingsStaticListItemProps extends IListItemProps {}

/** Свойства компонента ColumnSettingsSortableList. */
export interface IColumnSettingsSortableListProps extends Omit<IListSortableProps<never>, "items" | "onItemsChange"> {
    columns: ITableBasicColumn[];
    onColumnsChange: (columns: ITableBasicColumn[]) => void;
}

/** Расширенный интерфейс ITableBasicColumn для компонента ListSortable. */
export interface ITableBasicExtendedColumn extends ITableBasicColumn {
    /** Уникальный идентификатор. */
    id: string;
}

/** Свойства компонента TableBasicSettingsBody. */
export interface ITableBasicSettingsBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
