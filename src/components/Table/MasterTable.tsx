import React, { useMemo, useState } from "react";
import {
    IMasterTableContextContext,
    MasterTableContext,
} from "@sberbusiness/triplex-next/components/Table/MasterTableContext";
import styles from "./styles/MasterTable.module.less";
import { clsx } from "clsx";
import { NoColumns } from "@sberbusiness/triplex-next/components/Table/NoColumns";
import { IMasterTableProps, ITableBasicColumn } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { FilterPanel } from "@sberbusiness/triplex-next/components/Table/FilterPanel";
import { ChipPanel } from "@sberbusiness/triplex-next/components/Table/ChipPanel";
import { TableBasic } from "@sberbusiness/triplex-next/components/Table/TableBasic/TableBasic";
import { TableBasicSettings } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/TableBasicSettings";
import { TableFooter } from "@sberbusiness/triplex-next/components/Table/TableFooter/TableFooter";
import { PaginationPanel } from "@sberbusiness/triplex-next/components/Table/PaginationPanel";

/**
 * Статические субкомпоненты MasterTable. Тип задан через typeof-запросы, а не выведен:
 * TableBasicSettings и TableFooter типизированы неэкспортируемыми интерфейсами, и выведенный
 * тип Object.assign невозможно сгенерировать в d.ts (TS4023) — declaration emit падает.
 */
interface IMasterTableStatics {
    NoColumns: typeof NoColumns;
    FilterPanel: typeof FilterPanel;
    ChipPanel: typeof ChipPanel;
    TableBasic: typeof TableBasic;
    TableBasicSettings: typeof TableBasicSettings;
    TableFooter: typeof TableFooter;
    PaginationPanel: typeof PaginationPanel;
}

/**
 * Контейнер таблицы. Объединяет панели фильтров, саму таблицу, подвал и пагинацию,
 * раздавая им общее состояние (колонки и признак загрузки) через MasterTableContext.
 */
export const MasterTable: React.ForwardRefExoticComponent<IMasterTableProps & React.RefAttributes<HTMLDivElement>> &
    IMasterTableStatics = Object.assign(
    React.forwardRef<HTMLDivElement, IMasterTableProps>(function MasterTable(
        { children, className, loading = false, ...htmlDivAttributes },
        ref,
    ) {
        const [columns, setColumns] = useState<ITableBasicColumn[]>([]);

        const contextValue = useMemo<IMasterTableContextContext>(
            () => ({ columns, loading, setColumns }),
            [columns, loading],
        );

        return (
            <MasterTableContext.Provider value={contextValue}>
                <div
                    className={clsx(styles.masterTable, className)}
                    {...htmlDivAttributes}
                    data-tx={process.env.npm_package_version}
                    ref={ref}
                >
                    {children}
                </div>
            </MasterTableContext.Provider>
        );
    }),
    {
        NoColumns,
        FilterPanel,
        ChipPanel,
        TableBasic,
        TableBasicSettings,
        TableFooter,
        PaginationPanel,
    },
);

MasterTable.displayName = "MasterTable";
