import React, { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { TestProps } from "../../../types/CoreTypes";
import { isKey } from "../../../utils/keyboard";
import { ITabsLineBaseProps } from "../types";
import { splitTabsByMaxVisible } from "../utils";
import { TabsLineDropdown } from "./TabsLineDropdown";
import { ITabsLineItemProps, TabsLineItem } from "./TabsLineItem";
import styles from "../styles/TabsLine.module.less";

/** Свойства компонента TabsLineDesktop. */
export interface ITabsLineDesktopProps extends ITabsLineBaseProps {
    /** Атрибуты кнопки дропдауна. */
    dropdownTargetHtmlAttributes?: React.HTMLAttributes<HTMLButtonElement> & TestProps;
    /** Максимальное число элементов строки, включая кнопку дропдауна. Без него все табы остаются в строке. */
    maxVisible?: number;
}

/**
 * Десктопный вариант TabsLine: табы в строку, не поместившиеся по maxVisible — в дропдауне.
 * Клавиатурная навигация по табам строки — стрелками влево/вправо (roving tabIndex).
 */
export const TabsLineDesktop = React.forwardRef<HTMLDivElement, ITabsLineDesktopProps>(
    (
        {
            className,
            dropdownTargetHtmlAttributes,
            maxVisible,
            onChangeTab,
            selectedId,
            size,
            tabs,
            ...htmlDivAttributes
        },
        ref,
    ) => {
        /** Индекс таба строки, доступного по Tab. Остальные табы выключены из порядка обхода. */
        const [focusableTabIndex, setFocusableTabIndex] = useState(0);
        const inlineTabsRefs = useRef<(HTMLButtonElement | null)[]>([]);

        const { inlineTabs, dropdownTabs } = useMemo(() => splitTabsByMaxVisible(tabs, maxVisible), [tabs, maxVisible]);

        const renderInlineTab = (
            { selected, onClick, onFocus, onBlur, size: itemSize, ...item }: ITabsLineItemProps,
            index: number,
        ) => {
            const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
                onChangeTab(item.id);
                onClick?.(event);
            };

            const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
                /** Является ли таб в фокусе последним перед дропдауном. */
                const isLastInlineTab = index === inlineTabs.length - 1;

                if (isKey(event.code, "ARROW_LEFT") || (isKey(event.code, "ARROW_RIGHT") && !isLastInlineTab)) {
                    const delta = isKey(event.code, "ARROW_RIGHT") ? 1 : -1;
                    const nextTab = inlineTabsRefs.current[index + delta];

                    if (nextTab) {
                        event.preventDefault();
                        nextTab.focus();
                    }
                }
            };

            const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
                setFocusableTabIndex(index);
                onFocus?.(event);
            };

            const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
                setFocusableTabIndex(0);
                onBlur?.(event);
            };

            const setRef = (node: HTMLButtonElement | null) => {
                inlineTabsRefs.current[index] = node;
            };

            return (
                <TabsLineItem
                    key={item.id}
                    selected={selectedId === item.id}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    tabIndex={focusableTabIndex === index ? 0 : -1}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...item}
                    size={itemSize ?? size}
                    ref={setRef}
                />
            );
        };

        const renderDropdown = () => {
            const selectedTab = dropdownTabs.find((item) => item.id === selectedId);

            return (
                <TabsLineDropdown
                    key="TabsLineDropdown"
                    tabs={dropdownTabs}
                    active={selectedTab !== undefined}
                    label={selectedTab ? selectedTab.label : dropdownTabs[0].label}
                    onClickTab={(item) => onChangeTab(item.id)}
                    selected={selectedTab}
                    targetHtmlAttributes={dropdownTargetHtmlAttributes}
                    size={size}
                />
            );
        };

        if (tabs.length === 0) {
            return null;
        }

        return (
            <div {...htmlDivAttributes} className={clsx(styles.tabsLine, className)} data-size={size} ref={ref}>
                {inlineTabs.map((item, index) => renderInlineTab(item, index))}
                {dropdownTabs.length > 0 && renderDropdown()}
            </div>
        );
    },
);

TabsLineDesktop.displayName = "TabsLineDesktop";
