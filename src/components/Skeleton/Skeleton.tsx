import React from "react";
import clsx from "clsx";
import styles from "./styles/Skeleton.module.less";
import { ESkeletonType } from "./enums";

export interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Тип скелетона - темный или светлый.
     */
    type?: ESkeletonType;
}

/**
 * Элемент для визуализации содержимого, которое еще не загрузилось.
 */
export const Skeleton: React.FC<ISkeletonProps> = ({ className, type = ESkeletonType.DARK, ...htmlDivAttributes }) => (
    <div
        className={clsx(styles.skeleton, className, {
            [styles.dark]: type === ESkeletonType.DARK,
            [styles.light]: type === ESkeletonType.LIGHT,
        })}
        {...htmlDivAttributes}
        data-tx={process.env.npm_package_version}
    />
);
