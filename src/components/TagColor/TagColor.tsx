import React from "react";
import clsx from "clsx";
import { ITagColorProps } from "@sberbusiness/triplex-next/components/TagColor/types";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/TagColor.module.less";
import { ETagColorStatus } from "./enums";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

const statusToClassNameMap = {
    [ETagColorStatus.DEFAULT]: styles.default,
    [ETagColorStatus.SUCCESS]: styles.success,
    [ETagColorStatus.INFO]: styles.info,
    [ETagColorStatus.WARNING]: styles.warning,
    [ETagColorStatus.ERROR]: styles.error,
};

/** Компонент, который используется для маркировки и классификации. */
export const TagColor: React.FC<ITagColorProps> = ({
    children,
    className,
    size,
    status = ETagColorStatus.DEFAULT,
    ...restProps
}) =>
    children && (
        <div
            className={clsx(styles.tagColor, sizeToClassNameMap[size], statusToClassNameMap[status], className)}
            {...restProps}
        >
            <span className={styles.content}>{children}</span>
        </div>
    );
