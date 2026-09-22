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

/**
 * Компонент Tabs.
 * Готовые табы поверх TabsExtended: рендерит табы по массиву, переносит не поместившиеся в выпадающий список
 * и добавляет навигацию стрелками.
 */
export const Tabs: React.FC<ITabsProps> = ({
    buttonDropdownAttributes,
    selectedId,
    onSelectTab,
    size = EComponentSize.MD,
    tabs,
    type = ETabsExtendedType.TYPE_1,
    ...props
}) => {
    /** Id таба с tabIndex = 0: в таб-порядок страницы попадает только один таб, остальные обходятся стрелками. */
    const [availableToFocusTabId, setAvailableToFocusTabId] = useState(selectedId || tabs[0]?.id || "");
    /** Id таба, предшествующего табу с tabIndex = 0. */
    const [prevAvailableToFocusTabId, setPrevAvailableToFocusTabId] = useState("");
    /** Id таба, следующего за табом с tabIndex = 0. */
    const [nextAvailableToFocusTabId, setNextAvailableToFocusTabId] = useState("");
    /** Ref таба, предшествующего табу с tabIndex = 0. */
    const prevTabRef = useRef<HTMLButtonElement>(null);
    /** Ref таба, следующего за табом с tabIndex = 0. */
    const nextTabRef = useRef<HTMLButtonElement>(null);

    /** Опции выпадающего списка — табы, не поместившиеся в строку. */
    const getDropdownOptions = ({
        dropdownItemsIds,
        onSelectTab: onSelectDropdownTab,
    }: ITabsExtendedDropdownWrapperProvideProps) =>
        tabs
            .filter((tab) => dropdownItemsIds.includes(tab.id))
            .map((tab) => ({ ...tab, onSelect: () => onSelectDropdownTab(tab.id) }));

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

                    /** Соседи фокусируемого таба запоминаются заранее: стрелка переносит фокус по ref, а не поиском в DOM. */
                    const handleFocus = () => {
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

                        if (siblingTab) {
                            setAvailableToFocusTabId(siblingTab.id);
                            (isArrowLeft ? prevTabRef : nextTabRef).current?.focus();
                        }

                        // Предотвращение скролла.
                        event.preventDefault();
                    };

                    return (
                        <TabsExtended.Content.TabButton
                            selected={selected}
                            tabIndex={availableToFocusTabId === item.id ? 0 : -1}
                            ref={getTabRef()}
                            size={size}
                            showNotificationIcon={showNotificationIcon}
                            onFocus={handleFocus}
                            onKeyDown={handleKeyDown}
                        >
                            {label}
                        </TabsExtended.Content.TabButton>
                    );
                }}
            </TabsExtended.Content.Tab>
        );
    };

    return (
        <TabsExtended {...props} selectedId={selectedId} onSelectTab={onSelectTab} type={type}>
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
};
