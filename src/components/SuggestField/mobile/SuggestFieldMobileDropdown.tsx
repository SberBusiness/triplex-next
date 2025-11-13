import React, { useState, useEffect, useRef } from "react";
import { ISuggestFieldOption } from "@sberbusiness/triplex-next/components/SuggestField/types";
import { ISuggestFieldMobileDropdownProps } from "@sberbusiness/triplex-next/components/SuggestField/mobile/types";
import {
    Dropdown,
    DropdownMobileHeader,
    DropdownMobileInput,
    DropdownMobileLoader,
    DropdownMobileClose,
    DropdownMobileBody,
    DropdownMobileList,
    DropdownMobileListItem,
} from "@sberbusiness/triplex-next/components/Dropdown";
import { SuggestFieldMobileDropdownHint } from "@sberbusiness/triplex-next/components/SuggestField/mobile/SuggestFieldMobileDropdownHint";
import styles from "../styles/SuggestFieldMobile.module.less";

/** Отображает мобильный dropdown с полем ввода и списком для выбора. */
const SuggestFieldMobileDropdownBase = <T extends ISuggestFieldOption = ISuggestFieldOption>(
    {
        value,
        options,
        placeholder,
        dropdownHint,
        opened,
        loading,
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
    const listRef = useRef<HTMLDivElement>(null);
    // Не используется в мобильном Dropdown, нужен как обязательное свойство Dropdown.
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInputValue(value?.label || "");
    }, [value]);

    const handleInputFocus = () => {
        if (clearInputOnFocus === false) {
            setInputValue(value?.label || "");
        } else {
            setInputValue("");
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setInputValue(value);
        onFilter(value);
    };

    const handleCloseClick = () => {
        setOpened(false);
        onSelect(value);
    };

    const handleScrollList = (event: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement & EventTarget }) => {
        if (!onScrollEnd) {
            return;
        }
        const { clientHeight, scrollHeight, scrollTop } = event.target;

        if (scrollHeight - scrollTop === clientHeight) {
            onScrollEnd();
        }
    };

    const handleDropdownOpened = (opened: boolean) => {
        setOpened(opened);
        if (!opened) {
            onSelect(value);
        }
    };

    return (
        <Dropdown
            setOpened={handleDropdownOpened}
            opened={opened}
            targetRef={targetRef}
            ref={ref}
            mobileViewProps={{
                children: (
                    <>
                        <DropdownMobileHeader closeButton={() => <DropdownMobileClose onClick={handleCloseClick} />}>
                            <DropdownMobileInput
                                value={inputValue}
                                placeholder={placeholder}
                                autoFocus={true}
                                onFocus={handleInputFocus}
                                onChange={handleInputChange}
                            />

                            {loading && <DropdownMobileLoader />}
                        </DropdownMobileHeader>

                        <DropdownMobileBody className={styles.suggestFieldMobileBody} onScroll={handleScrollList}>
                            {dropdownHint ? (
                                <SuggestFieldMobileDropdownHint>{dropdownHint}</SuggestFieldMobileDropdownHint>
                            ) : (
                                <DropdownMobileList loading={dropdownListLoading} ref={listRef}>
                                    {options.map((option) => (
                                        <DropdownMobileListItem
                                            key={option.id}
                                            id={option.id}
                                            selected={option.id === value?.id}
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
        />
    );
};

export const SuggestFieldMobileDropdown = React.forwardRef(SuggestFieldMobileDropdownBase) as <
    T extends ISuggestFieldOption = ISuggestFieldOption,
>(
    props: ISuggestFieldMobileDropdownProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
