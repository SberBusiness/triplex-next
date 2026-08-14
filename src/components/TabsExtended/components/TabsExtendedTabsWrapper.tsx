import React, { isValidElement, useCallback, useContext, useLayoutEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import pickBy from "lodash/pickBy";
import clsx from "clsx";
import { TabsExtendedContext } from "../TabsExtendedContext";
import { TabsExtendedTabContext, ITabsExtendedTabContext } from "./TabsExtendedTabContext";
import styles from "../styles/TabsExtended.module.less";

/** Свойства компонента TabsExtendedTabsWrapper. */
export interface ITabsExtendedTabsWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Атрибут, по которому таб опознаётся среди дочерних элементов скрытого контейнера. */
const TAB_ITEM_ID_ATTRIBUTE = "data-tab-item-id";

/** Padding-right контейнера равен 2px и отступ между кнопками 2px. Правая граница таба не должна выходить за (граница контейнера - 4px). */
const TABS_CONTAINER_RIGHT_OFFSET = 4;

/** Интервал троттлинга обработчика изменения ширины контейнера, мс. */
const RESIZE_REFRESH_RATE_MS = 150;

/** Значение контекста для табов из скрытого контейнера. */
const FAKE_TAB_CONTEXT: ITabsExtendedTabContext = { isFakeTab: true };

/** Возвращает children без `data-` атрибутов. */
const stripDataAttributes = (nodes: React.ReactNode): React.ReactNode =>
    React.Children.map(nodes, (child) => {
        // Если не может иметь `data-` атрибутов, вернуть как есть.
        if (!isValidElement(child)) {
            return child;
        }

        // Оставить только пропы, не начинающиеся с `data-`.
        const filteredProps = pickBy(child.props, (_value, key) => !key.startsWith("data-"));

        return React.createElement(child.type, filteredProps);
    });

/**
 * Контейнер табов.
 * Рендерит инлайн табы и определяет табы, которые должны быть отрендерены в Dropdown.
 */
export const TabsExtendedTabsWrapper = React.forwardRef<HTMLDivElement, ITabsExtendedTabsWrapperProps>(
    ({ children, className, ...htmlDivAttributes }, ref) => {
        const { setDropdownItemsIds, setInlineItemsIds, dropdownRef } = useContext(TabsExtendedContext);
        const [dropdownWidth, setDropdownWidth] = useState(0);
        // Отображаемые табы скрыты, пока скрытый контейнер не смонтирован и ширины табов не измерены.
        const [isTabsFakeMounted, setIsTabsFakeMounted] = useState(false);
        const tabsFakeRef = useRef<HTMLDivElement | null>(null);
        const childrenCountRef = useRef(React.Children.count(children));

        /** Распределяет табы на отображаемые в строке и уезжающие в Dropdown. */
        const checkVisibleItems = useCallback(() => {
            const tabsFakeNode = tabsFakeRef.current;

            if (!tabsFakeNode) {
                return;
            }

            const containerRight = tabsFakeNode.getBoundingClientRect().right - TABS_CONTAINER_RIGHT_OFFSET;
            const dropdownIds: string[] = [];
            const inlineIds: string[] = [];
            let overflow = false;

            Array.from(tabsFakeNode.children).forEach((tab) => {
                const tabId = tab.getAttribute(TAB_ITEM_ID_ATTRIBUTE);

                if (tabId === null) {
                    return;
                }

                const { right } = tab.getBoundingClientRect();

                if (containerRight - dropdownWidth < right) {
                    dropdownIds.push(tabId);

                    if (containerRight < right) {
                        overflow = true;
                    }
                } else {
                    inlineIds.push(tabId);
                }
            });

            setDropdownItemsIds(overflow ? dropdownIds : []);
            setInlineItemsIds(inlineIds);
        }, [dropdownWidth, setDropdownItemsIds, setInlineItemsIds]);

        const { ref: resizeRef } = useResizeDetector({
            handleWidth: true,
            onResize: checkVisibleItems,
            refreshMode: "throttle",
            refreshRate: RESIZE_REFRESH_RATE_MS,
        });

        const setTabsFakeNode = useCallback(
            (node: HTMLDivElement | null) => {
                if (tabsFakeRef.current !== node) {
                    tabsFakeRef.current = node;

                    if (node !== null) {
                        setIsTabsFakeMounted(true);
                    }
                }

                resizeRef(node);
            },
            [resizeRef],
        );

        /** Синхронизирует ширину Dropdown: она уменьшает место, доступное табам. */
        const syncDropdownWidth = () => {
            const dropdownNode = dropdownRef.current;

            if (!dropdownNode) {
                return;
            }

            const { width } = dropdownNode.getBoundingClientRect();

            if (width !== dropdownWidth) {
                setDropdownWidth(width);
            }
        };

        /** Пересчитывает табы, когда их количество изменилось. */
        const syncChildrenCount = () => {
            const count = React.Children.count(children);

            if (childrenCountRef.current !== count) {
                childrenCountRef.current = count;
                checkVisibleItems();
            }
        };

        useLayoutEffect(() => {
            syncDropdownWidth();
            syncChildrenCount();
        });

        useLayoutEffect(checkVisibleItems, [checkVisibleItems]);

        return (
            <>
                {/* Скрытый контейнер с дубликатом табов, для вычисления табов, передаваемых в Dropdown. */}
                {/* TabsFake идут в коде обязательно выше, чем tabsReal. */}
                <div className={styles.tabsFake} ref={setTabsFakeNode}>
                    <TabsExtendedTabContext.Provider value={FAKE_TAB_CONTEXT}>
                        {stripDataAttributes(children)}
                    </TabsExtendedTabContext.Provider>
                </div>

                <div
                    className={clsx(styles.tabsReal, { [styles.hidden]: !isTabsFakeMounted }, className)}
                    {...htmlDivAttributes}
                    ref={ref}
                >
                    {children}
                </div>
            </>
        );
    },
);

TabsExtendedTabsWrapper.displayName = "TabsExtendedTabsWrapper";
