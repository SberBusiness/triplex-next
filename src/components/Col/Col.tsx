import React, { useContext } from "react";
import clsx from "clsx";
import styles from "./styles/Col.module.less";
import { RowContext } from "../Row/RowContext";
import { EComponentSize } from "../../enums/EComponentSize";

/** Ширина колонки в долях 12-колоночной сетки. */
export type TColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
/** Отступ колонки слева в долях 12-колоночной сетки. */
export type TOffsetSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const GRID_HORIZONTAL_GAP_TO_CLASS_NAME_MAP = {
    [EComponentSize.SM]: styles.gridHorizontalGapSM,
    [EComponentSize.MD]: styles.gridHorizontalGapMD,
};

/** Свойства компонента Col. */
export interface IColProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое колонки. */
    children?: React.ReactNode;
    /** Ширина колонки на всех экранах. По умолчанию 12 (вся ширина). */
    size?: TColumnSize;
    /** Ширина колонки на экранах от sm и шире. */
    sizeSm?: TColumnSize;
    /** Ширина колонки на экранах от md и шире. */
    sizeMd?: TColumnSize;
    /** Ширина колонки на экранах от lg и шире. */
    sizeLg?: TColumnSize;
    /** Ширина колонки на экранах от xl и шире. */
    sizeXl?: TColumnSize;
    /** Отступ слева на всех экранах. */
    offset?: TOffsetSize;
    /** Отступ слева на экранах от sm и шире. */
    offsetSm?: TOffsetSize;
    /** Отступ слева на экранах от md и шире. */
    offsetMd?: TOffsetSize;
    /** Отступ слева на экранах от lg и шире. */
    offsetLg?: TOffsetSize;
    /** Отступ слева на экранах от xl и шире. */
    offsetXl?: TOffsetSize;
    /** Скрытие колонки на всех экранах (CSS display: none; переопределяет нативный HTML-атрибут hidden). */
    hidden?: boolean;
    /** Скрытие колонки на экранах от sm и шире. */
    hiddenSm?: boolean;
    /** Скрытие колонки на экранах от md и шире. */
    hiddenMd?: boolean;
    /** Скрытие колонки на экранах от lg и шире. */
    hiddenLg?: boolean;
    /** Скрытие колонки на экранах от xl и шире. */
    hiddenXl?: boolean;
    /** Отображение колонки (display: block) на всех экранах. */
    block?: boolean;
    /** Отображение колонки (display: block) на экранах от sm и шире. */
    blockSm?: boolean;
    /** Отображение колонки (display: block) на экранах от md и шире. */
    blockMd?: boolean;
    /** Отображение колонки (display: block) на экранах от lg и шире. */
    blockLg?: boolean;
    /** Отображение колонки (display: block) на экранах от xl и шире. */
    blockXl?: boolean;
}

/** Собирает имена grid-классов (размер, отступ, видимость) для одного breakpoint-префикса. */
function getClassNames({
    block,
    hidden,
    offset,
    prefix,
    size,
}: {
    block?: boolean;
    hidden?: boolean;
    offset?: TOffsetSize;
    prefix?: string;
    size?: TColumnSize;
}) {
    const classes: string[] = [];
    const prefixAsPart = prefix ? `${prefix}-` : "";
    const prefixVisibility = prefix ? `-${prefix}` : "";

    if (block === true) {
        classes.push(`d-block${prefixVisibility}`);
    }

    if (hidden === true) {
        classes.push(`d-none${prefixVisibility}`);
    }

    if (offset !== undefined) {
        classes.push(`offset-${prefixAsPart}${offset}`);
    }

    if (size !== undefined) {
        classes.push(`col-${prefixAsPart}${size}`);
    }

    return classes;
}

/**
 * Колонка 12-колоночной сетки. Используется внутри компонента Row,
 * горизонтальный отступ между колонками получает из RowContext.
 */
export const Col = React.forwardRef<HTMLDivElement, IColProps>(
    (
        {
            children,
            className,
            hidden,
            hiddenSm,
            hiddenMd,
            hiddenLg,
            hiddenXl,
            block,
            blockSm,
            blockMd,
            blockLg,
            blockXl,
            size = 12,
            sizeSm,
            sizeMd,
            sizeLg,
            sizeXl,
            offset,
            offsetSm,
            offsetMd,
            offsetLg,
            offsetXl,
            ...htmlDivAttributes
        },
        ref,
    ) => {
        const { gridHorizontalGap } = useContext(RowContext);

        const classNames = [
            ...getClassNames({ block, hidden, offset, size }),
            ...getClassNames({ block: blockSm, hidden: hiddenSm, offset: offsetSm, prefix: "sm", size: sizeSm }),
            ...getClassNames({ block: blockMd, hidden: hiddenMd, offset: offsetMd, prefix: "md", size: sizeMd }),
            ...getClassNames({ block: blockLg, hidden: hiddenLg, offset: offsetLg, prefix: "lg", size: sizeLg }),
            ...getClassNames({ block: blockXl, hidden: hiddenXl, offset: offsetXl, prefix: "xl", size: sizeXl }),
        ];
        const mappedClasses = classNames.map((c) => styles[c]).filter(Boolean);

        return (
            <div
                {...htmlDivAttributes}
                className={clsx(className, GRID_HORIZONTAL_GAP_TO_CLASS_NAME_MAP[gridHorizontalGap], ...mappedClasses)}
                ref={ref}
            >
                {children}
            </div>
        );
    },
);

Col.displayName = "Col";
