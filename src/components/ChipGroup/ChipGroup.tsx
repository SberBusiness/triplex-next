import React from "react";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/ChipGroup.module.less";

/** Свойства компонента ChipGroup. */
export interface IChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое группы, обычно набор Chip и его вариантов. */
    children?: React.ReactNode;
    /** Размер компонента. Задаёт только отступ между чипсами, размер самих чипсов не меняет. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
    /** Чипсы выводятся в одну строку с горизонтальной прокруткой, без переноса. По умолчанию false. */
    oneLine?: boolean;
}

/** Соответствие размера имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Контейнер компонентов Chip.
 * Раскладывает чипсы с переносом по строкам либо в одну строку с горизонтальной прокруткой и задаёт отступ между ними.
 * Корневой элемент — div, на него указывает ref и приходят className и остальные props.
 */
export const ChipGroup = React.forwardRef<HTMLDivElement, IChipGroupProps>(
    ({ children, className, oneLine, size = EComponentSize.MD, ...rest }, ref) => {
        return (
            <div
                className={clsx(
                    styles.chipGroup,
                    SIZE_TO_CLASS_NAME_MAP[size],
                    oneLine ? styles.oneLine : styles.multiLine,
                    className,
                )}
                {...rest}
                ref={ref}
                data-tx={process.env.npm_package_version}
            >
                {children}
            </div>
        );
    },
);

ChipGroup.displayName = "ChipGroup";
