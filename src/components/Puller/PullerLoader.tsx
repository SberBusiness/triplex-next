import React from "react";
import clsx from "clsx";
import { LoaderSmall, ILoaderSmallProps, ELoaderSmallTheme } from "../Loader";
import { EComponentSize } from "../../enums";
import styles from "./styles/Puller.module.less";

/** Свойства компонента PullerLoader. */
export interface IPullerLoaderProps extends Omit<ILoaderSmallProps, "theme" | "size"> {}

/** Лоадер для шапки Puller. */
export const PullerLoader: React.FC<IPullerLoaderProps> = ({ className, ...restProps }) => (
    <LoaderSmall
        className={clsx(styles.pullerLoader, className)}
        theme={ELoaderSmallTheme.BRAND}
        size={EComponentSize.SM}
        {...restProps}
    />
);
