import React from "react";
import clsx from "clsx";
import { ITagGroupProps } from "@sberbusiness/triplex-next/components/TagGroup/types";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/TagGroup.module.less";

/** Соответствие размера имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Контейнер для группы Tag.
 * Теги идут в общем потоке и переносятся по строкам, отступ между ними задаёт size.
 * Корневой элемент — div с role="group", на него указывает ref и приходят className и остальные props.
 */
export const TagGroup = React.forwardRef<HTMLDivElement, ITagGroupProps>(
    ({ children, className, size, ...restProps }, ref) => (
        <div
            className={clsx(styles.tagGroup, SIZE_TO_CLASS_NAME_MAP[size], className)}
            role="group"
            {...restProps}
            ref={ref}
        >
            {children}
        </div>
    ),
);

TagGroup.displayName = "TagGroup";
