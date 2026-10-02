import React, { useState, useRef, useCallback } from "react";
import { ISuggestFieldOption } from "../types";
import { ISuggestFieldMobileDropdownProps } from "./types";
import {
    Dropdown,
    DropdownMobileHeader,
    DropdownMobileInput,
    DropdownMobileLoader,
    DropdownMobileClose,
    DropdownMobileBody,
    DropdownMobileList,
    DropdownMobileListItem,
} from "../../Dropdown";
import { SuggestFieldMobileDropdownHint } from "./SuggestFieldMobileDropdownHint";
import styles from "../styles/SuggestFieldMobile.module.less";

/** Отображает мобильный dropdown с полем ввода и списком для выбора. */
const SuggestFieldMobileDropdownBase = <T extends ISuggestFieldOption = ISuggestFieldOption>(
    {
        value,
        options,
        placeholder,
        tooltipHint,
        opened,
        loading,
        tooltipOpen,
        dropdownListLoading,
        clearInputOnFocus,
        setOpened,
        onSelect,
        onFilter,
        onScrollEnd,
    }: ISuggestFieldMobileDropdownProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    const [inputValue, setInputValue] = useState(value?.label || "");

    const [prevValue, setPrevValue] = useState(value);
    if (value?.id !== prevValue?.id) {
        setPrevValue(value);
        setInputValue(value?.label || "");
    }

    // Не используется в мобильном Dropdown, нужен как обязательное свойство Dropdown.
    const targetRef = useRef<HTMLDivElement>(null);

    const handleInputFocus = useCallback(() => {
        if (!clearInputOnFocus) {
            setInputValue(value?.label || "");
        } else {
            setInputValue("");
        }
    }, [clearInputOnFocus, value?.label]);

    const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            setInputValue(event.target.value);
            onFilter(event.target.value);
        },
        [onFilter],
    );

    const handleCloseClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
        setOpened(false);
    }, [setOpened]);

    // Закрытие без выбора значение не сбрасывает, поэтому и поле ввода возвращается к его label.
    // Иначе при повторном открытии во время анимации закрытия (содержимое ещё смонтировано,
    // автофокус не срабатывает) в поле остался бы прежний ввод.
    const handleDropdownClose = useCallback(() => {
        setInputValue(value?.label || "");
    }, [value?.label]);

    const handleListScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
        (event) => {
            if (onScrollEnd === undefined || dropdownListLoading) {
                return;
            }

            const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;

            if (scrollHeight - scrollTop - clientHeight < 1) {
                onScrollEnd();
            }
        },
        [onScrollEnd, dropdownListLoading],
    );

    return (
        <Dropdown
            opened={opened}
            setOpened={setOpened}
            targetRef={targetRef}
            onClose={handleDropdownClose}
            mobileViewProps={{
                children: (
                    <>
                        <DropdownMobileHeader
                            controlButtons={
                                <>
                                    {loading && <DropdownMobileLoader />}
                                    <DropdownMobileClose onClick={handleCloseClick} />
                                </>
                            }
                        >
                            <DropdownMobileInput
                                value={inputValue}
                                placeholder={placeholder}
                                autoFocus={true}
                                onFocus={handleInputFocus}
                                onChange={handleInputChange}
                            />
                        </DropdownMobileHeader>

                        <DropdownMobileBody className={styles.suggestFieldMobileBody} onScroll={handleListScroll}>
                            {tooltipOpen ? (
                                <SuggestFieldMobileDropdownHint>{tooltipHint}</SuggestFieldMobileDropdownHint>
                            ) : (
                                <DropdownMobileList loading={dropdownListLoading}>
                                    {options.map((option) => (
                                        <DropdownMobileListItem
                                            key={option.id}
                                            id={option.id}
                                            selected={option.id === value?.id}
                                            showNotificationIcon={option.showNotificationIcon}
                                            onSelect={() => {
                                                onSelect(option);
                                                setOpened(false);
                                            }}
                                        >
                                            {option.content || option.label}
                                        </DropdownMobileListItem>
                                    ))}
                                </DropdownMobileList>
                            )}
                        </DropdownMobileBody>
                    </>
                ),
            }}
            ref={ref}
        />
    );
};

export const SuggestFieldMobileDropdown = React.forwardRef(SuggestFieldMobileDropdownBase) as <
    T extends ISuggestFieldOption = ISuggestFieldOption,
>(
    props: ISuggestFieldMobileDropdownProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
