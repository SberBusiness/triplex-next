import React, { useCallback } from "react";
import { ISuggestOption } from "./types";
import { useSuggestContext } from "./SuggestContext";
import {
    PullerHeader,
    PullerInput,
    PullerLoader,
    PullerClose,
    PullerBody,
    PullerList,
    PullerListItem,
} from "../Puller";
import { Text, EFontType, ETextSize } from "../Typography";
import styles from "./styles/SuggestDropdown.module.less";

/**
 * Наполнение мобильного Dropdown (шторки Puller) внутри Suggest.
 * Данные и обработчики берёт из SuggestContext, поэтому рендерится только внутри Suggest.
 */
export const SuggestMobileDropdownContent = <T extends ISuggestOption>() => {
    const {
        value,
        options,
        inputValue,
        placeholder,
        noOptionsText,
        loading,
        clearInputOnFocus,
        dropdownListLoading,
        onSelect,
        onFilter,
        onScrollEnd,
        closeDropdown,
    } = useSuggestContext<T>();

    const handleDropdownScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
        (event) => {
            if (onScrollEnd === undefined) {
                return;
            }

            const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;

            if (scrollHeight - scrollTop - clientHeight < 1) {
                onScrollEnd();
            }
        },
        [onScrollEnd],
    );

    const handleMobileDropdownClose = useCallback(() => closeDropdown(), [closeDropdown]);

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onFilter(event.target.value);
        },
        [onFilter],
    );

    const handleInputFocus = useCallback(() => {
        if (inputValue.length !== 0 && clearInputOnFocus) {
            onFilter("");
        }
    }, [inputValue.length, clearInputOnFocus, onFilter]);

    return (
        <>
            <PullerHeader
                controlButtons={
                    <>
                        {loading && <PullerLoader />}
                        <PullerClose onClick={handleMobileDropdownClose} />
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

            <PullerBody className={styles.suggestDropdownMobileBody} onScroll={handleDropdownScroll}>
                {options.length === 0 ? (
                    <Text
                        className={styles.suggestDropdownMobileNoOptionsText}
                        type={EFontType.PRIMARY}
                        size={ETextSize.B2}
                        tag="div"
                    >
                        {noOptionsText}
                    </Text>
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
                                }}
                            >
                                {option.content || option.label}
                            </PullerListItem>
                        ))}
                    </PullerList>
                )}
            </PullerBody>
        </>
    );
};

SuggestMobileDropdownContent.displayName = "SuggestMobileDropdownContent";
