import React, { useState } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { LoaderSmall, ELoaderSmallTheme } from "../../Loader";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import { DropdownMobileListItem } from "./DropdownMobileListItem";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobileList. */
export interface IDropdownMobileListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние загрузки. */
    loading?: boolean;
}

/** Список мобильной версии Dropdown. */
export const DropdownMobileList = React.forwardRef<HTMLDivElement, IDropdownMobileListProps>(
    ({ children, className, loading, ...htmlAttributes }, ref) => {
        const [loaderId] = useState(() => uniqueId());

        const renderLoaderItem = () => (
            <DropdownMobileListItem id={loaderId} className={styles.dropdownMobileListLoader}>
                <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />
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
