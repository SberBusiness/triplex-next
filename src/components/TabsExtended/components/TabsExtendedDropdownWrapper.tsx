import React, { useCallback, useContext } from "react";
import clsx from "clsx";
import { TabsExtendedContext } from "../TabsExtendedContext";
import { TTabsExtendedOnSelectTab } from "../types";
import styles from "../styles/TabsExtended.module.less";

/** Данные, передаваемые в render-prop TabsExtendedDropdownWrapper. */
export interface ITabsExtendedDropdownWrapperProvideProps {
    /** Id табов, которые не поместились в строку и должны быть показаны в Dropdown. */
    dropdownItemsIds: string[];
    /** Обработчик выбора таба из Dropdown. */
    onSelectTab: TTabsExtendedOnSelectTab;
}

/** Свойства компонента TabsExtendedDropdownWrapper. */
export interface ITabsExtendedDropdownWrapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Render-prop, рендерящий Dropdown со скрытыми табами. */
    children: (props: ITabsExtendedDropdownWrapperProvideProps) => React.ReactNode;
}

/** Контейнер для Dropdown компонента табов. Скрыт, пока все табы помещаются в строку. */
export const TabsExtendedDropdownWrapper = React.forwardRef<HTMLDivElement, ITabsExtendedDropdownWrapperProps>(
    ({ children, className, ...htmlDivAttributes }, ref) => {
        const { dropdownItemsIds, onSelectTab, dropdownRef } = useContext(TabsExtendedContext);

        // Ширина этого контейнера участвует в расчёте помещающихся табов, поэтому ref из контекста
        // обязателен. Ref потребителя устанавливается на тот же элемент.
        const setRef = useCallback(
            (node: HTMLDivElement | null) => {
                dropdownRef.current = node;

                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
            },
            [dropdownRef, ref],
        );

        return (
            <div
                className={clsx(styles.tabsExtendedDropdown, className)}
                {...htmlDivAttributes}
                hidden={!dropdownItemsIds.length}
                ref={setRef}
            >
                {children({ dropdownItemsIds, onSelectTab })}
            </div>
        );
    },
);

TabsExtendedDropdownWrapper.displayName = "TabsExtendedDropdownWrapper";
