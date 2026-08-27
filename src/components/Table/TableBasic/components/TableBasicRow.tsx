import React from "react";
import { getAriaHTMLAttributes } from "@sberbusiness/triplex-next/utils/html/AriaAttributes";
import { getDataHTMLAttributes } from "@sberbusiness/triplex-next/utils/html/DataAttributes";
import { DataTestId } from "@sberbusiness/triplex-next/consts/DataTestId";
import { clsx } from "clsx";
import styles from "../styles/TableBasic.module.less";
import {
    mapCellTypeToClassName,
    mapHorizontalAlignToClassName,
    mapVerticalAlignToClassName,
} from "@sberbusiness/triplex-next/components/Table/utils";
import {
    ITableBasicColumn,
    ITableBasicRow,
    ITableRowCellSpanProps,
} from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { ECellType, EVerticalAlign } from "@sberbusiness/triplex-next/components/Table/TableBasic/enums";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";

/** Свойства компонента TableBasicRow. */
interface ITableBasicRowProps {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Значение для вывода в строке. */
    data: ITableBasicRow;
    /** Функция обработки клика по строке таблицы. */
    onClickRow?: (rowKey: string) => void;
}

/** Рендер содержимого ячейки: типы CHECKBOX и COMPONENTS выводятся как есть, остальные оборачиваются в Text. */
const renderCellContent = (cellNode: React.ReactNode, cellType: ECellType) => {
    if (!cellNode) {
        return (
            <Text size={ETextSize.B3} tag="div">
                ---
            </Text>
        );
    }

    if (cellType === ECellType.CHECKBOX || cellType === ECellType.COMPONENTS) {
        return cellNode;
    }

    return (
        <Text size={ETextSize.B3} tag="div">
            {cellNode}
        </Text>
    );
};

/** Компонент строки в теле таблицы. */
export const TableBasicRow = ({ columns, data, onClickRow }: ITableBasicRowProps) => {
    const { rowKey, rowData, rowLayout, ariaAttributes, dataAttributes, selected = false } = data;

    const classNameTr = clsx({ [styles.selected]: selected, selected });
    const dataTestId = dataAttributes?.["test-id"];

    const renderTd = (column: ITableBasicColumn, value: React.ReactNode, spanProps?: ITableRowCellSpanProps) => {
        // Столбец скрыт.
        if (column.hidden) {
            return null;
        }

        const cellNode: React.ReactNode = column.renderCell ? column.renderCell(value) : value;
        const cellType = column.cellType ?? ECellType.TEXT;
        // Текст выравнивается по базовой линии, произвольная разметка — по верхнему краю ячейки.
        const verticalAlign =
            column.verticalAlign ?? (cellType === ECellType.TEXT ? EVerticalAlign.BASELINE : EVerticalAlign.TOP);
        const classNames = clsx(
            mapCellTypeToClassName(cellType),
            mapHorizontalAlignToClassName(column.horizontalAlign),
            mapVerticalAlignToClassName(verticalAlign),
        );

        return (
            <td
                key={column.fieldKey}
                className={classNames}
                {...spanProps}
                data-test-id={dataTestId && `${dataTestId}__${column.fieldKey}${DataTestId.Table.TableBasic.td}`}
                style={column.width ? { width: column.width } : undefined}
            >
                {renderCellContent(cellNode, cellType)}
            </td>
        );
    };

    return (
        <tr
            className={classNameTr}
            onClick={onClickRow ? () => onClickRow(rowKey) : undefined}
            {...(ariaAttributes && getAriaHTMLAttributes(ariaAttributes))}
            {...(dataAttributes && getDataHTMLAttributes(dataAttributes))}
        >
            {columns.map((column) =>
                // Ячейка рендерится, только если в данных строки есть соответствующий ключ.
                Object.keys(rowData).includes(column.fieldKey)
                    ? renderTd(column, rowData[column.fieldKey], rowLayout?.[column.fieldKey])
                    : null,
            )}
        </tr>
    );
};

TableBasicRow.displayName = "TableBasicRow";
