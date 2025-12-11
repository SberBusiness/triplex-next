import React, { useContext, useEffect } from "react";
import isEqual from "lodash-es/isEqual";
import { MasterTableContext } from "@sberbusiness/triplex-next/components/Table/MasterTableContext";
import styles from "./styles/TableBasic.module.less";
import { TableBasicHeader } from "@sberbusiness/triplex-next/components/Table/TableBasic/components/TableBasicHeader";
import { TableBasicBody } from "@sberbusiness/triplex-next/components/Table/TableBasic/components/TableBasicBody";
import { ITableBasicProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { LoaderMiddle } from "@sberbusiness/triplex-next/components/Loader/LoaderMiddle/LoaderMiddle";
import { LoaderScreen } from "@sberbusiness/triplex-next/components/LoaderScreen/LoaderScreen";

/** Компонент обычной таблицы. */
export const TableBasic = ({
    columns,
    data,
    highlightRowOnHover,
    onOrderBy,
    onClickRow,
    renderNoColumns,
    renderNoData,
    headless,
    ...htmlTableAttributes
}: ITableBasicProps) => {
    const context = useContext(MasterTableContext);
    const isEmptyData = data.length === 0;

    useEffect(() => {
        if (!isEqual(columns, context.columns)) {
            context.setColumns(columns);
        }
    }, [columns, context]);

    const renderTable = () => {
        if (columns.every((c) => c.hidden) && renderNoColumns) {
            return renderNoColumns();
        }

        return (
            <table key="table" {...htmlTableAttributes}>
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

    const renderFooter = (isEmptyData: boolean) => {
        const { loading } = context;

        if (loading && isEmptyData) {
            return renderFooterEmptyData(renderNoDataLoading());
        } else if (!loading && isEmptyData) {
            return renderFooterEmptyData(renderNoData());
        } else if (loading && !isEmptyData) {
            return (
                <div className={styles.spinnerWrapper}>
                    <LoaderScreen type="middle" className={styles.tableLoaderScreen} />
                </div>
            );
        } else {
            return null;
        }
    };

    const renderFooterEmptyData = (content: React.JSX.Element | React.JSX.Element[]) => (
        <div className={styles.footerEmptyData}>{content}</div>
    );
    const renderNoDataLoading = () => [
        <div className={styles.overlayCover} key="overlay" />,
        <LoaderMiddle key="spinner" />,
    ];

    return (
        <div className={styles.tableBasic}>
            {renderTable()}
            {renderFooter(isEmptyData)}
        </div>
    );
};

TableBasic.displayName = "TableBasic";
