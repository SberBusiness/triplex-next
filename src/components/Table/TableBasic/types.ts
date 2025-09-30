/* eslint-disable @typescript-eslint/no-explicit-any */
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
    /** По какому столбцу производить сортировку. */
    fieldKey: string;
    /** Контент заголовка столбца. */
    label?: string | React.JSX.Element;
    /** Заголовок столбца при наведении указателя. */
    title?: string;
    /** Порядок сортировки. */
    orderDirection?: EOrderDirection;
    /** Горизонтальное выравнивание. */
    horizontalAlign?: EHorizontalAlign;
    /** Вертикальное выравнивание. */
    verticalAlign?: EVerticalAlign;
    /** Тип ячейки. */
    cellType?: ECellType;
    /** Ширина колонки (включая боковые внутренние отступы), пример значений 10|'10%'. */
    width?: string | number;
    /** Столбец скрыт. */
    hidden?: boolean;
    /** Функция рендера ячейки. */
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
    /** Идентификатор сортировки. */
    rowKey: string;
    /** Данные строки в виде объекта. */
    rowData: any; // TODO пока нет архитектурного понимания о его структуре/типизации.
    /** Информация об объединенных ячейках в виде объекта. */
    rowLayout?: Record<string, ITableRowCellSpanProps>;
    /** Выбрана ли строка для массового действия. */
    selected?: boolean;
    /** Aria-атрибуты. */
    dataAttributes?: TDataHTMLAttributes;
    /** Data-атрибуты. */
    ariaAttributes?: TAriaHTMLAttributes;
}

export interface ITableBasicProps extends React.HTMLAttributes<HTMLTableElement> {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Массив значений для вывода в таблице, если пустой - выводится сообщение. */
    data: ITableBasicRow[];
    /** Функция рендера при отсутствии данных в таблице. */
    renderNoData: () => React.JSX.Element;
    /**
     * Функция рендера при скрытии пользователем всех колонок в таблице.
     * Вызывается, когда каждый элемент columns имеет свойство hidden.
     * */
    renderNoColumns?: () => React.ReactNode;
    /** Подсветка строк при наведении мышки. */
    highlightRowOnHover?: boolean;
    /** Обработчик сортировки. */
    onOrderBy?: (order: ISortOrder) => void;
    /** Функция обработки клика по строке таблицы. */
    onClickRow?: (rowKey: string) => void;
    /** Скрытие шапки. */
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

/** Свойства компонента TabsLinePanel. */
export interface ITabsLinePanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ITableBasicSettingsProps
    extends Omit<IButtonDropdownExtendedProps, "renderDropdown" | "renderButton" | "dropdownRef"> {
    /** Название кнопки. */
    linkTitle: string;
    children?: React.ReactNode;
}

/** Свойства компонента TableFooter. */
export interface ITableFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента PaginationPanel. */
export interface IPaginationPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента TabsLinePanelLinks. */
export interface ITabsLinePanelLinksProps extends React.HTMLAttributes<HTMLDivElement> {
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
