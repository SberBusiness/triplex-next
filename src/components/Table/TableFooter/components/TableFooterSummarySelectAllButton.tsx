import React from "react";
import styles from "../styles/TableFooter.module.less";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { Link, ILinkCommonProps } from "@sberbusiness/triplex-next/components/Link/Link";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";

/** Свойства компонента TableFooterSummarySelectAllButton. */
export interface ITableFooterSummarySelectAllButtonProps extends ILinkCommonProps {}

/** Кнопка в подвале таблицы, для выбора всех элементов списка. */
export const TableFooterSummarySelectAllButton: React.FC<ITableFooterSummarySelectAllButtonProps> = ({
    children,
    onClick,
    ...rest
}) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onClick?.(event);
    };
    return (
        <Text size={ETextSize.B3} className={styles.tableFooterSummarySelectAllButton}>
            <Link {...rest} href="#" onClick={handleClick}>
                {children}
            </Link>
        </Text>
    );
};

TableFooterSummarySelectAllButton.displayName = "TableFooterSummarySelectAllButton";
