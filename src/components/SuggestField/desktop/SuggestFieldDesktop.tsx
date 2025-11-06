import React from "react";
import clsx from "clsx";
import isFunction from "lodash-es/isFunction";
import { ISuggestFieldDesktopProps } from "@sberbusiness/triplex-next/components/SuggestField/desktop/types";
import {
    ISuggestFieldOption,
    ISuggestFieldDropdownProps,
    ISuggestFieldDropdownItemProps,
    ISuggestFieldDropdownItemLabelProps,
    TSetRef,
} from "@sberbusiness/triplex-next/components/SuggestField/types";
import { Tooltip, ETooltipSize } from "@sberbusiness/triplex-next/components/Tooltip";
import { SuggestFieldTarget } from "@sberbusiness/triplex-next/components/SuggestField/SuggestFieldTarget";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";
import { Dropdown, DropdownList, DropdownListContext } from "@sberbusiness/triplex-next/components/Dropdown";
import { SuggestFieldDesktopDropdownItemLabel } from "@sberbusiness/triplex-next/components/SuggestField/desktop/SuggestFieldDesktopDropdownItemLabel";
import { uniqueId } from "@sberbusiness/triplex-next/utils/uniqueId";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { TestIds } from "@sberbusiness/triplex-next/dataTestIds/dataTestId";
import { debounce } from "@sberbusiness/triplex-next/utils/debounce";
import styles from "../styles/SuggestFieldDesktop.module.less";

/** Состояния компонента SuggestFieldDesktop. */
interface ISuggestFieldDesktopState {
    /** Значение Input. */
    inputValue: string;
    /** Идентификатор текущего активного элемента списка. */
    activeDescendant: string | undefined;
    /** Состояние поля ввода - в фокусе/не в фокусе. */
    inputFocused: boolean;
    /** Состояние выпадающего списка – открыт/закрыт. */
    dropdownOpen: boolean;
    /** Состояние выпадающего списка – отключен/включен. */
    dropdownDisabled: boolean;
}

const KEY_CODES_SELECTABLE = [EVENT_KEY_CODES.ENTER];

/**
 * Выпадающий список с возможностью поиска по введённому значению, позволяет задать кастомные компоненты для отображения всех
 * элементов управления.
 */
export class SuggestFieldDesktop<T extends ISuggestFieldOption = ISuggestFieldOption> extends React.Component<
    ISuggestFieldDesktopProps<T>,
    ISuggestFieldDesktopState
