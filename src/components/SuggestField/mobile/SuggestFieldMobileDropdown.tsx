import React, { useState, useCallback } from "react";
import { ISuggestFieldOption } from "../types";
import { ISuggestFieldMobileDropdownProps } from "./types";
import {
    Puller,
    PullerHeader,
    PullerInput,
    PullerLoader,
    PullerClose,
    PullerBody,
    PullerList,
    PullerListItem,
} from "../../Puller";
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
        ...restProps
    }: ISuggestFieldMobileDropdownProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    const valueLabel = value?.label ?? "";
    const [inputValue, setInputValue] = useState(valueLabel);

    // Поле ввода возвращается к label при смене value.id и любой смене opened, а не на автофокусе:
    // при повторном открытии во время анимации закрытия содержимое ещё смонтировано и автофокус не срабатывает.
    const [prevState, setPrevState] = useState({ valueId: value?.id, opened });
    if (value?.id !== prevState.valueId || opened !== prevState.opened) {
        setPrevState({ valueId: value?.id, opened });
        setInputValue(valueLabel);
    }

    // Как на десктопе: введённый запрос фокус не трогает,
    // иначе поле разошлось бы с отфильтрованным списком.
    const handleInputFocus = useCallback(() => {
        if (clearInputOnFocus && inputValue.length !== 0) {
            setInputValue("");
            onFilter("");
        }
    }, [clearInputOnFocus, inputValue, onFilter]);

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
        <Puller {...restProps} opened={opened} setOpened={setOpened} ref={ref}>
            <PullerHeader
                controlButtons={
                    <>
                        {loading && <PullerLoader />}
                        <PullerClose onClick={handleCloseClick} />
                    </>
                }
            >
                <PullerInput
                    value={inputValue}
                    placeholder={placeholder}
                    autoFocus={true}
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                />
            </PullerHeader>

            <PullerBody className={styles.suggestFieldMobileBody} onScroll={handleListScroll}>
                {tooltipOpen ? (
                    <SuggestFieldMobileDropdownHint>{tooltipHint}</SuggestFieldMobileDropdownHint>
                ) : (
                    <PullerList loading={dropdownListLoading}>
                        {options.map((option) => (
                            <PullerListItem
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
                            </PullerListItem>
                        ))}
                    </PullerList>
                )}
            </PullerBody>
        </Puller>
    );
};

export const SuggestFieldMobileDropdown = React.forwardRef(SuggestFieldMobileDropdownBase) as <
    T extends ISuggestFieldOption = ISuggestFieldOption,
>(
    props: ISuggestFieldMobileDropdownProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
