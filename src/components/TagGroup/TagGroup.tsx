import React from "react";
import clsx from "clsx";
import { ITagGroupProps } from "@sberbusiness/triplex-next/components/TagGroup/types";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/TagGroup.module.less";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Контейнер для группы Tag. */
export const TagGroup = React.forwardRef<HTMLDivElement, ITagGroupProps>(
    ({ children, className, size, ...restProps }, ref) => (
        <div
            className={clsx(styles.tagGroup, sizeToClassNameMap[size], className)}
            role="group"
            {...restProps}
            ref={ref}
        >
            {children}
        </div>
    ),
);
