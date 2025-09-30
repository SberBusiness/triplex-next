import React from "react";
import { ITableBasicColumn, ITableBasicRow } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { TableBasicRow } from "@sberbusiness/triplex-next/components/Table/TableBasic/components/TableBasicRow";
import { clsx } from "clsx";
import styles from "../styles/TableBasic.module.less";

/**
 * @prop {ITableBasicColumn} columns Структура заголовков таблицы.
 * @prop {ITableBasicRow[]} data Массив значений для вывода в теле таблицы.
 * @prop {boolean} [highlightRowOnHover] Подсветка строк при наведении мышки.
 * @prop {Function} [onClickRow] Функция обработки клика по строке таблицы.
 */
export interface ITableBasicBodyProps {
    columns: ITableBasicColumn[];
    data: ITableBasicRow[];
    highlightRowOnHover?: boolean;
    onClickRow?: (rowKey: string) => void;
}

/** Компонент тела таблицы. */
export const TableBasicBody = ({ columns, data, highlightRowOnHover, onClickRow }: ITableBasicBodyProps) => {
    if (data.length === 0) {
        return null;
    }

    const clickEnabled = Boolean(onClickRow);
    const hoverable = clickEnabled || Boolean(highlightRowOnHover);
    const className = clsx({
        [styles.clickable]: clickEnabled,
        [styles.hoverable]: hoverable,
    });

    const rows = data.map((rowData) => (
        <TableBasicRow columns={columns} data={rowData} onClickRow={onClickRow} key={rowData.rowKey} />
    ));
    return <tbody className={className}>{rows}</tbody>;
};

TableBasicBody.displayName = "TableBasicBody";
