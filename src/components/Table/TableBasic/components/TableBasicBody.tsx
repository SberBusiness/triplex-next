import React from "react";
import { ITableBasicColumn, ITableBasicRow } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { TableBasicRow } from "@sberbusiness/triplex-next/components/Table/TableBasic/components/TableBasicRow";
import { clsx } from "clsx";
import styles from "../styles/TableBasic.module.less";

/** Свойства компонента TableBasicBody. */
export interface ITableBasicBodyProps {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Массив значений для вывода в теле таблицы. */
    data: ITableBasicRow[];
    /** Подсветка строк при наведении мышки. */
    highlightRowOnHover?: boolean;
    /** Функция обработки клика по строке таблицы. */
    onClickRow?: (rowKey: string) => void;
}

/** Компонент тела таблицы. */
export const TableBasicBody = ({ columns, data, highlightRowOnHover, onClickRow }: ITableBasicBodyProps) => {
    if (data.length === 0) {
        return null;
    }

    const clickEnabled = Boolean(onClickRow);
    // Кликабельные строки подсвечиваются при наведении всегда, без отдельного highlightRowOnHover.
    const hoverable = clickEnabled || Boolean(highlightRowOnHover);
    const className = clsx({
        [styles.clickable]: clickEnabled,
        [styles.hoverable]: hoverable,
    });

    return (
        <tbody className={className}>
            {data.map((rowData) => (
                <TableBasicRow columns={columns} data={rowData} onClickRow={onClickRow} key={rowData.rowKey} />
            ))}
        </tbody>
    );
};

TableBasicBody.displayName = "TableBasicBody";
