import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { CaretdownStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { TestProps } from "../../../types/CoreTypes";
import { isKey } from "../../../utils/keyboard";
import { Dropdown, DropdownList, DropdownListContext, EDropdownWidth } from "../../Dropdown";
import { Text, EFontType } from "../../Typography";
import { tabsLineSizeToTextSizeMap } from "../utils";
import { ITabsLineItemProps } from "./TabsLineItem";
import styles from "../styles/TabsLine.module.less";

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
    /** Размер таба кнопки дропдауна. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
    /** Атрибуты кнопки дропдауна. */
    targetHtmlAttributes?: React.HTMLAttributes<HTMLButtonElement> & TestProps;
}

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Таб-кнопка TabsLine, раскрывающая выпадающий список с не поместившимися табами. */
export const TabsLineDropdown = React.forwardRef<HTMLDivElement, ITabsLineDropdownProps>((props, ref) => {
    const {
        className,
        tabs,
        active,
        label,
        onClickTab,
        selected,
        size = EComponentSize.MD,
        targetHtmlAttributes,
        ...htmlDivAttributes
    } = props;

    const [activeDescendant, setActiveDescendant] = useState<string | undefined>(undefined);
    const [opened, setOpened] = useState(false);
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);

    const targetRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const instanceId = useRef(uniqueId());

    /** Корневой элемент нужен и снаружи (forwarded ref), и внутри — по нему позиционируется Dropdown. */
    const setRootRef = useCallback(
        (node: HTMLDivElement | null) => {
            targetRef.current = node;

            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        },
        [ref],
    );

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
        setOpened((prevOpened) => !prevOpened);
    };

    const handleTargetKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (!opened) {
            // Enter и Space раскрывают список нативной активацией кнопки, ArrowUp/ArrowDown обрабатываются здесь.
            if (isKey(event.code, "ARROW_UP") || isKey(event.code, "ARROW_DOWN")) {
                event.preventDefault();
                setOpened(true);
            }
        } else {
            // При нажатии Tab или Esc закрывается выпадающий список.
            if (isKey(event.code, "TAB") || isKey(event.code, "ESCAPE")) {
                setOpened(false);
            }
        }
    };

    const handleClickTab = (tab: ITabsLineItemProps) => {
        onClickTab(tab);
        setOpened(false);
    };

    const handleTargetFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        setFocused(true);
        targetHtmlAttributes?.onFocus?.(event);
    };

    const handleTargetBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
        setFocused(false);
        targetHtmlAttributes?.onBlur?.(event);
    };

    const handleTargetMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setHovered(true);
        targetHtmlAttributes?.onMouseEnter?.(event);
    };

    const handleTargetMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
        setHovered(false);
        targetHtmlAttributes?.onMouseLeave?.(event);
    };

    const renderTarget = () => {
        const { onFocus, onBlur, onMouseEnter, onMouseLeave, ...restTargetHtmlAttributes } = targetHtmlAttributes || {};

        return (
            <button
                {...restTargetHtmlAttributes}
                onFocus={handleTargetFocus}
                onBlur={handleTargetBlur}
                onMouseEnter={handleTargetMouseEnter}
                onMouseLeave={handleTargetMouseLeave}
                className={clsx(styles.tab, SIZE_TO_CLASS_NAME_MAP[size], styles.dropdownTarget, {
                    [styles.active]: active,
                })}
                onClick={handleTargetClick}
                onKeyDown={handleTargetKeyDown}
                type="button"
                role="tab"
                aria-haspopup="menu"
                aria-expanded={opened}
                aria-controls={instanceId.current}
                aria-activedescendant={activeDescendant}
            >
                <span className={styles.dropdownTargetInner}>
                    <Text
                        size={tabsLineSizeToTextSizeMap[size]}
                        type={active || focused || hovered ? EFontType.PRIMARY : EFontType.SECONDARY}
                    >
                        {label}
                    </Text>
                    <CaretdownStrokeSrvIcon16
                        className={clsx(styles.dropdownTargetCaret, { [styles.opened]: opened })}
                        paletteIndex={5}
                    />
                </span>
            </button>
        );
    };

    const renderDropdown = () => (
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
                        const { id, label: tabLabel, showNotificationIcon, ...htmlButtonAttributes } = tab;

                        return (
                            <DropdownList.Item
                                // Свойства таба типизированы под <button>, а пункт списка рендерит <div>.
                                // Набор атрибутов совпадает, расходятся только дженерики обработчиков событий.
                                {...(htmlButtonAttributes as React.HTMLAttributes<HTMLDivElement>)}
                                id={id}
                                key={id}
                                onSelect={() => {
                                    handleClickTab(tab);
                                }}
                                selected={tab === selected}
                                showNotificationIcon={showNotificationIcon}
                            >
                                {tabLabel}
                            </DropdownList.Item>
                        );
                    })}
                </DropdownList>
            </DropdownListContext.Provider>
        </Dropdown>
    );

    return (
        <div {...htmlDivAttributes} className={clsx(styles.tabsLineDropdown, className)} ref={setRootRef}>
            {renderTarget()}
            {renderDropdown()}
        </div>
    );
});

TabsLineDropdown.displayName = "TabsLineDropdown";
