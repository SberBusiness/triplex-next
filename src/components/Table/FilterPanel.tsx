import React from "react";
import { clsx } from "clsx";
import styles from "./styles/FilterPanel.module.less";
import { IFilterPanelProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

/** Компонент панели под элементы фильтрации данных для таблицы. */
export const FilterPanel: React.FC<IFilterPanelProps> = ({ children, className, ...htmlDivAttributes }) => (
    <div
        className={clsx(styles.filterPanel, className)}
        {...htmlDivAttributes}
        data-tx={process.env.npm_package_version}
    >
        {children}
    </div>
);

FilterPanel.displayName = "FilterPanel";