> {
    public state = {
        inputValue: this.props.value?.label || "",
        activeDescendant: undefined,
        inputFocused: false,
        dropdownOpen: false,
        dropdownDisabled: false,
    };

    public static defaultProps = {
        loading: false,
        clearInputOnFocus: false,
    };

    private dropdownListId = uniqueId();

    private static readonly displayName: string = "SuggestFieldDesktop";
    private suggestRef = React.createRef<HTMLInputElement>();
    private listRef = React.createRef<HTMLDivElement>();

    public componentDidUpdate(
        prevProps: Readonly<ISuggestFieldDesktopProps<T>>,
        prevState: Readonly<ISuggestFieldDesktopState>,
    ): void {
        if (this.props.value !== prevProps.value) {
            this.setState({
                inputValue: this.props.value?.label || "",
            });
        }

        if (this.state.inputFocused === true) {
            if (this.state.dropdownOpen === true) {
                if (this.props.options.length === 0) {
                    this.setState({ dropdownOpen: false });
                }
            } else if (this.state.dropdownDisabled === false) {
                if (this.props.options.length !== 0) {
                    this.setState({ dropdownOpen: true });
                }
            }
        }

        if (this.state.dropdownOpen === true && prevState.dropdownOpen === false) {
            // Таймаут тк listRef.current будет доступен только после рендера DropdownList.
            setTimeout(() => this.listRef?.current?.addEventListener("scroll", this.onScrollList));
        }
    }

    public componentWillUnmount(): void {
        this.listRef?.current?.removeEventListener("scroll", this.onScrollList);
    }

    public render(): React.ReactElement {
        const { status, tooltipHint, tooltipOpen, "data-test-id": dataTestId } = this.props;
        const { inputFocused } = this.state;

        return (
            <Tooltip
                size={ETooltipSize.SM}
                isOpen={!!(tooltipOpen && inputFocused) && status !== EFormFieldStatus.DISABLED}
                toggle={() => {}}
                targetRef={this.suggestRef}
                disableAdaptiveMode
            >
                <Tooltip.Body data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.tooltip}`}>
                    {tooltipHint}
                </Tooltip.Body>
                <Tooltip.Target>{this.renderSuggestField()}</Tooltip.Target>
            </Tooltip>
        );
    }

    private renderSuggestField(): React.ReactElement {
        const {
            className,
            value,
            options,
            label,
            placeholder,
            size,
            status,
            loading,
            dropdownListLoading,
            renderTarget,
            renderTargetInput,
            renderTargetLabel,
            renderTargetPrefix,
            renderTargetPostfix,
            renderDropdown,
            renderDropdownItem,
            renderDropdownItemLabel,
            // omit
            tooltipHint,
            tooltipOpen,
            clearInputOnFocus,
            onSelect,
            onFilter,
            onScrollEnd,
            onTargetInputFocus,
            onTargetInputBlur,
            "data-test-id": dataTestId,
            ...restProps
        } = this.props;
        const { inputValue, activeDescendant, dropdownOpen } = this.state;
        const classNames = clsx(styles.suggestFieldDesktop, "hoverable", className);
        const Target = renderTarget === undefined ? SuggestFieldTarget : renderTarget;

        return (
            <div className={classNames} {...restProps} ref={this.setSuggestRef}>
                <DropdownListContext.Provider
                    value={{ activeDescendant, setActiveDescendant: this.setActiveDescendant }}
                >
                    <Target
                        className={styles.suggestDesktopTarget}
                        inputValue={inputValue}
                        label={label}
                        placeholder={placeholder}
                        aria-controls={this.dropdownListId}
                        aria-activedescendant={activeDescendant}
                        size={size!}
                        status={status}
                        loading={loading}
                        onClick={this.handleClick}
                        onClear={this.handleClear}
                        onInputFocus={this.handleTargetInputFocus}
                        onInputBlur={this.handleTargetInputBlur}
                        onInputChange={this.handleInputChange}
                        renderInput={renderTargetInput}
                        renderLabel={renderTargetLabel}
                        renderPrefix={renderTargetPrefix}
                        renderPostfix={renderTargetPostfix}
                    />
                    {this.renderDropdown({
                        dataTestId,
                        listId: this.dropdownListId,
                        listRef: this.listRef,
                        onSelect: this.handleSelect,
                        opened: dropdownOpen && options.length > 0,
                        options,
                        renderCustom: renderDropdown,
                        renderDropdownItem: this.renderDropdownItem,
                        renderDropdownItemLabel,
                        setOpened: this.handleDropdownOpen,
                        size: size,
                        listLoading: dropdownListLoading,
                        suggestDropdownItemClassName: styles.suggestDropdownListItem,
                        suggestDropdownListClassName: styles.suggestDropdownList,
                        targetRef: this.suggestRef,
                        value,
                    })}
                </DropdownListContext.Provider>
            </div>
        );
    }

    private setActiveDescendant = (id?: string) => {
        const { activeDescendant } = this.state;

        if (activeDescendant !== id) {
            this.setState({ activeDescendant: id });
        }
    };

    private renderDropdown = (props: ISuggestFieldDropdownProps<T>) => {
        if (isFunction(props.renderCustom)) {
            return props.renderCustom(props);
        }

        const {
            value,
            size,
            opened,
            listLoading,
            className,
            dataTestId,
            listId,
            renderDropdownItem,
            renderDropdownItemLabel,
            options,
            onSelect,
            listRef,
            targetRef,
            setOpened,
            suggestDropdownListClassName,
            suggestDropdownItemClassName,
        } = props;

        return (
            <Dropdown
                className={className}
                size={size}
                opened={opened}
                fixedWidth={true}
                targetRef={targetRef}
                setOpened={setOpened}
                data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.dropdown}`}
            >
                <DropdownList
                    id={listId}
                    className={suggestDropdownListClassName}
                    size={size}
                    dropdownOpened={opened}
                    loading={listLoading}
                    listRef={listRef}
                    onMouseDown={(event) => event.preventDefault()}
                >
                    {options?.map((option) =>
                        renderDropdownItem({
                            className: suggestDropdownItemClassName,
                            dataTestId,
                            key: option.id,
                            onMouseDown: (event) => event.preventDefault(),
                            onSelect,
                            option,
                            renderCustom: this.props.renderDropdownItem,
                            renderDropdownItemLabel,
                            selected: option.id === value?.id,
                        }),
                    )}
                </DropdownList>
            </Dropdown>
        );
    };

    private renderDropdownItem = (props: ISuggestFieldDropdownItemProps<T>) => {
        if (props.renderCustom) {
            return props.renderCustom(props);
        }

        const {
            active,
            dataTestId,
            selected,
            key,
            option,
            onSelect,
            renderCustom,
            renderDropdownItemLabel,
            ...restProps
        } = props;

        return (
            <DropdownList.Item
                key={key}
                active={active}
                selected={selected}
                onSelect={() => onSelect(option)}
                keyCodesForSelection={KEY_CODES_SELECTABLE}
                id={option.label}
                title={option.label}
                data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.dropdown}${TestIds.Dropdown.listItem}`}
                {...restProps}
            >
                {this.renderDropdownItemLabel({ option, renderCustom: renderDropdownItemLabel })}
            </DropdownList.Item>
        );
    };

    private renderDropdownItemLabel = (props: ISuggestFieldDropdownItemLabelProps<T>) => {
        if (props.renderCustom) {
            return props.renderCustom(props);
        }

        return <SuggestFieldDesktopDropdownItemLabel option={props.option} />;
    };

    /** Обработчик открытия/закрытия Dropdown. */
    private handleDropdownOpen = (open: boolean) => {
        this.setState({ dropdownOpen: open });
    };

    /** Обработчик выбора элемента из списка. */
    private handleSelect = (value: T | undefined) => {
        const { onSelect } = this.props;

        this.setState(
            {
                inputValue: value?.label || "",
                activeDescendant: undefined,
                dropdownOpen: false,
                dropdownDisabled: true,
            },
            () => {
                onSelect(value);
            },
        );
    };

    /** Обработчик получения фокуса TargetInput. */
    private handleTargetInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        const { clearInputOnFocus, onTargetInputFocus } = this.props;
        const { inputValue, dropdownOpen } = this.state;

        if (dropdownOpen === false) {
            this.setState({
                inputFocused: true,
                dropdownOpen: true,
            });

            if (clearInputOnFocus === true && inputValue.length !== 0) {
                this.setState({
                    inputValue: "",
                });
            }
        }

        onTargetInputFocus?.(event);
    };

    /** Обработчик потери фокуса TargetInput. */
    private handleTargetInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { value, clearInputOnFocus, onSelect, onTargetInputBlur } = this.props;
        const { inputValue } = this.state;

        this.setState({
            activeDescendant: undefined,
            inputFocused: false,
            dropdownOpen: false,
            dropdownDisabled: false,
        });

        if (inputValue.length !== 0 || clearInputOnFocus === true) {
            this.setState({ inputValue: value?.label || "" });
        } else {
            onSelect(undefined);
        }

        onTargetInputBlur?.(event);
    };

    /** Обработчик клика. */
    private handleClick = () => {
        const { inputFocused, dropdownOpen } = this.state;

        if (inputFocused === true && dropdownOpen === false) {
            this.setState({
                dropdownOpen: true,
                dropdownDisabled: false,
            });
        }
    };

    /** Обработчик изменения значения Input. */
    private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        this.setState(
            {
                inputValue: value,
                dropdownDisabled: false,
            },
            () => {
                this.props.onFilter(value);
            },
        );
    };

    /** Обработчик сброса значения. */
    private handleClear = () => {
        const { inputFocused } = this.state;
        const { onSelect } = this.props;

        if (inputFocused) {
            this.setState(
                {
                    inputValue: "",
                },
                () => {
                    this.props.onFilter("");
                },
            );
        } else {
            onSelect(undefined);
        }
    };

    /** Установка рефа на инпут. */
    private setSuggestRef: TSetRef<HTMLInputElement | null> = (instance) => {
        (this.suggestRef as React.MutableRefObject<HTMLInputElement | null>).current = instance;
    };

    private scrollHandler = (event: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement & EventTarget }) => {
        const { onScrollEnd } = this.props;

        // Бессмысленно собирать данные об окончании скрола, если не передан обработчик.
        if (onScrollEnd === undefined) {
            return;
        }

        const {
            target: list,
            target: { parentElement: parent },
        } = event;

        const listHeight = list.scrollHeight;
        const scrolled = list.scrollTop;
        const parentFullHeight = parent!.scrollHeight;
        const styles = window.getComputedStyle(parent!);
        const parentPaddingTop = styles.getPropertyValue("padding-top");
        const parentPaddingBottom = styles.getPropertyValue("padding-bottom");
        const parentPaddings = Number.parseInt(parentPaddingBottom) + Number.parseInt(parentPaddingTop);

        if (Math.abs(scrolled + parentFullHeight - parentPaddings - listHeight) <= 1) {
            onScrollEnd();
        }
    };

    private onScrollList = debounce(this.scrollHandler, 100);
}
