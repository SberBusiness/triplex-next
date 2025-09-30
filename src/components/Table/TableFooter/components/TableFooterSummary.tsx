import React, { FC } from "react";
import { FooterDescription } from "@sberbusiness/triplex-next/components/Footer/components/FooterDescription";
import { TableFooterSummaryAmount } from "@sberbusiness/triplex-next/components/Table/TableFooter/components/TableFooterSummaryAmount";
import { TableFooterSummarySelectedCount } from "@sberbusiness/triplex-next/components/Table/TableFooter/components/TableFooterSummarySelectedCount";
import { TableFooterSummarySelectAllButton } from "@sberbusiness/triplex-next/components/Table/TableFooter/components/TableFooterSummarySelectAllButton";
import styles from "../styles/TableFooter.module.less";
import { ITableFooterSummaryProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

/** Компонент суммарной информации в подвале таблицы. */
export const TableFooterSummary: FC<ITableFooterSummaryProps> = Object.assign(
    ({ children, ...htmlDivAttributes }: ITableFooterSummaryProps) => {
        return (
            <FooterDescription.Content {...htmlDivAttributes}>
                <div className={styles.tableFooterSummary}>{children}</div>
            </FooterDescription.Content>
        );
    },
    {
        Amount: TableFooterSummaryAmount,
        SelectedCount: TableFooterSummarySelectedCount,
        SelectAllButton: TableFooterSummarySelectAllButton,
    },
);

TableFooterSummary.displayName = "TableFooterSummary";
