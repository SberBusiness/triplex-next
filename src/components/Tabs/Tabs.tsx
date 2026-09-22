import React, { useRef, useState } from "react";
import clsx from "clsx";
import { ButtonDropdown, EButtonDotsTheme } from "@sberbusiness/triplex-next/components/Button";
import {
    ETabsExtendedType,
    ITabsExtendedDropdownWrapperProvideProps,
    ITabsExtendedProps,
    ITabsExtendedTabProps,
    TabsExtended,
} from "@sberbusiness/triplex-next/components/TabsExtended";
import { TabsExtendedContext } from "@sberbusiness/triplex-next/components/TabsExtended/TabsExtendedContext";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import styles from "./styles/Tabs.module.less";

/** Описание одного таба. Неизвестные компоненту атрибуты уходят на контейнер таба. */
export interface ITabsItem extends Omit<ITabsExtendedTabProps, "children" | "onSelect"> {
    /** Содержимое таба: текст или произвольная разметка. */
    label: React.ReactNode;
    /** Значок новых уведомлений на табе. */
    showNotificationIcon?: boolean;
}

/** Свойства компонента Tabs. */
export interface ITabsProps extends ITabsExtendedProps {
    /** HTML-атрибуты dropdown-кнопки. */
    buttonDropdownAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    /** Содержимое задаётся массивом tabs, children не поддерживается. */
    children?: never;
    /** Обработчик выбора таба. Принимает id выбираемого таба. */
    onSelectTab: (selectedId: string) => void;
    /** Размер компонента. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
    /** Массив табов. */
    tabs: Array<ITabsItem>;
}

/** Тема кнопки выпадающего списка для каждого типа табов. */
const TYPE_TO_BUTTON_DOTS_THEME_MAP: Record<ETabsExtendedType, EButtonDotsTheme> = {
    [ETabsExtendedType.TYPE_1]: EButtonDotsTheme.DOTS_SECONDARY,
    [ETabsExtendedType.TYPE_2]: EButtonDotsTheme.DOTS_SECONDARY_LIGHT,
};

/** CSS-класс кнопки выпадающего списка для каждого типа табов. */
const TYPE_TO_CLASS_NAME_MAP: Record<ETabsExtendedType, string> = {
    [ETabsExtendedType.TYPE_1]: styles.type1,
    [ETabsExtendedType.TYPE_2]: styles.type2,
};

/** Таб, последним получивший фокус, и выбранный таб на тот момент. */
interface ILastFocusedTab {
    /** Id таба, получившего фокус. */
    tabId: string;
    /** Id таба, выбранного в момент получения фокуса. */
    selectedId: string;
}

/**
 * Возвращает id таба, который получает tabIndex = 0: первый из кандидатов, отображаемый в строке, иначе первый таб строки.
 * Таб из выпадающего списка скрыт — с ним строка табов выпала бы из обхода по Tab.
 * Пока табы не распределены по строке и списку (inlineTabIds пуст), возвращается первый кандидат.
 * @param candidateTabIds Кандидаты в порядке приоритета. Непустой массив.
 * @param inlineTabIds Id табов, отображаемых в строке, в порядке массива tabs.
 */
const getFocusableTabId = (candidateTabIds: string[], inlineTabIds: string[]) =>
    candidateTabIds.find((id) => inlineTabIds.includes(id)) ?? inlineTabIds[0] ?? candidateTabIds[0];

/**
 * Компонент Tabs.
 * Готовые табы поверх TabsExtended: рендерит табы по массиву, переносит не поместившиеся в выпадающий список
 * и добавляет навигацию стрелками.
 */
