import React from "react";
import { clsx } from "clsx";
import styles from "../styles/TableFooter.module.less";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { Link, ILinkCommonProps } from "@sberbusiness/triplex-next/components/Link/Link";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";

/** Свойства компонента TableFooterSummarySelectAllButton. */
export interface ITableFooterSummarySelectAllButtonProps extends ILinkCommonProps {}

/** Кнопка в подвале таблицы, для выбора всех элементов списка. */
export const TableFooterSummarySelectAllButton: React.FC<ITableFooterSummarySelectAllButtonProps> = ({
    children,
    className,
    onClick,
    ...rest
}) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onClick?.(event);
    };
    return (
        <Text size={ETextSize.B3}>
            <Link
                {...rest}
                href="#"
                className={clsx(styles.tableFooterSummarySelectAllButton, className)}
                onClick={handleClick}
            >
                {children}
            </Link>
        </Text>
    );
};

TableFooterSummarySelectAllButton.displayName = "TableFooterSummarySelectAllButton";
