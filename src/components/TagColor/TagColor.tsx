import React from "react";
import clsx from "clsx";
import { ITagColorProps } from "@sberbusiness/triplex-next/components/TagColor/types";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/TagColor.module.less";
import { ETagColorStatus } from "./enums";

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

const STATUS_TO_CLASS_NAME_MAP = {
    [ETagColorStatus.DEFAULT]: styles.default,
    [ETagColorStatus.SUCCESS]: styles.success,
    [ETagColorStatus.INFO]: styles.info,
    [ETagColorStatus.WARNING]: styles.warning,
    [ETagColorStatus.ERROR]: styles.error,
};

/** Компонент, который используется для маркировки и классификации. */
export const TagColor = React.forwardRef<HTMLSpanElement, ITagColorProps>(
    ({ children, className, size, status = ETagColorStatus.DEFAULT, ...restProps }, ref) => (
        <span
            className={clsx(styles.tagColor, SIZE_TO_CLASS_NAME_MAP[size], STATUS_TO_CLASS_NAME_MAP[status], className)}
            {...restProps}
            ref={ref}
        >
            <span className={styles.content}>{children}</span>
        </span>
    ),
);

TagColor.displayName = "TagColor";
