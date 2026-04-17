import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { TestProps } from "../../../types/CoreTypes";
import { Dropdown, DropdownList, DropdownListContext, EDropdownWidth } from "../../Dropdown";
import { CaretdownStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { isKey } from "../../../utils/keyboard";
import { uniqueId } from "lodash-es";
import { ITabsLineItemProps } from "./TabsLineItem";
import styles from "../styles/TabsLine.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { Text, EFontType } from "../../Typography";
import { tabsLineSizeToTextSizeMap } from "../utils";

/** Свойства компонента TabsLineDropdown. */
interface ITabsLineDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Табы дропдауна. */
    tabs: ITabsLineItemProps[];
    /** Выбранный таб находится в дропдауне. */
    active: boolean;
    /** Текст таргет кнопки дропдауна. */
    label: string;
    /** Коллбэк выбора таба. */
    onClickTab: (tab: ITabsLineItemProps) => void;
    /** Выбранный таб. */
    selected?: ITabsLineItemProps;
    /** Размер таба кнопки дропдауна. */
    size?: EComponentSize;
    /** Атрибуты кнопки дропдауна. */
    targetHtmlAttributes?: React.HTMLAttributes<HTMLButtonElement> & TestProps;
}

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

export const TabsLineDropdown: React.FC<ITabsLineDropdownProps> = ({
    tabs,
    active,
    label,
    onClickTab,
    selected,
    size = EComponentSize.MD,
    targetHtmlAttributes,
    ...rest
}) => {
    const [activeDescendant, setActiveDescendant] = useState<string | undefined>(undefined);
    const [opened, setOpened] = useState(false);
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);

    const targetRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const instanceId = useRef(uniqueId());

    useEffect(() => {
        if (!opened) {
            return;
        }

        const handleClickOutside = (event: Event) => {
            if (
                !targetRef.current?.contains(event.target as Node) &&
                !dropdownRef.current?.contains(event.target as Node)
            ) {
                setOpened(false);
            }
        };

        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [opened]);

    const handleTargetClick = () => {
        setOpened(!opened);
    };

    const handleTargetKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (!opened) {
            // При нажатии Enter, Space, ArrowUp или ArrowDown открывается выпадающий список.
            if (isKey(event.code, "ARROW_UP") || isKey(event.code, "ARROW_DOWN")) {
                event.preventDefault();
                setOpened(true);
            }
        }

        if (opened) {
            // При нажатии Tab или Esc закрывается выпадающий список.
            if (isKey(event.code, "TAB") || isKey(event.code, "ESCAPE")) {
                setOpened(false);
            }
        }
    };

    const handleClickTab = (tab: ITabsLineItemProps) => {
        onClickTab(tab);
        setOpened(!opened);
    };

    const renderTarget = () => {
        const { onFocus, onBlur, onMouseEnter, onMouseLeave, ...restTargetHtmlAttributes } = targetHtmlAttributes || {};

        const buttonClassName = clsx(styles.tab, SIZE_TO_CLASS_NAME_MAP[size], styles.dropdownTarget, {
            [styles.active]: active,
        });

        const caretClassName = clsx(styles.dropdownTargetCaret, { [styles.opened]: opened });

        const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
            setFocused(true);
            onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
            setFocused(false);
            onBlur?.(e);
        };

        const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
            setHovered(true);
            onMouseEnter?.(e);
        };

        const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
            setHovered(false);
            onMouseLeave?.(e);
        };

        return (
            <button
                {...restTargetHtmlAttributes}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={buttonClassName}
                onClick={handleTargetClick}
                onKeyDown={handleTargetKeyDown}
                type="button"
                role="tab"
                aria-haspopup="menu"
                aria-expanded={opened}
                aria-controls={instanceId.current}
                aria-activedescendant={activeDescendant}
            >
                <span className={styles.tabInner}>
                    <span className={styles.dropdownTargetInner}>
                        <Text
                            size={tabsLineSizeToTextSizeMap[size]}
                            type={active || focused || hovered ? EFontType.PRIMARY : EFontType.SECONDARY}
                        >
                            {label}
                        </Text>
                        <CaretdownStrokeSrvIcon16 className={caretClassName} paletteIndex={5} />
                    </span>
                </span>
            </button>
        );
    };

    const renderDropdown = () => {
        return (
            <Dropdown
                className={styles.dropdown}
                opened={opened}
                setOpened={setOpened}
                size={size}
                width={EDropdownWidth.MIN_TARGET}
                targetRef={targetRef}
                ref={dropdownRef}
            >
                <DropdownListContext.Provider value={{ activeDescendant, setActiveDescendant }}>
                    <DropdownList dropdownOpened={opened} id={instanceId.current} size={size}>
                        {tabs.map((tab) => {
                            const { id, label, showNotificationIcon, ...htmlDivAttributes } = tab;
                            const className = clsx(styles.dropdownItem);

                            return (
                                <DropdownList.Item
                                    {...(htmlDivAttributes as React.HTMLAttributes<HTMLDivElement>)}
                                    className={className}
                                    id={id}
                                    key={id}
                                    onSelect={() => {
                                        handleClickTab(tab);
                                    }}
                                    selected={tab === selected}
                                    showNotificationIcon={showNotificationIcon}
                                >
                                    <span className={styles.dropdownItemInner}>{label}</span>
                                </DropdownList.Item>
                            );
                        })}
                    </DropdownList>
                </DropdownListContext.Provider>
            </Dropdown>
        );
    };

    return (
        <div className={styles.tabsLineDropdown} ref={targetRef} {...rest}>
            {/* eslint-disable-next-line react-hooks/refs */}
            {renderTarget()}
            {/* eslint-disable-next-line react-hooks/refs */}
            {renderDropdown()}
        </div>
    );
};
