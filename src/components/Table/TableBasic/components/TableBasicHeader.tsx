import React from "react";
import {
    SortdecreaseStrokeSrvIcon16,
    SortincreaseStrokeSrvIcon16,
    SortStrokeSrvIcon16,
} from "@sberbusiness/icons-next";
import { getAriaHTMLAttributes } from "@sberbusiness/triplex-next/utils/html/AriaAttributes";
import { getDataHTMLAttributes } from "@sberbusiness/triplex-next/utils/html/DataAttributes";
import {
    ECellType,
    EHorizontalAlign,
    EOrderDirection,
} from "@sberbusiness/triplex-next/components/Table/TableBasic/enums";
import { clsx } from "clsx";
import styles from "../styles/TableBasic.module.less";
import { ISortOrder, ITableBasicColumn } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { mapHorizontalAlignToClassName } from "@sberbusiness/triplex-next/components/Table/utils";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";

/** Свойства компонента TableBasicHeader. */
export interface ITableBasicHeaderProps {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Обработчик сортировки. */
    onOrderBy?: (order: ISortOrder) => void;
}

/** Следующее направление сортировки при клике по заголовку: none → asc → desc → none. */
const getNextOrderDirection = (currentDirection: EOrderDirection): EOrderDirection => {
    switch (currentDirection) {
        case EOrderDirection.NONE:
            return EOrderDirection.ASC;
        case EOrderDirection.ASC:
            return EOrderDirection.DESC;
        case EOrderDirection.DESC:
            return EOrderDirection.NONE;
    }
};

/** Иконка, соответствующая текущему направлению сортировки. */
const getOrderIcon = (orderDirection: EOrderDirection): React.ReactNode => {
    switch (orderDirection) {
        case EOrderDirection.NONE:
            return <SortStrokeSrvIcon16 paletteIndex={5} />;
        case EOrderDirection.ASC:
            return <SortincreaseStrokeSrvIcon16 paletteIndex={5} />;
        case EOrderDirection.DESC:
            return <SortdecreaseStrokeSrvIcon16 paletteIndex={5} />;
    }
};

/** Компонент заголовка таблицы. */
export const TableBasicHeader = ({ columns, onOrderBy }: ITableBasicHeaderProps) => {
    const hasOrderFunc = onOrderBy != null;

    /** Обработчик клика сортировки столбца. */
    const handleClickOrder = (fieldKey: string, currentDirection: EOrderDirection) => {
        onOrderBy?.({ direction: getNextOrderDirection(currentDirection), fieldKey });
    };

    /** Рендер кнопки сортировки столбца. */
    const renderOrderButton = (column: ITableBasicColumn, orderDirection: EOrderDirection) => {
        const orderButtonClassName = clsx(styles.orderButton, {
            [styles.alignLeft]: column.horizontalAlign === EHorizontalAlign.RIGHT,
            [styles.alignRight]: column.horizontalAlign !== EHorizontalAlign.RIGHT,
            [styles.sorted]: orderDirection !== EOrderDirection.NONE,
        });

        return <span className={orderButtonClassName}>{getOrderIcon(orderDirection)}</span>;
    };

    /** Рендер заголовка столбца. */
    const renderTh = (column: ITableBasicColumn) => {
        // Столбец скрыт.
        if (column.hidden) {
            return null;
        }

        const { ariaAttributes, cellType, dataAttributes, fieldKey, horizontalAlign, label, orderDirection, title } =
            column;
        const styleTh = column.width
            ? { maxWidth: column.width, minWidth: column.width, width: column.width }
            : undefined;
        // Сортировка доступна, только если задан обработчик и у столбца есть текущее направление сортировки.
        const orderEnabled = hasOrderFunc && orderDirection != null;
        const classNameTh = clsx(mapHorizontalAlignToClassName(horizontalAlign), {
            [styles.checkboxType]: cellType === ECellType.CHECKBOX,
        });
        const classNameThBlock = clsx(styles.thBlock, "hoverable", {
            [styles.order]: orderEnabled,
        });

        const labelElement = [ECellType.TEXT, undefined].includes(cellType) ? (
            <Text size={ETextSize.B3}>{label}</Text>
        ) : (
            label
        );
        const orderButton = orderEnabled ? renderOrderButton(column, orderDirection) : null;

        const content =
            horizontalAlign === EHorizontalAlign.RIGHT ? (
                <>
                    {orderButton}
                    {labelElement}
                </>
            ) : (
                <>
                    {labelElement}
                    {orderButton}
                </>
            );

        return (
            <th className={classNameTh} title={title} key={fieldKey} style={styleTh}>
                <span
                    className={classNameThBlock}
                    onClick={orderEnabled ? () => handleClickOrder(fieldKey, orderDirection) : undefined}
                    {...(ariaAttributes && getAriaHTMLAttributes(ariaAttributes))}
                    {...(dataAttributes && getDataHTMLAttributes(dataAttributes))}
                >
                    {content}
                </span>
            </th>
        );
    };

    return (
        <thead>
            <tr>{columns.map((column) => renderTh(column))}</tr>
        </thead>
    );
};

TableBasicHeader.displayName = "TableBasicHeader";
