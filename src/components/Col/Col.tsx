import React from "react";
import clsx from "clsx";
import styles from "./styles/Col.module.less";

export type TColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type TOffsetSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/** Свойства Col. */
export interface IColProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    size?: TColumnSize;
    sizeSm?: TColumnSize;
    sizeMd?: TColumnSize;
    sizeLg?: TColumnSize;
    sizeXl?: TColumnSize;
    offset?: TOffsetSize;
    offsetSm?: TOffsetSize;
    offsetMd?: TOffsetSize;
    offsetLg?: TOffsetSize;
    offsetXl?: TOffsetSize;
    hidden?: boolean;
    hiddenSm?: boolean;
    hiddenMd?: boolean;
    hiddenLg?: boolean;
    hiddenXl?: boolean;
    block?: boolean;
    blockSm?: boolean;
    blockMd?: boolean;
    blockLg?: boolean;
    blockXl?: boolean;
}

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

    if (size) {
        classes.push(`col-${prefixAsPart}${size}`);
    }

    return classes;
}

export const Col: React.FC<IColProps> = ({
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
    ...props
}) => {
    const classNames = [
        ...getClassNames({ block, hidden, offset, size }),
        ...getClassNames({ block: blockSm, hidden: hiddenSm, offset: offsetSm, prefix: "sm", size: sizeSm }),
        ...getClassNames({ block: blockMd, hidden: hiddenMd, offset: offsetMd, prefix: "md", size: sizeMd }),
        ...getClassNames({ block: blockLg, hidden: hiddenLg, offset: offsetLg, prefix: "lg", size: sizeLg }),
        ...getClassNames({ block: blockXl, hidden: hiddenXl, offset: offsetXl, prefix: "xl", size: sizeXl }),
    ];
    const mappedClasses = classNames.map((c) => styles[c]).filter(Boolean);

    return (
        <div {...props} className={clsx(className, ...mappedClasses)}>
            {children}
        </div>
    );
};

Col.displayName = "Col";
