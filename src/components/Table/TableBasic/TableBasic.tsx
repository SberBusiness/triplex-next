import React, { useContext, useEffect } from "react";
import isEqual from "lodash-es/isEqual";
import { MasterTableContext } from "@sberbusiness/triplex-next/components/Table/MasterTableContext";
import styles from "./styles/TableBasic.module.less";
import { TableBasicHeader } from "@sberbusiness/triplex-next/components/Table/TableBasic/components/TableBasicHeader";
import { TableBasicBody } from "@sberbusiness/triplex-next/components/Table/TableBasic/components/TableBasicBody";
import { ITableBasicProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { MasterTableContentContext } from "@sberbusiness/triplex-next/components/Table/MasterTableContentContext";

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
    const { loading } = useContext(MasterTableContentContext);
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

    const renderFooter = (isEmptyData: boolean) =>
        isEmptyData ? <div className={styles.footerEmptyData}>{loading ? null : renderNoData()}</div> : null;

    return (
        <div className={styles.tableBasic}>
            {renderTable()}
            {renderFooter(isEmptyData)}
        </div>
    );
};

TableBasic.displayName = "TableBasic";
