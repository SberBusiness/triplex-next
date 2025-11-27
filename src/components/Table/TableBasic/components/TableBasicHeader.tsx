import React from "react";
import {
    SortdecreaseStrokeSrvIcon16,
    SortincreaseStrokeSrvIcon16,
    SortStrokeSrvIcon16,
} from "@sberbusiness/icons-next";
import { isNullOrUndefined } from "@sberbusiness/triplex-next/utils/isNullOrUndefined";
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

export interface ITableBasicHeaderProps {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Обработчик сортировки. */
    onOrderBy?: (order: ISortOrder) => void;
}

/** Компонент заголовка таблицы. */
export const TableBasicHeader = ({ columns, onOrderBy }: ITableBasicHeaderProps) => {
    const hasOrderFunc = !isNullOrUndefined(onOrderBy);

    const renderOrderIcon = (c: ITableBasicColumn) => {
        let icon;
        switch (c.orderDirection) {
            case EOrderDirection.NONE: {
                icon = <SortStrokeSrvIcon16 paletteIndex={5} />;
                break;
            }
            case EOrderDirection.ASC: {
                icon = <SortincreaseStrokeSrvIcon16 paletteIndex={5} />;
                break;
            }
            case EOrderDirection.DESC: {
                icon = <SortdecreaseStrokeSrvIcon16 paletteIndex={5} />;
                break;
            }
        }

        const orderButtonClassName = clsx(styles.orderButton, {
            [styles.alignLeft]: c.horizontalAlign === EHorizontalAlign.RIGHT,
            [styles.alignRight]: c.horizontalAlign !== EHorizontalAlign.RIGHT,
            [styles.sorted]: c.orderDirection !== EOrderDirection.NONE,
        });

        return <span className={orderButtonClassName}>{icon}</span>;
    };

    /** Рендер заголовка таблицы. */
    const renderTh = (c: ITableBasicColumn, hasOrderFunc: boolean) => {
        // Столбец скрыт.
        if (c.hidden) {
            return null;
        }

        const styleTh = c.width ? { maxWidth: c.width, minWidth: c.width, width: c.width } : undefined;
        const orderEnabled = hasOrderFunc && !isNullOrUndefined(c.orderDirection);
        const handleClickOrderFunc = orderEnabled
            ? () => {
                  handleClickOrder(c.fieldKey, c.orderDirection!);
              }
            : undefined;
        const orderIcon = orderEnabled && renderOrderIcon(c);
        const classNameTh = clsx(mapHorizontalAlignToClassName(c.horizontalAlign), {
            [styles.checkboxType]: c.cellType === ECellType.CHECKBOX,
        });
        const classNameThBlock = clsx(styles.thBlock, "hoverable", {
            [styles.order]: orderEnabled,
        });

        const labelElement = [ECellType.TEXT, undefined].includes(c.cellType) ? (
            <Text size={ETextSize.B3}>{c.label}</Text>
        ) : (
            c.label
        );

        const content =
            c.horizontalAlign === EHorizontalAlign.RIGHT ? (
                <>
                    {orderIcon}
                    {labelElement}
                </>
            ) : (
                <>
                    {labelElement}
                    {orderIcon}
                </>
            );

        return (
            <th className={classNameTh} title={c.title} key={c.fieldKey} style={styleTh}>
                <span
                    className={classNameThBlock}
                    onClick={handleClickOrderFunc}
                    {...(Boolean(c.ariaAttributes) && getAriaHTMLAttributes(c.ariaAttributes!))}
                    {...(Boolean(c.dataAttributes) && getDataHTMLAttributes(c.dataAttributes!))}
                >
                    {content}
                </span>
            </th>
        );
    };

    /** Обработчик клика сортировки столбца. */
    const handleClickOrder = (fieldKey: string, currentDirection: EOrderDirection) => {
        let nextDirection;
        switch (currentDirection) {
            case EOrderDirection.NONE: {
                nextDirection = EOrderDirection.ASC;
                break;
            }
            case EOrderDirection.ASC: {
                nextDirection = EOrderDirection.DESC;
                break;
            }
            case EOrderDirection.DESC: {
                nextDirection = EOrderDirection.NONE;
                break;
            }
        }

        if (onOrderBy) {
            const OrderObj: ISortOrder = { direction: nextDirection, fieldKey };
            onOrderBy(OrderObj);
        }
    };

    const thList = columns.map((c) => renderTh(c, hasOrderFunc));

    return (
        <thead>
            <tr>{thList}</tr>
        </thead>
    );
};

TableBasicHeader.displayName = "TableBasicHeader";
