import React from "react";
import clsx from "clsx";
import { ITagColorProps } from "@sberbusiness/triplex-next/components/TagColor/types";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/TagColor.module.less";
import { ETagColorStatus } from "./enums";

/** Соответствие размера тега имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Соответствие статуса тега имени класса. */
const STATUS_TO_CLASS_NAME_MAP: Record<ETagColorStatus, string> = {
    [ETagColorStatus.DEFAULT]: styles.default,
    [ETagColorStatus.SUCCESS]: styles.success,
    [ETagColorStatus.INFO]: styles.info,
    [ETagColorStatus.WARNING]: styles.warning,
    [ETagColorStatus.ERROR]: styles.error,
};

/**
 * Компонент, который используется для маркировки и классификации.
 *
 * Неинтерактивный: рендерит `span` без обработчиков и фокуса, цвет фона задаёт `status`.
 * Контент лежит во внутреннем `span`, который обрезает длинный текст многоточием
 * по ширине родителя — сам тег не шире своего контейнера.
 */
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
