import React, { useContext, useEffect } from "react";
import isEqual from "lodash-es/isEqual";
import { MasterTableContext } from "@sberbusiness/triplex-next/components/Table/MasterTableContext";
import styles from "./styles/TableBasic.module.less";
import { TableBasicHeader } from "@sberbusiness/triplex-next/components/Table/TableBasic/components/TableBasicHeader";
import { TableBasicBody } from "@sberbusiness/triplex-next/components/Table/TableBasic/components/TableBasicBody";
import { ITableBasicProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { LoaderMiddle } from "@sberbusiness/triplex-next/components/Loader/LoaderMiddle/LoaderMiddle";
import { LoaderScreen } from "@sberbusiness/triplex-next/components/LoaderScreen/LoaderScreen";

/**
 * Компонент обычной таблицы.
 * Состояние загрузки и общий для таблицы набор колонок берутся из контекста MasterTable.
 * Ref пробрасывается на элемент table — туда же, куда попадают остальные HTML-атрибуты.
 */
export const TableBasic = React.forwardRef<HTMLTableElement, ITableBasicProps>(
    (
        {
            columns,
            data,
            highlightRowOnHover,
            onOrderBy,
            onClickRow,
            renderNoColumns,
            renderNoData,
            headless,
            ...htmlTableAttributes
        },
        ref,
    ) => {
        const { columns: contextColumns, loading, setColumns } = useContext(MasterTableContext);
        const isEmptyData = data.length === 0;

        useEffect(() => {
            if (!isEqual(columns, contextColumns)) {
                setColumns(columns);
            }
        }, [columns, contextColumns, setColumns]);

        /** Рендер таблицы или заглушки, если пользователь скрыл все колонки. */
        const renderTable = () => {
            if (columns.every((column) => column.hidden) && renderNoColumns) {
                return renderNoColumns();
            }

            return (
                <table key="table" {...htmlTableAttributes} ref={ref}>
                    {headless || <TableBasicHeader columns={columns} onOrderBy={onOrderBy} />}
                    <TableBasicBody
                        columns={columns}
                        data={data}
                        onClickRow={onClickRow}
                        highlightRowOnHover={highlightRowOnHover}
                    />
                </table>
            );
        };

        /** Рендер подвала: заглушка при отсутствии данных и индикаторы загрузки. */
        const renderFooter = () => {
            if (loading && isEmptyData) {
                return (
                    <div className={styles.footerEmptyData}>
                        <div className={styles.overlayCover} />
                        <LoaderMiddle />
                    </div>
                );
            }

            if (isEmptyData) {
                return <div className={styles.footerEmptyData}>{renderNoData()}</div>;
            }

            if (loading) {
                return (
                    <div className={styles.spinnerWrapper}>
                        <LoaderScreen type="middle" className={styles.tableLoaderScreen} />
                    </div>
                );
            }

            return null;
        };

        return (
            <div className={styles.tableBasic}>
                {renderTable()}
                {renderFooter()}
            </div>
        );
    },
);

TableBasic.displayName = "TableBasic";
