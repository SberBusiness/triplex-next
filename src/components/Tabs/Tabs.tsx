import React, { useRef, useState } from "react";
import { TabsExtended } from "@sberbusiness/triplex-next/components/TabsExtended";
import { ITabsExtendedDropdownWrapperProvideProps } from "@sberbusiness/triplex-next/components/TabsExtended";
import { ButtonDropdown } from "@sberbusiness/triplex-next/components/Button";
import { EButtonDotsTheme } from "@sberbusiness/triplex-next/components/Button";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ITabsExtendedTabProps, ITabsExtendedProps } from "@sberbusiness/triplex-next/components/TabsExtended";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import styles from "./styles/Tabs.module.less";
import clsx from "clsx";

export interface ITabsItem extends Omit<ITabsExtendedTabProps, "children" | "onSelect"> {
    label: React.ReactNode;
    showNotificationIcon?: boolean;
}

export interface ITabsProps extends ITabsExtendedProps {
    /** HTML-атрибуты dropdown-кнопки. */
    buttonDropdownAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    children?: never;
    /** Обработчик выбора таба. */
    onSelectTab: (selectedId: string) => void;
    /** Размер компонента. */
    size?: EComponentSize;
    /** Массив табов. */
    tabs: Array<ITabsItem>;
}

/** Компонент Tabs. */
export const Tabs: React.FC<ITabsProps> = ({
    buttonDropdownAttributes,
    selectedId,
    onSelectTab,
    size = EComponentSize.MD,
    tabs,
    ...props
}) => {
    // Id таба с tabIndex = 0;
    const [availableToFocusTabId, setAvailableToFocusTabId] = useState(selectedId || tabs[0].id);
    // Id таба, предшествующий табу с tabIndex = 0;
    const [prevAvailableToFocusTabId, setPrevAvailableToFocusTabId] = useState("");
    // Id таба, следующего за табом с tabIndex = 0;
    const [nextAvailableToFocusTabId, setNextAvailableToFocusTabId] = useState("");
    // Ref таба, предшествующий табу с tabIndex = 0;
    const prevTabRef = useRef<HTMLButtonElement>(null);
    // Ref таба, следующего за табом с tabIndex = 0;
    const nextTabRef = useRef<HTMLButtonElement>(null);

    const getDropdownOptions = ({ dropdownItemsIds, onSelectTab }: ITabsExtendedDropdownWrapperProvideProps) =>
        tabs
            .filter((tab) => dropdownItemsIds.includes(tab.id))
            .map((tab) => ({ ...tab, onSelect: () => onSelectTab(tab.id) }));

    const renderTab = (item: ITabsItem, index: number) => {
        return (
            <TabsExtended.Content.Tab key={index} {...item}>
                {({ selected, isFirstInlineTab, isLastInlineTab }) => {
                    const tabIndex = availableToFocusTabId === item.id ? 0 : -1;

                    const getRef = () => {
                        let ref = undefined;

                        if (prevAvailableToFocusTabId === item.id) {
                            ref = prevTabRef;
                        } else if (nextAvailableToFocusTabId === item.id) {
                            ref = nextTabRef;
                        }

                        return ref;
                    };

                    return (
                        <TabsExtended.Content.TabButton
                            selected={selected}
                            tabIndex={tabIndex}
                            /* Установка ref для предыдущего или следующего за фокусируемым табом элемента, */
                            ref={getRef()}
                            size={size}
                            showNotificationIcon={item.showNotificationIcon}
                            onFocus={() => {
                                setPrevAvailableToFocusTabId(tabs[index - 1] ? tabs[index - 1].id : "");
                                setNextAvailableToFocusTabId(tabs[index + 1] ? tabs[index + 1].id : "");
                            }}
                            onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                                const { key } = event;

                                if (isKey(key, "ARROW_LEFT")) {
                                    // Не первый таб.
                                    if (!isFirstInlineTab) {
                                        setAvailableToFocusTabId(tabs[index - 1].id);
                                        prevTabRef.current?.focus();
                                    }

                                    // Предотвращение скролла.
                                    event.preventDefault();
                                } else if (isKey(key, "ARROW_RIGHT")) {
                                    // Не последний таб в строке.
                                    if (!isLastInlineTab) {
                                        setAvailableToFocusTabId(tabs[index + 1].id);
                                        nextTabRef.current?.focus();
                                    }

                                    // Предотвращение скролла.
                                    event.preventDefault();
                                }
                            }}
                        >
                            {item.label}
                        </TabsExtended.Content.TabButton>
                    );
                }}
            </TabsExtended.Content.Tab>
        );
    };

    return (
        <TabsExtended {...props} selectedId={selectedId} onSelectTab={onSelectTab}>
            <TabsExtended.Content className={styles.tabsContent} size={size}>
                <TabsExtended.Content.TabsWrapper>{tabs.map(renderTab)}</TabsExtended.Content.TabsWrapper>

                <TabsExtended.Content.DropdownWrapper>
                    {({ dropdownItemsIds, onSelectTab }) => (
                        <ButtonDropdown
                            theme={EButtonDotsTheme.DOTS_SECONDARY}
                            size={size}
                            options={getDropdownOptions({ dropdownItemsIds, onSelectTab })}
                            selected={tabs.filter((tab) => tab.id === selectedId)[0]}
                            buttonAttributes={{
                                ...buttonDropdownAttributes,
                                className: clsx(styles.tabButtonDropdown, styles[size]),
                            }}
                        />
                    )}
                </TabsExtended.Content.DropdownWrapper>
            </TabsExtended.Content>
        </TabsExtended>
    );
};
