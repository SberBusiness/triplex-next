import React from "react";
import { clsx } from "clsx";
import { ITableBasicSettingsFooterProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import styles from "../styles/TableBasicSettingsFooter.module.less";

export const TableBasicSettingsFooter = React.forwardRef<HTMLDivElement, ITableBasicSettingsFooterProps>(
    ({ children, className, ...htmlDivAttributes }, ref) => (
        <div className={clsx(styles.tableBasicSettingsFooter, className)} ref={ref} {...htmlDivAttributes}>
            {children}
        </div>
    ),
);

TableBasicSettingsFooter.displayName = "TableBasicSettingsFooter";
