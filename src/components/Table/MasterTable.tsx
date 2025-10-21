import React, { useState } from "react";
import { MasterTableContext } from "@sberbusiness/triplex-next/components/Table/MasterTableContext";
import styles from "./styles/MasterTable.module.less";
import { clsx } from "clsx";
import { NoColumns } from "@sberbusiness/triplex-next/components/Table/NoColumns";
import { IMasterTableProps, ITableBasicColumn } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { FilterPanel } from "@sberbusiness/triplex-next/components/Table/FilterPanel";
import { TabsLinePanel } from "@sberbusiness/triplex-next/components/Table/TabsLinePanel";
import { TableBasic } from "@sberbusiness/triplex-next/components/Table/TableBasic/TableBasic";
import { TableBasicSettings } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/TableBasicSettings";
import { TableFooter } from "@sberbusiness/triplex-next/components/Table/TableFooter/TableFooter";
import { PaginationPanel } from "@sberbusiness/triplex-next/components/Table/PaginationPanel";

interface IMasterTableFC extends React.FC<IMasterTableProps> {
    NoColumns: typeof NoColumns;
    FilterPanel: typeof FilterPanel;
    TabsLinePanel: typeof TabsLinePanel;
    TableBasic: typeof TableBasic;
    TableBasicSettings: typeof TableBasicSettings;
    TableFooter: typeof TableFooter;
    PaginationPanel: typeof PaginationPanel;
}

export const MasterTable: IMasterTableFC = ({ children, className, loading = false, ...htmlDivAttributes }) => {
    const [columns, setColumns] = useState<ITableBasicColumn[]>([]);

    return (
        <MasterTableContext.Provider
            value={{
                columns,
                loading,
                setColumns,
            }}
        >
            <div
                className={clsx(styles.masterTable, className)}
                {...htmlDivAttributes}
                data-tx={process.env.npm_package_version}
            >
                {children}
            </div>
        </MasterTableContext.Provider>
    );
};

MasterTable.displayName = "MasterTable";
MasterTable.NoColumns = NoColumns;
MasterTable.FilterPanel = FilterPanel;
MasterTable.TabsLinePanel = TabsLinePanel;
MasterTable.TableBasic = TableBasic;
MasterTable.TableBasicSettings = TableBasicSettings;
MasterTable.TableFooter = TableFooter;
MasterTable.PaginationPanel = PaginationPanel;
