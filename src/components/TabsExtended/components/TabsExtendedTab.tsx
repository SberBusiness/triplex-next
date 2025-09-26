import React, { useContext } from "react";
import styles from "../styles/TabsExtended.module.less";
import clsx from "clsx";
import { TabsExtendedContext } from "../TabsExtendedContext";
import { TabsExtendedTabContext } from "./TabsExtendedTabContext";

export interface ITabsExtendedItemProvideProps {
    /** Выбранное состояние. */
    selected: boolean;
    /** Первый таб. */
    isFirstInlineTab: boolean;
    /** Последний, отображаемый в строке таб. */
    isLastInlineTab: boolean;
}

/** Свойства компонента TabsExtendedTab. */
export interface ITabsExtendedTabProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    id: string;
    children: (props: ITabsExtendedItemProvideProps) => React.ReactNode;
}

/**
 * Контейнер содержимого таба.
 * Обрабатывает выбор таба.
 */
export const TabsExtendedTab = React.forwardRef<HTMLSpanElement, ITabsExtendedTabProps>(
    ({ children, id, className, onClick, ...htmlSpanAttributes }, ref) => {
        const { dropdownItemsIds, inlineItemsIds, selectedId, onSelectTab } = useContext(TabsExtendedContext);
        const { isFakeTab } = useContext(TabsExtendedTabContext);

        const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
            onSelectTab(id);
            onClick?.(event);
        };

        // Возвращает id таба. Если таб отображается в Dropdown, или это fakeTab, возвращается undefined, чтобы не было 2-х элементов в DOM с одинаковыми ID.
        const getId = () => {
            if (isFakeTab || dropdownItemsIds.includes(id)) {
                return undefined;
            }
            return id;
        };

        return (
            <span
                id={getId()}
                className={clsx(styles.tabsExtendedTab, { [styles.hidden]: dropdownItemsIds.includes(id) }, className)}
                onClick={isFakeTab ? undefined : handleClick}
                {...htmlSpanAttributes}
                role="presentation"
                // Нужен для идентификации таба компонентом TabsWrapper.
                data-tab-item-id={id}
                ref={isFakeTab ? undefined : ref}
            >
                {children({
                    isFirstInlineTab: inlineItemsIds[0] === id,
                    isLastInlineTab: inlineItemsIds[inlineItemsIds.length - 1] === id,
                    selected: selectedId === id,
                })}
            </span>
        );
    },
);

TabsExtendedTab.displayName = "TabsExtendedTab";
