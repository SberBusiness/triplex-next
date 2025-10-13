import React, { useContext } from "react";
import styles from "../styles/TabsExtended.module.less";
import clsx from "clsx";
import { TabsExtendedContext } from "../TabsExtendedContext";
import { TTabsExtendedOnSelectTab } from "@sberbusiness/triplex-next/components/TabsExtended/types";

export interface ITabsExtendedDropdownWrapperProvideProps {
    dropdownItemsIds: string[];
    onSelectTab: TTabsExtendedOnSelectTab;
}

/** Свойства компонента TabsExtendedDropdownWrapper. */
export interface ITabsExtendedDropdownWrapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    children: (props: ITabsExtendedDropdownWrapperProvideProps) => React.ReactNode;
}

/** Контейнер для Dropdown компонента табов. */
export const TabsExtendedDropdownWrapper: React.FC<ITabsExtendedDropdownWrapperProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => {
    const { dropdownItemsIds, onSelectTab, dropdownRef } = useContext(TabsExtendedContext);

    return (
        <div
            className={clsx(styles.tabsExtendedDropdown, className)}
            {...htmlDivAttributes}
            hidden={!dropdownItemsIds.length}
            ref={dropdownRef}
        >
            {children({ dropdownItemsIds, onSelectTab })}
        </div>
    );
};
