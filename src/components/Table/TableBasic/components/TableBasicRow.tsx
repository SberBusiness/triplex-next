import React from "react";
import { getAriaHTMLAttributes } from "@sberbusiness/triplex-next/utils/html/AriaAttributes";
import { getDataHTMLAttributes } from "@sberbusiness/triplex-next/utils/html/DataAttributes";
import { DataTestId } from "@sberbusiness/triplex-next/consts/DataTestId";
import { clsx } from "clsx";
import styles from "./../styles/TableBasic.module.less";
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

/** Свойства TableBasicRow. */
interface ITableBasicRowProps {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Значение для вывода в строке. */
    data: ITableBasicRow;
    /** Функция обработки клика по строке таблицы. */
    onClickRow?: (rowKey: string) => void;
}

/** Компонент строки в теле таблицы. */
export const TableBasicRow = ({ columns, data, onClickRow }: ITableBasicRowProps) => {
    const { rowKey, rowData, rowLayout, ariaAttributes, dataAttributes, selected = false } = data;

    const classNameTr = clsx({ [styles.selected]: selected, selected });
    const onClick = onClickRow ? () => onClickRow(rowKey) : undefined;
    const dataTestId = dataAttributes ? dataAttributes["test-id"] : undefined;

    const renderTd = (
        column: ITableBasicColumn,
        value: React.ReactNode,
        spanProps?: ITableRowCellSpanProps,
        dataTestId?: string,
    ) => {
        // Столбец скрыт.
        if (column.hidden) {
            return null;
        }

        const cellNode: React.ReactNode = column.renderCell ? column.renderCell(value) : value;
        const cellType = column.cellType ?? ECellType.TEXT;
        const verticalAlign =
            column.verticalAlign ?? (cellType === ECellType.TEXT ? EVerticalAlign.BASELINE : EVerticalAlign.TOP);
        const classNames = clsx(
            mapCellTypeToClassName(cellType),
            mapHorizontalAlignToClassName(column.horizontalAlign),
            mapVerticalAlignToClassName(verticalAlign),
        );
        const style = column.width ? { width: column.width } : undefined;

        const renderContent = () => {
            if (!cellNode) {
                return <Text size={ETextSize.B3}>---</Text>;
            }

            if (cellType === ECellType.CHECKBOX || cellType === ECellType.COMPONENTS) {
                return cellNode;
            }

            return <Text size={ETextSize.B3}>{cellNode}</Text>;
        };

        return (
            <td
                key={column.fieldKey}
                className={classNames}
                {...spanProps}
                data-test-id={dataTestId && `${dataTestId}__${column.fieldKey}${DataTestId.Table.TableBasic.td}`}
                style={style}
            >
                {renderContent()}
            </td>
        );
    };

    const tdList = columns.map((column) => {
        const { fieldKey } = column;

        if (Object.keys(rowData).indexOf(fieldKey) !== -1) {
            return renderTd(column, rowData[fieldKey], rowLayout?.[fieldKey], dataTestId);
        }
    });

    return (
        <tr
            className={classNameTr}
            onClick={onClick}
            {...(Boolean(ariaAttributes) && getAriaHTMLAttributes(ariaAttributes!))}
            {...(Boolean(dataAttributes) && getDataHTMLAttributes(dataAttributes!))}
        >
            {tdList}
        </tr>
    );
};

TableBasicRow.displayName = "TableBasicRow";
