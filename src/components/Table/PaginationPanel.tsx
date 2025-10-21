import React from "react";
import { clsx } from "clsx";
import styles from "./styles/PaginationPanel.module.less";
import { IPaginationPanelProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

/** Компонент панели под элементы пагинации таблицы. */
export const PaginationPanel: React.FC<IPaginationPanelProps> = ({ children, className, ...htmlDivAttributes }) => (
    <div
        className={clsx(styles.paginationPanel, className)}
        {...htmlDivAttributes}
        data-tx={process.env.npm_package_version}
    >
        {children}
    </div>
);

PaginationPanel.displayName = "PaginationPanel";
