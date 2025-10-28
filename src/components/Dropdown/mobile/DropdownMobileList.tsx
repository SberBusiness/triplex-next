import React from "react";
import clsx from "clsx";
import { DropdownMobileListItem } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileListItem";
import { LoaderSmall, ELoaderSmallTheme, ELoaderSmallSize } from "@sberbusiness/triplex-next/components/Loader";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobileList. */
export interface IDropdownMobileListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние загрузки. */
    loading?: boolean;
}

/** Список мобильной версии Dropdown. */
export const DropdownMobileList = React.forwardRef<HTMLDivElement, IDropdownMobileListProps>(
    ({ children, className, loading, ...htmlAttributes }, ref) => {
        const renderLoaderItem = () => (
            <DropdownMobileListItem id="dropdown-mobile-list-loader-item">
                <LoaderSmall
                    className={styles.dropdownMobileListLoader}
                    theme={ELoaderSmallTheme.BRAND}
                    size={ELoaderSmallSize.MD}
                />
            </DropdownMobileListItem>
        );

        return (
            <div className={clsx(styles.dropdownMobileList, className)} role="listbox" {...htmlAttributes} ref={ref}>
                {children}
                {loading && renderLoaderItem()}
            </div>
        );
    },
);

DropdownMobileList.displayName = "DropdownMobileList";
