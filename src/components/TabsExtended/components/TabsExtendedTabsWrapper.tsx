import React, { useContext, useState, useRef, useLayoutEffect, isValidElement } from "react";
import { useResizeDetector } from "react-resize-detector";
import pickBy from "lodash/pickBy";
import clsx from "clsx";
import { TabsExtendedContext } from "../TabsExtendedContext";
import { TabsExtendedTabContext } from "./TabsExtendedTabContext";
import styles from "../styles/TabsExtended.module.less";

/** Свойства компонента TabsExtendedTabsWrapper. */
export interface ITabsExtendedTabsWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Контейнер табов.
 * Рендерит инлайн табы и определяет табы, которые должны быть отрендерены в Dropdown.
 */
export const TabsExtendedTabsWrapper: React.FC<ITabsExtendedTabsWrapperProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => {
    const { setDropdownItemsIds, setInlineItemsIds, dropdownRef } = useContext(TabsExtendedContext);
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const tabsFakeRef = useRef<HTMLDivElement>(null);
    const childrenCount = useRef(React.Children.count(children));

    const checkVisibleItems = () => {
        if (tabsFakeRef.current) {
            const { children } = tabsFakeRef.current;
            let { right: containerRight } = tabsFakeRef.current.getBoundingClientRect();
            const dropdownIds: string[] = [];
            const inlineIds: string[] = [];
            let overflow = false;

            // Padding-right контейнера равен 2px и отступ между кнопками 2px. Правая граница таба не должна выходить за (граница контейнера - 4px).
            containerRight = containerRight - 4;

            Array.from(children).forEach((tab) => {
                const { right } = tab.getBoundingClientRect();

                if (containerRight - dropdownWidth < right) {
                    dropdownIds.push(tab.getAttribute("data-tab-item-id")!);
                    if (!overflow && containerRight < right) {
                        overflow = true;
                    }
                } else {
                    if (tab.getAttribute("data-tab-item-id")) {
                        inlineIds.push(tab.getAttribute("data-tab-item-id")!);
                    }
                }
            });

            if (overflow) {
                setDropdownItemsIds(dropdownIds);
            } else {
                setDropdownItemsIds([]);
            }

            setInlineItemsIds(inlineIds);
        }
    };

    const setNewDropdownWidth = () => {
        if (dropdownRef.current) {
            const { width } = dropdownRef.current.getBoundingClientRect();

            if (width !== dropdownWidth) {
                setDropdownWidth(width);
            }
        }
    };

    const setNewChildrenCount = () => {
        const count = React.Children.count(children);

        if (childrenCount.current !== count) {
            childrenCount.current = count;
            checkVisibleItems();
        }
    };

    useLayoutEffect(() => {
        setNewDropdownWidth();
        setNewChildrenCount();
    });

    useLayoutEffect(checkVisibleItems, [dropdownWidth]);

    /** Возвращает children без `data-` атрибутов */
    const stripDataAttributes = (toProcess: React.ReactNode): React.ReactNode => {
        return React.Children.map(toProcess, (child) => {
            // Если не может иметь `data-` атрибутов, вернуть как есть
            if (!isValidElement(child)) {
                return child;
            }

            // Оставить только пропы, не начинающиеся с `data-`
            const filteredProps = pickBy(child.props, (_val, key) => !key.startsWith("data-"));

            return React.createElement(child.type, filteredProps);
        });
    };

    const { ref: resizeRef } = useResizeDetector({
        handleWidth: true,
        onResize: checkVisibleItems,
        refreshMode: "throttle",
        refreshRate: 150,
    });

    return (
        <>
            {/* Скрытый контейнер с дубликатом табов, для вычисления табов, передаваемых в Dropdown. */}
            {/* TabsFake идут в коде обязательно выше, чем tabsReal. */}
            <div
                className={styles.tabsFake}
                ref={(node) => {
                    if (tabsFakeRef.current !== node) {
                        (tabsFakeRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }

                    resizeRef(node);
                }}
            >
                <TabsExtendedTabContext.Provider value={{ isFakeTab: true }}>
                    {stripDataAttributes(children)}
                </TabsExtendedTabContext.Provider>
            </div>

            <div
                className={clsx(styles.tabsReal, { [styles.hidden]: !tabsFakeRef.current }, className)}
                {...htmlDivAttributes}
            >
                {children}
            </div>
        </>
    );
};
