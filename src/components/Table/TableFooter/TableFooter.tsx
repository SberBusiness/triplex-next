import React from "react";
import { clsx } from "clsx";
import styles from "./styles/TableFooter.module.less";
import { FooterDescription } from "@sberbusiness/triplex-next/components/Footer/components/FooterDescription";
import { FooterDescriptionControls } from "@sberbusiness/triplex-next/components/Footer/components/FooterDescriptionControls";
import { TableFooterSummary } from "@sberbusiness/triplex-next/components/Table/TableFooter/components/TableFooterSummary";
import { ITableFooterProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

/**
 * Статические субкомпоненты TableFooter.
 *
 * Явная аннотация снимает проверку лишних свойств у Object.assign, поэтому при добавлении
 * или удалении статики этот интерфейс нужно править синхронно: иначе новая статика окажется
 * в рантайме, но не попадёт в публичный тип, и TypeScript промолчит.
 */
interface ITableFooterComposition extends React.ForwardRefExoticComponent<
    ITableFooterProps & React.RefAttributes<HTMLDivElement>
> {
    /** Блок с итоговыми значениями по таблице. */
    Summary: typeof TableFooterSummary;
    /** Блок с кнопками действий над выбранными строками. */
    Controls: typeof FooterDescriptionControls;
}

/** Компонент подвала таблицы. */
export const TableFooter: ITableFooterComposition = Object.assign(
    React.forwardRef<HTMLDivElement, ITableFooterProps>(({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.tableFooterWrapper, className)} {...rest} ref={ref}>
            <div className={styles.tableFooterShadow} />
            <div className={styles.tableFooter}>
                <FooterDescription>{children}</FooterDescription>
            </div>
        </div>
    )),
    {
        Summary: TableFooterSummary,
        Controls: FooterDescriptionControls,
    },
);

TableFooter.displayName = "TableFooter";
