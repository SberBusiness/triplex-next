import React from "react";
import { clsx } from "clsx";
import styles from "./styles/TableFooter.module.less";
import { FooterDescription } from "@sberbusiness/triplex-next/components/Footer/components/FooterDescription";
import { FooterDescriptionControls } from "@sberbusiness/triplex-next/components/Footer/components/FooterDescriptionControls";
import { TableFooterSummary } from "@sberbusiness/triplex-next/components/Table/TableFooter/components/TableFooterSummary";
import { ITableFooterProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

interface ITableFooterFC extends React.FC<ITableFooterProps> {
    Summary: typeof TableFooterSummary;
    Controls: typeof FooterDescriptionControls;
}

/** Компонент подвала таблицы. */
export const TableFooter: ITableFooterFC = ({ children, className, ...rest }) => (
    <div className={clsx(styles.tableFooterWrapper, className)} {...rest}>
        <div className={styles.tableFooter}>
            <FooterDescription>{children}</FooterDescription>
        </div>
    </div>
);

TableFooter.displayName = "TableFooter";
TableFooter.Summary = TableFooterSummary;
TableFooter.Controls = FooterDescriptionControls;
