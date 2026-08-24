import React from "react";
import clsx from "clsx";
import styles from "./styles/Skeleton.module.less";
import { ESkeletonType } from "./enums";

export interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Тип скелетона. По умолчанию ESkeletonType.TYPE_2.
     */
    type?: ESkeletonType;
}

/** Соответствие типа имени класса. */
const TYPE_TO_CLASS_NAME_MAP: Record<ESkeletonType, string> = {
    [ESkeletonType.TYPE_1]: styles.type1,
    [ESkeletonType.TYPE_2]: styles.type2,
    [ESkeletonType.TYPE_3]: styles.type3,
};

/**
 * Элемент для визуализации содержимого, которое еще не загрузилось.
 */
export const Skeleton: React.FC<ISkeletonProps> = ({
    className,
    type = ESkeletonType.TYPE_2,
    ...htmlDivAttributes
}) => (
    <div
        className={clsx(styles.skeleton, TYPE_TO_CLASS_NAME_MAP[type], className)}
        {...htmlDivAttributes}
        data-tx={process.env.npm_package_version}
    />
);
