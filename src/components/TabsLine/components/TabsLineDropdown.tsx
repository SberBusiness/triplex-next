import React from "react";
import clsx from "clsx";
import { TestProps } from "../../../types/CoreTypes";
import { Dropdown } from "../../Dropdown";
import { DropdownList } from "../../Dropdown/desktop/DropdownList";
import { CaretdownStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { isKey } from "../../../utils/keyboard";
import { DropdownListContext } from "../../Dropdown/DropdownListContext";
import { uniqueId } from "lodash-es";
import { ITabsLineItemProps } from "./TabsLineItem";
import styles from "../styles/TabsLine.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";

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

/** Состояние компонента TabsLineDropdown. */
interface ITabsLineDropdownState {
    /** Текущий активный элемент (его идентификатор). */
    activeDescendant?: string;
    /** Состояние открытости дропдауна. */
    opened: boolean;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Компонент TabsLineDropdown. */
export class TabsLineDropdown extends React.PureComponent<ITabsLineDropdownProps, ITabsLineDropdownState> {
    state = {
        activeDescendant: undefined,
        opened: false,
    };

    private readonly targetRef: React.RefObject<HTMLDivElement>;
    private readonly dropdownRef: React.RefObject<HTMLDivElement>;
    private instanceId = uniqueId();

    constructor(props: ITabsLineDropdownProps) {
        super(props);

        this.targetRef = React.createRef();
        this.dropdownRef = React.createRef();
    }

    public componentDidMount(): void {
        document.addEventListener("mouseup", this.handleClickOutside);
    }

    public componentWillUnmount(): void {
        document.removeEventListener("mouseup", this.handleClickOutside);
    }

    public render(): JSX.Element {
        return (
            <div className={styles.tabsLineDropdown} ref={this.targetRef}>
                {this.renderTarget()}
                {this.renderDropdown()}
            </div>
        );
    }

    /** Установка значения activeDescendant. */
    private setActiveDescendant = (activeDescendant?: string) => {
        this.setState({ activeDescendant });
    };

    /** Рендер кнопки, раскрывающей список. */
    private renderTarget = () => {
        const { active, label, targetHtmlAttributes, size = EComponentSize.MD } = this.props;
        const { activeDescendant, opened } = this.state;

        const buttonClassName = clsx(styles.tab, sizeToClassNameMap[size], styles.dropdownTarget, {
            [styles.active]: active,
        });
        const caretClassName = clsx(styles.dropdownTargetCaret, { [styles.opened]: opened });

        return (
            <button
                {...targetHtmlAttributes}
                className={buttonClassName}
                onClick={this.handleTargetClick}
                onKeyDown={this.handleTargetKeyDown}
                type="button"
                role="tab"
                aria-haspopup="menu"
                aria-expanded={opened}
                aria-controls={this.instanceId}
                aria-activedescendant={activeDescendant}
            >
                <span className={styles.tabInner}>
                    <span className={styles.dropdownTargetInner}>
                        {label}
                        <CaretdownStrokeSrvIcon16 className={caretClassName} paletteIndex={5} />
                    </span>
                </span>
            </button>
        );
    };

    /** Рендер дропдаун списка. */
    private renderDropdown = () => {
        const { selected, tabs } = this.props;
        const { activeDescendant, opened } = this.state;

        return (
            <Dropdown
                className={styles.dropdown}
                opened={opened}
                setOpened={this.setOpenedDropdown}
                targetRef={this.targetRef}
                ref={this.dropdownRef}
            >
                <DropdownListContext.Provider
                    value={{ activeDescendant, setActiveDescendant: this.setActiveDescendant }}
                >
                    <DropdownList dropdownOpened={opened} id={this.instanceId}>
                        {tabs.map((tab) => {
                            const { id, label, showNotificationIcon, ...htmlDivAttributes } = tab;
                            const className = clsx(styles.dropdownItem, {
                                [styles.withNotification]: Boolean(tab.showNotificationIcon),
                            });

                            return (
                                <DropdownList.Item
                                    {...(htmlDivAttributes as React.HTMLAttributes<HTMLDivElement>)}
                                    className={className}
                                    id={tab.id}
                                    key={tab.id}
                                    onSelect={() => {
                                        this.handleClickTab(tab);
                                    }}
                                    selected={tab === selected}
                                >
                                    <span className={styles.dropdownItemInner}>{tab.label}</span>
                                    {tab.showNotificationIcon && <span className={styles.notificationIcon} />}
                                </DropdownList.Item>
                            );
                        })}
                    </DropdownList>
                </DropdownListContext.Provider>
            </Dropdown>
        );
    };

    /** Открывает/закрывает Dropdown. */
    private setOpenedDropdown = (opened: boolean) => {
        this.setState({ opened });
    };

    /** Обработчик кнопки, раскрывающей список. */
    private handleTargetClick = () => {
        const { opened } = this.state;
        this.setState({ opened: !opened });
    };

    /** Обработчик клика по табу. */
    private handleClickTab = (tab: ITabsLineItemProps) => {
        const { onClickTab } = this.props;
        const { opened } = this.state;

        onClickTab(tab);
        this.setState({ opened: !opened });
    };

    /** Обработчик нажатия клавиш по кнопке, раскрывающей список. */
    private handleTargetKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const { opened } = this.state;

        if (!opened) {
            // При нажатии Enter, Space, ArrowUp или ArrowDown открывается выпадающий список.
            if (isKey(event.code, "ARROW_UP") || isKey(event.code, "ARROW_DOWN")) {
                event.preventDefault();
                this.setState({ opened: true });
            }
        }

        if (opened) {
            // При нажатии Tab или Esc закрывается выпадающий список.
            if (isKey(event.code, "TAB") || isKey(event.code, "ESCAPE")) {
                this.setState({ opened: false });
            }
        }
    };

    /** Обработчик клика вне дропдауна. */
    private handleClickOutside = (event: Event) => {
        const { opened } = this.state;

        if (opened) {
            if (
                !this.targetRef.current?.contains(event.target as Node) &&
                !this.dropdownRef.current?.contains(event.target as Node)
            ) {
                this.setState({ opened: false });
            }
        }
    };
}
