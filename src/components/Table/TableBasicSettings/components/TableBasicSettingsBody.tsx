import React from "react";
import { clsx } from "clsx";
import { ITableBasicSettingsBodyProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import styles from "../styles/TableBasicSettingsBody.module.less";

export const TableBasicSettingsBody = React.forwardRef<HTMLDivElement, ITableBasicSettingsBodyProps>(
    ({ children, className, ...htmlDivAttributes }, ref) => (
        <div className={clsx(styles.tableBasicSettingsBody, className)} ref={ref} {...htmlDivAttributes}>
            {children}
        </div>
    ),
);

TableBasicSettingsBody.displayName = "TableBasicSettingsBody";
