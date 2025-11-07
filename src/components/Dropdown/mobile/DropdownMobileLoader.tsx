import React from "react";
import clsx from "clsx";
import { LoaderSmall, ILoaderSmallProps, ELoaderSmallTheme } from "@sberbusiness/triplex-next/components/Loader";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobileLoader. */
export interface IDropownMobileLoaderProps extends Omit<ILoaderSmallProps, "theme" | "size"> {}

/** Лоадер компонента DropdownMobile. */
export const DropdownMobileLoader: React.FC<IDropownMobileLoaderProps> = ({ className, ...restProps }) => (
    <LoaderSmall
        className={clsx(styles.dropdownMobileLoader, className)}
        theme={ELoaderSmallTheme.BRAND}
        size={EComponentSize.MD}
        {...restProps}
    />
);
