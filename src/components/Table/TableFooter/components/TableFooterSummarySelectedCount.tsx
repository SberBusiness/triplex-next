import React from "react";
import styles from "../styles/TableFooter.module.less";

/** Свойства компонента TableFooterSummarySelectedCount. */
export interface ITableFooterSummarySelectedCountProps {
    children?: React.ReactNode;
}

/** Компонент в подвале таблицы, в котором информация о количестве выбранных позиций. */
export const TableFooterSummarySelectedCount: React.FC<ITableFooterSummarySelectedCountProps> = ({ children }) => (
    <span className={styles.tableFooterSummarySelectedCount}>{children}</span>
);

TableFooterSummarySelectedCount.displayName = "TableFooterSummarySelectedCount";