export const Tabs = React.forwardRef<HTMLDivElement, ITabsProps>(
    (
        {
            buttonDropdownAttributes,
            selectedId,
            onSelectTab,
            size = EComponentSize.MD,
            tabs,
            type = ETabsExtendedType.TYPE_1,
            ...props
        },
        ref,
    ) => {
        /** Таб, последним получивший фокус. Запоминается вместе с выбранным табом, чтобы смена выбора сбрасывала его. */
        const [lastFocusedTab, setLastFocusedTab] = useState<ILastFocusedTab | null>(null);
        /** Id таба, предшествующего табу в фокусе. */
        const [prevAvailableToFocusTabId, setPrevAvailableToFocusTabId] = useState("");
        /** Id таба, следующего за табом в фокусе. */
        const [nextAvailableToFocusTabId, setNextAvailableToFocusTabId] = useState("");
        /** Ref таба, предшествующего табу в фокусе. */
        const prevTabRef = useRef<HTMLButtonElement>(null);
        /** Ref таба, следующего за табом в фокусе. */
        const nextTabRef = useRef<HTMLButtonElement>(null);

        /** Опции выпадающего списка — табы, не поместившиеся в строку. */
        const getDropdownOptions = ({
            dropdownItemsIds,
            onSelectTab: onSelectDropdownTab,
        }: ITabsExtendedDropdownWrapperProvideProps) =>
            tabs
                .filter((tab) => dropdownItemsIds.includes(tab.id))
                .map((tab) => ({ ...tab, onSelect: () => onSelectDropdownTab(tab.id) }));

        /**
         * Кандидаты на таб-порядок страницы: в него попадает только один таб, остальные обходятся стрелками.
         * Первый кандидат — таб, последним получивший фокус, пока выбран тот же таб, что и в момент фокуса: смена выбора,
         * в том числе извне через selectedId, его сбрасывает. Второй — выбранный таб (или первый, если selectedId пуст).
         */
        const focusCandidateTabIds = [
            ...(lastFocusedTab?.selectedId === selectedId ? [lastFocusedTab.tabId] : []),
            selectedId || tabs[0]?.id || "",
        ];

        /**
         * Id табов, отображаемых в строке. Сверяются с текущим tabs: TabsExtended пересчитывает раскладку только
         * при смене числа табов или ширины, и после замены tabs на массив той же длины в inlineItemsIds остаются старые id.
         */
        const getInlineTabIds = (inlineItemsIds: string[]) =>
            tabs.filter((tab) => inlineItemsIds.includes(tab.id)).map((tab) => tab.id);

        const renderTab = (item: ITabsItem, index: number) => {
            // label и showNotificationIcon — props кнопки таба, на контейнер таба (span) они уходить не должны.
            const { label, showNotificationIcon, ...tabProps } = item;

            return (
                <TabsExtended.Content.Tab key={item.id} {...tabProps}>
                    {({ selected, isFirstInlineTab, isLastInlineTab }) => {
                        /** Ref ставится только соседям фокусируемого таба — по нему стрелки переносят фокус. */
                        const getTabRef = () => {
                            if (prevAvailableToFocusTabId === item.id) {
                                return prevTabRef;
                            }

                            if (nextAvailableToFocusTabId === item.id) {
                                return nextTabRef;
                            }

                            return undefined;
                        };

                        /**
                         * Таб, получивший фокус (стрелкой или кликом), становится единственным табом с tabIndex = 0.
                         * Его соседи запоминаются заранее: стрелка переносит фокус по ref, а не поиском в DOM.
                         */
                        const handleFocus = () => {
                            setLastFocusedTab({ tabId: item.id, selectedId });
                            setPrevAvailableToFocusTabId(tabs[index - 1]?.id ?? "");
                            setNextAvailableToFocusTabId(tabs[index + 1]?.id ?? "");
                        };

                        const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
                            const { key } = event;
                            const isArrowLeft = isKey(key, "ARROW_LEFT");

                            if (!isArrowLeft && !isKey(key, "ARROW_RIGHT")) {
                                return;
                            }

                            // На краях строки фокус остаётся на месте: влево с первого таба и вправо с последнего он не уходит.
                            const isEdgeTab = isArrowLeft ? isFirstInlineTab : isLastInlineTab;
                            const siblingTab = isEdgeTab ? undefined : tabs[isArrowLeft ? index - 1 : index + 1];

                            // tabIndex = 0 переходит на соседа в его обработчике фокуса.
                            if (siblingTab) {
                                (isArrowLeft ? prevTabRef : nextTabRef).current?.focus();
                            }

                            // Предотвращение скролла.
                            event.preventDefault();
                        };

                        return (
                            // Распределение табов по строке и выпадающему списку знает только TabsExtended.
                            <TabsExtendedContext.Consumer>
                                {({ inlineItemsIds }) => (
                                    <TabsExtended.Content.TabButton
                                        selected={selected}
                                        tabIndex={
                                            getFocusableTabId(focusCandidateTabIds, getInlineTabIds(inlineItemsIds)) ===
                                            item.id
                                                ? 0
                                                : -1
                                        }
                                        ref={getTabRef()}
                                        size={size}
                                        showNotificationIcon={showNotificationIcon}
                                        onFocus={handleFocus}
                                        onKeyDown={handleKeyDown}
                                    >
                                        {label}
                                    </TabsExtended.Content.TabButton>
                                )}
                            </TabsExtendedContext.Consumer>
                        );
                    }}
                </TabsExtended.Content.Tab>
            );
        };

        return (
            <TabsExtended {...props} selectedId={selectedId} onSelectTab={onSelectTab} type={type} ref={ref}>
                <TabsExtended.Content className={styles.tabsContent} size={size}>
                    <TabsExtended.Content.TabsWrapper>{tabs.map(renderTab)}</TabsExtended.Content.TabsWrapper>

                    <TabsExtended.Content.DropdownWrapper>
                        {({ dropdownItemsIds, onSelectTab: onSelectDropdownTab }) => (
                            <ButtonDropdown
                                theme={TYPE_TO_BUTTON_DOTS_THEME_MAP[type]}
                                size={size}
                                options={getDropdownOptions({ dropdownItemsIds, onSelectTab: onSelectDropdownTab })}
                                selected={tabs.find((tab) => tab.id === selectedId)}
                                buttonAttributes={{
                                    ...buttonDropdownAttributes,
                                    className: clsx(
                                        styles.tabButtonDropdown,
                                        styles[size],
                                        TYPE_TO_CLASS_NAME_MAP[type],
                                        { [styles.selected]: dropdownItemsIds.includes(selectedId) },
                                        buttonDropdownAttributes?.className,
                                    ),
                                }}
                            />
                        )}
                    </TabsExtended.Content.DropdownWrapper>
                </TabsExtended.Content>
            </TabsExtended>
        );
    },
);

Tabs.displayName = "Tabs";
