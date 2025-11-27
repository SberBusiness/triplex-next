import React, { useRef, useCallback } from "react";
import { ISuggestOption } from "./types";
import { useSuggestContext } from "./SuggestContext";
import {
    DropdownMobileHeader,
    DropdownMobileInput,
    DropdownMobileLoader,
    DropdownMobileClose,
    DropdownMobileBody,
    DropdownMobileList,
    DropdownMobileListItem,
} from "../Dropdown";
import { Text, EFontType, ETextSize } from "@sberbusiness/triplex-next/components/Typography";
import styles from "./styles/SuggestDropdown.module.less";

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
    const listRef = useRef(null);

    const handleDropdownScroll = useCallback(
        (event: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement & EventTarget }) => {
            if (onScrollEnd === undefined) {
                return;
            }

            const { clientHeight, scrollHeight, scrollTop } = event.target;

            if (scrollHeight - scrollTop === clientHeight) {
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
        if (inputValue.length !== 0 && clearInputOnFocus === true) {
            onFilter("");
        }
    }, [inputValue.length, clearInputOnFocus, onFilter]);

    return (
        <>
            <DropdownMobileHeader closeButton={() => <DropdownMobileClose onClick={handleMobileDropdownClose} />}>
                <DropdownMobileInput
                    value={inputValue}
                    placeholder={placeholder}
                    autoFocus={true}
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                />

                {loading && <DropdownMobileLoader />}
            </DropdownMobileHeader>

            <DropdownMobileBody className={styles.suggestDropdownMobileBody} onScroll={handleDropdownScroll}>
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
                    <DropdownMobileList loading={dropdownListLoading} ref={listRef}>
                        {options.map((option) => (
                            <DropdownMobileListItem
                                key={option.id}
                                id={option.id}
                                selected={option.id === value?.id}
                                onSelect={() => {
                                    onSelect(option);
                                }}
                            >
                                {option.content || option.label}
                            </DropdownMobileListItem>
                        ))}
                    </DropdownMobileList>
                )}
            </DropdownMobileBody>
        </>
    );
};
