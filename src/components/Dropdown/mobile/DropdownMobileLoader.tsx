import React from "react";
import clsx from "clsx";
import {
    LoaderSmall,
    ILoaderSmallProps,
    ELoaderSmallTheme,
    ELoaderSmallSize,
} from "@sberbusiness/triplex-next/components/Loader";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobileLoader. */
export interface IDropownMobileLoaderProps extends Omit<ILoaderSmallProps, "theme" | "size"> {}

/** Лоадер компонента DropdownMobile. */
export const DropdownMobileLoader = React.forwardRef<HTMLSpanElement, IDropownMobileLoaderProps>(
    ({ className, ...restProps }, ref) => (
        <LoaderSmall
            className={clsx(styles.dropdownMobileLoader, className)}
            theme={ELoaderSmallTheme.BRAND}
            size={ELoaderSmallSize.MD}
            {...restProps}
            ref={ref}
        />
    ),
);

DropdownMobileLoader.displayName = "DropdownMobileLoader";
