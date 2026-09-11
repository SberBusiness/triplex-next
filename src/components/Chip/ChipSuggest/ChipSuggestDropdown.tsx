import React, { useCallback } from "react";
import FocusTrap from "focus-trap-react";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { ISuggestOption } from "../../Suggest/types";
import { IChipSuggestDropdownProps } from "./types";
import { useSuggestContext } from "../../Suggest/SuggestContext";
import { Dropdown, DropdownList, DropdownListItem } from "../../Dropdown";
import { ChipSuggestDesktopDropdownField } from "./desktop/ChipSuggestDesktopDropdownField";
import { SuggestMobileDropdownContent } from "../../Suggest/SuggestMobileDropdownContent";
import { setForwardedRef } from "./utils";

const KEY_CODES_SELECTABLE = [EVENT_KEY_CODES.ENTER];

const ChipSuggestDropdownBase = <T extends ISuggestOption>(
    { children, size, targetRef, focusTrapProps, ...restProps }: IChipSuggestDropdownProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    const {
        value,
        options,
        dropdownListId,
        dropdownOpen,
        dropdownListLoading,
        dropdownRef,
        closeDropdown,
        onSelect,
        setDropdownOpen,
    } = useSuggestContext<T>();

    const setRef = useCallback(
        (instance: HTMLDivElement | null) => {
            // Suggest отличает клик внутри списка от клика вне компонента по dropdownRef из контекста.
            dropdownRef.current = instance;
            setForwardedRef(ref, instance);
        },
        [dropdownRef, ref],
    );

    const handleDropdownOpen = useCallback(
        (open: boolean) => {
            if (open) {
                setDropdownOpen(true);
            } else {
                closeDropdown();
            }
        },
        [setDropdownOpen, closeDropdown],
    );

    const desktopDropdownContent = (
        <FocusTrap
            {...focusTrapProps}
            focusTrapOptions={{
                clickOutsideDeactivates: true,
                returnFocusOnDeactivate: true,
                ...focusTrapProps?.focusTrapOptions,
            }}
        >
            <div role="presentation">
                <ChipSuggestDesktopDropdownField size={size}>{children}</ChipSuggestDesktopDropdownField>
                <DropdownList
                    id={dropdownListId}
                    size={size}
                    dropdownOpened={dropdownOpen}
                    loading={dropdownListLoading}
                    style={options.length === 0 ? { display: "none" } : undefined}
                >
                    {options.map((option) => (
                        <DropdownListItem
                            key={option.id}
                            id={option.id}
                            keyCodesForSelection={KEY_CODES_SELECTABLE}
                            selected={option.id === value?.id}
                            showNotificationIcon={option.showNotificationIcon}
                            onSelect={() => onSelect(option)}
                        >
                            {option.content || option.label}
                        </DropdownListItem>
                    ))}
                </DropdownList>
            </div>
        </FocusTrap>
    );

    return (
        <Dropdown
            size={size}
            targetRef={targetRef}
            opened={dropdownOpen}
            setOpened={handleDropdownOpen}
            mobileViewProps={{
                children: <SuggestMobileDropdownContent />,
            }}
            {...restProps}
            ref={setRef}
        >
            {desktopDropdownContent}
        </Dropdown>
    );
};

/**
 * Выпадающий список ChipSuggest: поле фильтрации и список опций из SuggestContext.
 * На десктопе содержимое обёрнуто в FocusTrap, на мобильных — заменяется полноэкранным наполнением Suggest.
 */
export const ChipSuggestDropdown = React.forwardRef(ChipSuggestDropdownBase) as <T extends ISuggestOption>(
    props: IChipSuggestDropdownProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
