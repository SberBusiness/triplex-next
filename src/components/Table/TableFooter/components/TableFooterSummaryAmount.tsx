import React from "react";
import styles from "../styles/TableFooter.module.less";
import { Amount } from "@sberbusiness/triplex-next/components/Amount/Amount";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";

export interface ITableFooterSummaryAmountProps {
    /** Текст лейбла.*/
    label: string;
    /** Сумма подытога.*/
    sum: string;
    /** Валюта подытога.*/
    currency: string;
}

/** Компонент подытога денежной суммы в подвале таблицы. */
export const TableFooterSummaryAmount: React.FC<ITableFooterSummaryAmountProps> = ({ label, sum, currency }) => {
    return (
        <Text size={ETextSize.B3} className={styles.tableFooterSummaryAmount}>
            <span className={styles.tableFooterSummaryDivider}>|</span>
            <span className={styles.tableFooterSummaryLabel}>
                {label} <Amount value={sum} currency={currency} />
            </span>
        </Text>
    );
};

TableFooterSummaryAmount.displayName = "TableFooterSummaryAmount";
