import React, { useState, useRef, useCallback } from "react";
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
    IDropdownProps,
} from "@sberbusiness/triplex-next/components/Dropdown";
import { SuggestFieldMobileDropdownHint } from "@sberbusiness/triplex-next/components/SuggestField/mobile/SuggestFieldMobileDropdownHint";
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

    // Флаг для предотвращения сброса значения, когда закрытие вызвано выбором конкретной опции из списка.
    const closedBySelectionRef = useRef(false);

    const listRef = useRef<HTMLDivElement>(null);
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

    const handleDropdownClose = useCallback<NonNullable<IDropdownProps["onClose"]>>(() => {
        if (closedBySelectionRef.current) {
            closedBySelectionRef.current = false;
            return;
        }

        if (inputValue.length === 0 && value !== undefined) {
            onSelect(undefined);
        }
    }, [inputValue.length, onSelect, value]);

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
                            {tooltipHint ? (
                                <SuggestFieldMobileDropdownHint>{tooltipHint}</SuggestFieldMobileDropdownHint>
                            ) : (
                                <DropdownMobileList loading={dropdownListLoading} ref={listRef}>
                                    {options.map((option) => (
                                        <DropdownMobileListItem
                                            key={option.id}
                                            id={option.id}
                                            selected={option.id === value?.id}
                                            onSelect={() => {
                                                closedBySelectionRef.current = true;
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
